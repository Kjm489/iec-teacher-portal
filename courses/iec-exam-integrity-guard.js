
/*
 * IEC TEACHER DEVELOPMENT ACADEMY
 * COURSE & EXAM INTEGRITY GUARD
 *
 * Protects:
 * - Challenge Examination
 * - Course modules
 * - Lesson content
 * - Quizzes and assessments
 *
 * Preserves:
 * - Navigation
 * - Interactive activities
 * - Answer selection
 * - Form inputs
 * - Scoring
 * - Printable completion reports
 *
 * Browser-side deterrent only.
 * Does not prevent screenshots, external devices,
 * developer tools, or access to delivered source code.
 */

(() => {
  'use strict';

  // Protect active exam/review screens on the challenge
  // exam. On other course pages, protect learning content.

  const examScreens = ['exam', 'review'];

  const isVisible = el =>
    !!el &&
    !el.classList.contains('hidden') &&
    getComputedStyle(el).display !== 'none';

  const examPage =
    !!document.getElementById('exam') &&
    !!document.getElementById('intro');

  const selectors = examPage
    ? [
        '#exam',
        '#review'
      ]
    : [
        'main',
        'article',
        '.course-content',
        '.lesson-content',
        '.quiz-container',
        '.assessment',
        '.module-content'
      ];

  // Identify protected learning content.

  function protectedRoot(target) {
    if (!(target instanceof Element)) return null;

    for (const selector of selectors) {
      const root = target.closest(selector);

      if (root && isVisible(root)) {
        return root;
      }
    }

    return null;
  }

  // Check whether exam protection should be active.

  function active() {
    if (!examPage) return true;

    return examScreens.some(id =>
      isVisible(document.getElementById(id))
    );
  }

  // Preserve normal typing in course input fields.

  function editable(target) {
    return (
      target instanceof Element &&
      !!target.closest(
        'input, textarea, select, ' +
        '[contenteditable=""], ' +
        '[contenteditable="true"], ' +
        '[role="textbox"]'
      )
    );
  }

  // Preserve interaction with course controls.

  function allowed(target) {
    return (
      editable(target) ||
      (
        target instanceof Element &&
        !!target.closest(
          'button, a, label, summary, ' +
          '[role="button"], ' +
          '[data-integrity-allow]'
        )
      )
    );
  }

  // Detect selected protected text.

  function protectedSelection() {
    const selection = window.getSelection();

    if (!selection || selection.isCollapsed) {
      return false;
    }

    const node = selection.anchorNode;

    const element =
      node?.nodeType === Node.ELEMENT_NODE
        ? node
        : node?.parentElement;

    return !!protectedRoot(element);
  }

  // Determine whether copying should be blocked.

  function shouldBlock(event) {
    return (
      active() &&
      !editable(event.target) &&
      (
        !!protectedRoot(event.target) ||
        protectedSelection()
      )
    );
  }

  // Block copying and cutting protected content.

  ['copy', 'cut'].forEach(type => {
    document.addEventListener(
      type,
      event => {
        if (shouldBlock(event)) {
          event.preventDefault();
        }
      },
      true
    );
  });

  // Block right-click, dragging and text selection
  // within protected learning content.

  [
    'contextmenu',
    'dragstart',
    'selectstart'
  ].forEach(type => {
    document.addEventListener(
      type,
      event => {
        if (
          active() &&
          protectedRoot(event.target) &&
          !allowed(event.target)
        ) {
          event.preventDefault();
        }
      },
      true
    );
  });

  // Block common keyboard shortcuts:
  // Ctrl+C / Cmd+C
  // Ctrl+X / Cmd+X
  // Ctrl+A / Cmd+A
  //
  // Normal typing and form interactions remain enabled.

  document.addEventListener(
    'keydown',
    event => {
      if (!active() || editable(event.target)) {
        return;
      }

      const key = event.key.toLowerCase();

      if (
        (event.ctrlKey || event.metaKey) &&
        ['c', 'x', 'a'].includes(key) &&
        (
          protectedRoot(event.target) ||
          protectedSelection() ||
          document.activeElement === document.body
        )
      ) {
        event.preventDefault();
      }
    },
    true
  );

})();
