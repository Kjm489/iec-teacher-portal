
"use strict";

/*
 * ==========================================================
 * IEC TEACHER PORTAL
 * Application JavaScript
 * Version: 1.0.0
 * File: assets/js/app.js
 *
 * Features:
 * - Lesson resource dashboard
 * - Program filtering
 * - Unit filtering
 * - Live lesson searching
 * - IEC Lesson Plan download links
 * - PowerPoint presentation download links
 * - Responsive mobile navigation
 * - Automatic copyright year
 *
 * No login required.
 * ==========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

  // ========================================================
  // 1. LOAD LESSON CATALOG
  // ========================================================

  const lessons = Array.isArray(window.IEC_LESSONS)
    ? window.IEC_LESSONS
    : [];

  const searchInput = document.getElementById("search");
  const programSelect = document.getElementById("program");
  const unitSelect = document.getElementById("unit");
  const lessonGrid = document.getElementById("lesson-grid");
  const resultCount = document.getElementById("result-count");

  // ========================================================
  // 2. PROGRAM LABELS
  // ========================================================

  const programLabels = {
    Starters: "Pre-A1 Starters",
    Movers: "A1 Movers",
    Flyers: "A2 Flyers",
    KET: "A2 Key",
    PET: "B1 Preliminary",
    IELTS: "IELTS",
    Oxford: "Oxford K–9"
  };

  const programOrder = [
    "Starters",
    "Movers",
    "Flyers",
    "KET",
    "PET",
    "IELTS",
    "Oxford"
  ];

  // ========================================================
  // 3. AUTOMATIC COPYRIGHT YEAR
  // ========================================================

  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ========================================================
  // 4. MOBILE NAVIGATION
  // ========================================================

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.toggle("nav-open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

    mainNav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        mainNav.classList.remove("nav-open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {

        mainNav.classList.remove("nav-open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }

  // ========================================================
  // 5. CHECK DASHBOARD ELEMENTS
  // ========================================================

  if (
    !searchInput ||
    !programSelect ||
    !unitSelect ||
    !lessonGrid ||
    !resultCount
  ) {
    return;
  }

  // ========================================================
  // 6. ELEMENT CREATION HELPER
  // ========================================================

  function createElement(tag, className = "", text = "") {

    const node = document.createElement(tag);

    if (className) {
      node.className = className;
    }

    node.textContent = text;

    return node;

  }

  // ========================================================
  // 7. UPDATE AVAILABLE UNITS
  // ========================================================

  function updateUnits() {

    const selectedProgram = programSelect.value;
    const previousUnit = unitSelect.value;

    const availableUnits = [
      ...new Set(
        lessons
          .filter(item =>
            selectedProgram === "all" ||
            item.program === selectedProgram
          )
          .map(item => Number(item.unit))
          .filter(Number.isFinite)
      )
    ].sort((a, b) => a - b);

    unitSelect.replaceChildren(
      new Option("All Units", "all")
    );

    availableUnits.forEach(unit => {

      unitSelect.add(
        new Option(
          `Unit ${unit}`,
          String(unit)
        )
      );

    });

    if (
      availableUnits.some(
        unit => String(unit) === previousUnit
      )
    ) {
      unitSelect.value = previousUnit;
    } else {
      unitSelect.value = "all";
    }

  }

  // ========================================================
  // 8. VALIDATE RESOURCE PATHS
  // ========================================================

  function validResourcePath(path, type) {

    if (typeof path !== "string") {
      return false;
    }

    const prefix = type === "ppt"
      ? "resources/presentations/"
      : "resources/lesson-plans/";

    const allowedExtension = type === "ppt"
      ? /\.pptx$/i
      : /\.(pdf|docx)$/i;

    return (
      path.startsWith(prefix) &&
      !path.includes("..") &&
      !path.includes("\\") &&
      !/[?#%]/.test(path) &&
      allowedExtension.test(path)
    );

  }

  // ========================================================
  // 9. CREATE RESOURCE DOWNLOAD LINKS
  // ========================================================

  function createResourceLink(label, path, type) {

    if (!validResourcePath(path, type)) {

      const unavailable = createElement(
        "span",
        `resource-link disabled ${type}`,
        `${label} — Coming Soon`
      );

      unavailable.setAttribute(
        "aria-disabled",
        "true"
      );

      return unavailable;

    }

    const link = createElement(
      "a",
      `resource-link ${type}`
    );

    const labelText = createElement(
      "span",
      "",
      label
    );

    const arrow = createElement(
      "span",
      "",
      "↓"
    );

    arrow.setAttribute(
      "aria-hidden",
      "true"
    );

    link.append(
      labelText,
      arrow
    );

    link.href = path;
    link.download = "";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.setAttribute(
      "aria-label",
      `Download ${label}`
    );

    return link;

  }

  // ========================================================
  // 10. FILTER LESSONS
  // ========================================================

  function getFilteredLessons() {

    const query = searchInput.value
      .trim()
      .toLowerCase();

    const selectedProgram = programSelect.value;
    const selectedUnit = unitSelect.value;

    return lessons.filter(item => {

      const searchableText = [
        item.program,
        programLabels[item.program] || "",
        item.title,
        `Unit ${item.unit}`,
        `Lesson ${item.lesson}`
      ].join(" ").toLowerCase();

      const matchesSearch =
        searchableText.includes(query);

      const matchesProgram =
        selectedProgram === "all" ||
        item.program === selectedProgram;

      const matchesUnit =
        selectedUnit === "all" ||
        String(item.unit) === selectedUnit;

      return (
        matchesSearch &&
        matchesProgram &&
        matchesUnit
      );

    });

  }

  // ========================================================
  // 11. SORT LESSONS
  // ========================================================

  function sortLessons(items) {

    return [...items].sort((a, b) => {

      const programDifference =
        programOrder.indexOf(a.program) -
        programOrder.indexOf(b.program);

      if (programDifference !== 0) {
        return programDifference;
      }

      return (
        Number(a.unit) - Number(b.unit) ||
        Number(a.lesson) - Number(b.lesson)
      );

    });

  }

  // ========================================================
  // 12. CREATE LESSON CARDS
  // ========================================================

  function createLessonCard(item) {

    const card = createElement(
      "article",
      "lesson-card"
    );

    const tag = createElement(
      "span",
      "lesson-tag",
      programLabels[item.program] || item.program
    );

    const title = createElement(
      "h3",
      "",
      `Unit ${item.unit} · Lesson ${item.lesson}`
    );

    const description = createElement(
      "p",
      "lesson-description",
      `${item.title} · ${item.duration} minutes`
    );

    const actions = createElement(
      "div",
      "resource-actions"
    );

    const lessonPlanLink = createResourceLink(
      "IEC Lesson Plan",
      item.lessonPlan,
      "plan"
    );

    const powerpointLink = createResourceLink(
      "PowerPoint Presentation",
      item.powerpoint,
      "ppt"
    );

    actions.append(
      lessonPlanLink,
      powerpointLink
    );

    card.append(
      tag,
      title,
      description,
      actions
    );

    return card;

  }

  // ========================================================
  // 13. RENDER DASHBOARD
  // ========================================================

  function renderLessons() {

    const filtered = sortLessons(
      getFilteredLessons()
    );

    lessonGrid.replaceChildren();

    const count = filtered.length;

    resultCount.textContent =
      `${count} lesson${count === 1 ? "" : "s"}`;

    if (count === 0) {

      const empty = createElement(
        "div",
        "empty-state",
        "No lessons found. Try another search or filter."
      );

      lessonGrid.appendChild(empty);

      return;

    }

    const fragment = document.createDocumentFragment();

    filtered.forEach(item => {

      fragment.appendChild(
        createLessonCard(item)
      );

    });

    lessonGrid.appendChild(fragment);

  }

  // ========================================================
  // 14. EVENT LISTENERS
  // ========================================================

  searchInput.addEventListener(
    "input",
    renderLessons
  );

  programSelect.addEventListener(
    "change",
    () => {

      updateUnits();
      renderLessons();

    }
  );

  unitSelect.addEventListener(
    "change",
    renderLessons
  );

  // ========================================================
  // 15. INITIALIZE PORTAL
  // ========================================================

  updateUnits();
  renderLessons();

  console.info(
    `[IEC Portal] Loaded ${lessons.length} lesson records.`
  );

});
