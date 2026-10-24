
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const lessons = Array.isArray(window.IEC_LESSONS)
    ? window.IEC_LESSONS : [];

  const $ = id => document.getElementById(id);

  const search = $("search");
  const curriculum = $("curriculum");
  const level = $("level");
  const book = $("book");
  const unit = $("unit");
  const grid = $("lesson-grid");
  const count = $("result-count");

  const year = $("currentYear");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = $("menuToggle");
  const nav = $("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  if (![search, curriculum, level, book, unit, grid, count]
      .every(Boolean)) return;

  function el(tag, cls, value) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (value !== undefined) node.textContent = value;
    return node;
  }

  function options(select, items, placeholder, previous) {
    select.replaceChildren(new Option(placeholder, "all"));
    items.forEach(item => select.add(new Option(item, item)));
    select.value = items.includes(previous) ? previous : "all";
  }

  function matches(item, field, value) {
    return value === "all" || String(item[field]) === value;
  }

  function unique(field, filter) {
    return [...new Set(
      lessons.filter(filter)
        .map(item => String(item[field] || ""))
        .filter(Boolean)
    )].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
  }

  function updateFilters() {
    const oldLevel = level.value;
    const oldBook = book.value;
    const oldUnit = unit.value;

    options(
      level,
      unique("level", item =>
        matches(item, "curriculum", curriculum.value)
      ),
      "All levels",
      oldLevel
    );

    options(
      book,
      unique("book", item =>
        matches(item, "curriculum", curriculum.value) &&
        matches(item, "level", level.value)
      ),
      "All textbooks",
      oldBook
    );

    const selected = lessons.filter(item =>
      matches(item, "curriculum", curriculum.value) &&
      matches(item, "level", level.value) &&
      matches(item, "book", book.value)
    );

    const units = [...new Set(
      selected.map(item => String(item.unit))
    )];

    units.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );

    options(unit, units, "All units and sections", oldUnit);
  }

  function validPath(path) {
    return typeof path === "string" &&
      /^(iec-prebuilt-lesson-library\.html|resources\/(lesson-plans|presentations)\/[a-zA-Z0-9_\/-]+\.(pdf|docx|pptx))$/
        .test(path) &&
      !path.includes("..");
  }

  function resource(label, path, kind) {
    if (!validPath(path)) {
      const disabled = el(
        "span",
        "resource-link disabled " + kind,
        label + " — Not available yet"
      );
      disabled.setAttribute("aria-disabled", "true");
      return disabled;
    }

    const link = el(
      "a",
      "resource-link " + kind,
      label + " →"
    );
    link.href = path;

    if (/\.(pdf|docx|pptx)$/.test(path)) {
      link.setAttribute("download", "");
    }

    return link;
  }

  const curriculumOrder = {
    Oxford: 0,
    Cambridge: 1,
    IELTS: 2
  };

  function filtered() {
    return lessons.filter(item => {
      const searchable = [
        item.curriculum,
        item.level,
        item.book,
        item.program,
        item.title,
        item.focus,
        `Unit ${item.unit}`,
        String(item.unit)
      ].join(" ").toLowerCase();

      return searchable.includes(
        search.value.trim().toLowerCase()
      ) &&
        matches(item, "curriculum", curriculum.value) &&
        matches(item, "level", level.value) &&
        matches(item, "book", book.value) &&
        matches(item, "unit", unit.value);

    }).sort((a, b) =>
      (curriculumOrder[a.curriculum] ?? 9) -
      (curriculumOrder[b.curriculum] ?? 9) ||
      (a.book || "").localeCompare(b.book || "") ||
      String(a.unit).localeCompare(
        String(b.unit), undefined, { numeric: true }
      )
    );
  }

  function render() {
    const items = filtered();

    count.textContent =
      `${items.length} section${items.length === 1 ? "" : "s"}`;

    grid.replaceChildren();

    if (!items.length) {
      grid.append(el(
        "div",
        "empty-state",
        "No matching lessons. Try clearing the filters."
      ));
      return;
    }

    const fragment = document.createDocumentFragment();

    for (const item of items) {
      const card = el("article", "lesson-card");

      const status = item.status === "ready"
        ? "READY TO TEACH"
        : item.status === "sample"
          ? "DEMONSTRATION"
          : "SYLLABUS · IN DEVELOPMENT";

      card.append(el("span", "lesson-tag", status));

      card.append(el(
        "p",
        "lesson-breadcrumb",
        [item.curriculum, item.level, item.book]
          .filter(Boolean).join(" → ")
      ));

      let label;

      if (typeof item.unit === "number") {
        label = `Unit ${item.unit} — ${item.title}`;
      } else if (item.kind === "starter") {
        label = `Starter — ${item.title}`;
      } else if (item.kind === "review") {
        label = `${item.unit} — ${item.title}`;
      } else if (item.kind === "supplementary") {
        label = `Supplementary — ${item.title}`;
      } else {
        label = `${item.unit} — ${item.title}`;
      }

      card.append(el("h3", "", label));
      card.append(el("p", "lesson-focus", item.focus || ""));

      const note = item.status === "ready"
        ? "IEC plan: 2 × 45 minutes · Interactive games included"
        : item.status === "sample"
          ? "Example catalog entry only — not an uploaded lesson"
          : "Syllabus section verified; lesson and presentation pending";

      card.append(el("p", "lesson-status", note));

      const actions = el("div", "resource-actions");

      actions.append(
        resource("IEC Lesson Plan", item.lessonPlan, "plan"),
        resource("Classroom Presentation", item.powerpoint, "ppt")
      );

      card.append(actions);
      fragment.append(card);
    }

    grid.append(fragment);
  }

  curriculum.addEventListener("change", () => {
    level.value = "all";
    book.value = "all";
    unit.value = "all";
    updateFilters();
    render();
  });

  level.addEventListener("change", () => {
    book.value = "all";
    unit.value = "all";
    updateFilters();
    render();
  });

  book.addEventListener("change", () => {
    unit.value = "all";
    updateFilters();
    render();
  });

  unit.addEventListener("change", render);
  search.addEventListener("input", render);

  document.querySelectorAll("[data-curriculum]")
    .forEach(button => {
      button.addEventListener("click", () => {
        curriculum.value = button.dataset.curriculum;

        level.value = "all";
        book.value = "all";
        unit.value = "all";

        updateFilters();

        if (curriculum.value === "Oxford") {
          level.value = "Kindergarten";
          updateFilters();

          book.value = "Toy Team Plus 3";
          updateFilters();
        }

        render();

        $("lessons-heading").scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });

  curriculum.value = "Oxford";
  updateFilters();

  level.value = "Kindergarten";
  updateFilters();

  book.value = "Toy Team Plus 3";
  updateFilters();

  render();
});

