
/*
 * IEC TEACHER DEVELOPMENT ACADEMY
 * EXAM INTEGRITY GUARD
 *
 * Purpose:
 * Discourage copying examination questions and answers
 * into ChatGPT or other external AI tools.
 *
 * This is a browser-side deterrent, not a secure
 * examination proctoring system.
 *
 * Protection applies only while the examination
 * or final review screen is active.
 */

(() => {
  'use strict';

  const protectedAreas = ['exam', 'review'];

  // Check whether a protected examination screen is visible.
  const isActive = () => protectedAreas.some(id => {
    const el = document.getElementById(id);

    return el && !el.classList.contains('hidden');
  });

  // Check whether the action occurs inside the examination.
  const insideProtectedArea = target => {
    if (!(target instanceof Element)) return false;

    return protectedAreas.some(id =>
      target.closest('#' + id)
    );
  };

  // Preserve normal typing in editable fields.
  const editable = target =>
    target instanceof Element &&
    !!target.closest(
      'input:not([type="radio"]), textarea, [contenteditable="true"]'
    );

  const stop = event => {
    event.preventDefault();
  };

  // Block copying examination content.
  document.addEventListener('copy', event => {
    if (
      isActive() &&
      (
        insideProtectedArea(event.target) ||
        window.getSelection()?.toString()
      )
    ) {
      stop(event);
    }
  }, true);

  // Block cutting protected examination content.
  document.addEventListener('cut', event => {
    if (
      isActive() &&
      insideProtectedArea(event.target) &&
      !editable(event.target)
    ) {
      stop(event);
    }
  }, true);

  // Disable right-click menus within the examination.
  document.addEventListener('contextmenu', event => {
    if (
      isActive() &&
      insideProtectedArea(event.target)
    ) {
      stop(event);
    }
  }, true);

  // Prevent dragging examination text.
  document.addEventListener('dragstart', event => {
    if (
      isActive() &&
      insideProtectedArea(event.target)
    ) {
      stop(event);
    }
  }, true);

  // Prevent ordinary text selection.
  document.addEventListener('selectstart', event => {
    if (
      isActive() &&
      insideProtectedArea(event.target) &&
      !editable(event.target)
    ) {
      stop(event);
    }
  }, true);

  // Block common keyboard copying shortcuts.
  document.addEventListener('keydown', event => {
    if (!isActive() || editable(event.target)) return;

    if (
      (event.ctrlKey || event.metaKey) &&
      ['c', 'x', 'a'].includes(event.key.toLowerCase())
    ) {
      if (
        insideProtectedArea(event.target) ||
        document.activeElement === document.body
      ) {
        stop(event);
      }
    }
  }, true);

})();
