"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const lessons = Array.isArray(window.IEC_LESSONS) ? window.IEC_LESSONS : [];
  const $ = id => document.getElementById(id);
  const search = $("search"), curriculum = $("curriculum"), level = $("level");
  const book = $("book"), unit = $("unit"), grid = $("lesson-grid");
  const count = $("result-count"), pages = $("pagination");
  const quickYears = $("quick-years"), clear = $("clear-filters");
  const PAGE_SIZE = 12;
  let page = 1;

  const year = $("currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
  const toggle = $("menuToggle"), nav = $("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }
  if (![search,curriculum,level,book,unit,grid,count,pages,quickYears].every(Boolean)) return;

  const el = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  const match = (item, key, value) => value === "all" || String(item[key] ?? "") === value;
  const unique = (key, predicate) => [...new Set(lessons.filter(predicate)
    .map(item => String(item[key] ?? "")).filter(Boolean))]
    .sort((a,b) => a.localeCompare(b, undefined, {numeric:true}));
  const setOptions = (select, values, label, previous) => {
    select.replaceChildren(new Option(label, "all"));
    values.forEach(value => select.add(new Option(value,value)));
    select.value = values.includes(previous) ? previous : "all";
  };

  function updateFilters() {
    const oldLevel = level.value, oldBook = book.value, oldUnit = unit.value;
    setOptions(level, unique("level", item => match(item,"curriculum",curriculum.value)), "All levels", oldLevel);
    setOptions(book, unique("book", item => match(item,"curriculum",curriculum.value) &&
      match(item,"level",level.value)), "All textbooks", oldBook);
    setOptions(unit, unique("unit", item => match(item,"curriculum",curriculum.value) &&
      match(item,"level",level.value) && match(item,"book",book.value)),
      "All weeks / units", oldUnit);
  }

  function validPath(path) {
    if (typeof path !== "string" || path.includes("..") || path.includes("\\")) return false;
    return /^OIC_ESL\/[A-Za-z0-9_/-]+\.html$/.test(path) ||
      /^(iec-prebuilt-lesson-library\.html|resources\/(lesson-plans|presentations)\/[a-zA-Z0-9_/-]+\.(pdf|docx|pptx))$/.test(path);
  }
  function filtered() {
    const q = search.value.trim().toLowerCase();
    return lessons.filter(item => {
      const haystack = [item.curriculum,item.level,item.book,item.program,item.title,item.focus,
        item.unit,`Unit ${item.unit}`].join(" ").toLowerCase();
      return haystack.includes(q) && match(item,"curriculum",curriculum.value) &&
        match(item,"level",level.value) && match(item,"book",book.value) &&
        match(item,"unit",unit.value);
    }).sort((a,b) =>
      ["Oxford","Cambridge","IELTS"].indexOf(a.curriculum) -
      ["Oxford","Cambridge","IELTS"].indexOf(b.curriculum) ||
      String(a.level).localeCompare(String(b.level),undefined,{numeric:true}) ||
      String(a.unit).localeCompare(String(b.unit),undefined,{numeric:true}) ||
      String(a.id).localeCompare(String(b.id),undefined,{numeric:true})
    );
  }

  function renderYears() {
    quickYears.replaceChildren();
    if (curriculum.value !== "Oxford") return;
    for (let n=1;n<=9;n++) {
      const chip = el("button","year-chip",`Year ${n}`);
      chip.type = "button";
      chip.setAttribute("aria-pressed",String(level.value === `Year ${n}`));
      chip.addEventListener("click",() => {
        level.value = `Year ${n}`;
        book.value = "all"; unit.value = "all";
        updateFilters(); page=1; render();
      });
      quickYears.append(chip);
    }
  }

  function renderPages(total) {
    pages.replaceChildren();
    const totalPages = Math.ceil(total/PAGE_SIZE);
    if (totalPages <= 1) return;
    const add = (label,target,disabled=false) => {
      const button=el("button","page-button",label);
      button.type="button";button.disabled=disabled;
      button.addEventListener("click",() => {
        page=target;render();
        $("lessons-heading").scrollIntoView({behavior:"smooth",block:"start"});
      });
      pages.append(button);
    };
    add("← Previous",page-1,page===1);
    pages.append(el("span","page-label",`Page ${page} of ${totalPages}`));
    add("Next →",page+1,page===totalPages);
  }

  function render() {
    const items = filtered();
    const maxPage = Math.max(1,Math.ceil(items.length/PAGE_SIZE));
    page = Math.min(page,maxPage);
    const start = (page-1)*PAGE_SIZE;
    count.textContent = items.length
      ? `${items.length.toLocaleString()} lessons · showing ${start+1}–${Math.min(start+PAGE_SIZE,items.length)}`
      : "0 matching lessons";
    grid.replaceChildren();
    renderYears();
    document.querySelectorAll("[data-curriculum]").forEach(button =>
      button.setAttribute("aria-pressed",String(button.dataset.curriculum===curriculum.value)));
    if (!items.length) {
      grid.append(el("div","empty-state","No matching lessons. Change your filters or search."));
      renderPages(0);return;
    }
    const fragment = document.createDocumentFragment();
    for (const item of items.slice(start,start+PAGE_SIZE)) {
      const card=el("article","lesson-card");
      const available=validPath(item.lessonPlan);
      const status=item.status==="sample" ? "DEMONSTRATION" :
        available ? "LESSON PLAN" : "COMING SOON";
      card.append(el("span","lesson-tag",status));
      card.append(el("p","lesson-breadcrumb",[item.curriculum,item.level,item.book]
        .filter(Boolean).join(" → ")));
      const heading = item.kind === "oic-lesson"
        ? `${item.unit} · ${item.title}`
        : `${typeof item.unit === "number" ? `Unit ${item.unit}` : item.unit} · ${item.title}`;
      card.append(el("h3","",heading));
      if(item.focus) card.append(el("p","lesson-focus",item.focus));
      if(item.kind==="oic-lesson")
        card.append(el("p","lesson-status","OIC ESL · 2 × 45-minute periods"));
      const actions=el("div","resource-actions");
      if (available) {
        const link=el("a","resource-link","Open IEC Lesson Plan →");
        link.href=item.lessonPlan;
        if (/\.(pdf|docx)$/i.test(item.lessonPlan)) link.setAttribute("download","");
        actions.append(link);
      } else {
        const disabled=el("span","resource-link disabled","Lesson plan not available");
        disabled.setAttribute("aria-disabled","true");actions.append(disabled);
      }
      card.append(actions);fragment.append(card);
    }
    grid.append(fragment);renderPages(items.length);
  }

  function changeCurriculum(value) {
    curriculum.value=value;level.value="all";book.value="all";unit.value="all";
    search.value="";page=1;updateFilters();render();
  }
  curriculum.addEventListener("change",()=>changeCurriculum(curriculum.value));
  level.addEventListener("change",()=>{book.value="all";unit.value="all";page=1;updateFilters();render();});
  book.addEventListener("change",()=>{unit.value="all";page=1;updateFilters();render();});
  unit.addEventListener("change",()=>{page=1;render();});
  search.addEventListener("input",()=>{page=1;render();});
  document.querySelectorAll("[data-curriculum]").forEach(button => button.addEventListener("click",()=>{
    changeCurriculum(button.dataset.curriculum);
    $("lessons-heading").scrollIntoView({behavior:"smooth",block:"start"});
  }));
  if(clear) clear.addEventListener("click",()=>changeCurriculum("Oxford"));

  // Start with a manageable five-lesson week, not all 1,620 cards.
  curriculum.value="Oxford";updateFilters();
  if ([...level.options].some(option=>option.value==="Year 1")) {
    level.value="Year 1";updateFilters();
    if ([...unit.options].some(option=>option.value==="Week 01")) unit.value="Week 01";
  }
  render();
});
