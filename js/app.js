/* Navegação e animação typewriter. Componentes isolados em módulos JS. */
(function () {
  'use strict';
  const slides = window.DECK_SLIDES || [];
  let current = -1;
  const host = document.getElementById('slides-host');
  host.innerHTML = slides.join('\n');
  const elements = slides.map((_, i) => document.getElementById(`slide-${i + 1}`));
  const prev = document.getElementById('btn-prev'),
    next = document.getElementById('btn-next');
  for (const slide of elements) slide.setAttribute('aria-hidden', 'true');
  let exploreInitialized = false;
  let labInitialized = false;
  function showSlide(index) {
    if (index === current || index < 0 || index >= slides.length) return;
    window.CourseAnimation.stop();
    const previous = elements[current];
    previous?.classList.remove('active');
    previous?.setAttribute('aria-hidden', 'true');
    current = index;
    const active = elements[index];
    active.classList.add('active');
    active.setAttribute('aria-hidden', 'false');
    if (!exploreInitialized && active.querySelector('#category-filter')) {
      exploreInitialized = true;
      window.CourseViz.initExplore();
    }
    if (!labInitialized && active.querySelector('#sql-editor')) {
      labInitialized = true;
      window.SqlLab.init();
    }
    active.scrollTop = 0;
    document.getElementById('slide-counter').textContent =
      `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    const tw = active.querySelector('.typewriter');
    if (tw) window.CourseAnimation.typewriter(tw, tw.dataset.text || '');
    document.getElementById('notes-slide').textContent = `SLIDE ${index + 1}`;
    document.getElementById('notes-text').textContent =
      window.LESSON_NOTES?.[index] ||
      'Convide a turma a explicar o que entendeu e conecte a resposta ao próximo passo.';
  }
  prev.addEventListener('click', () => showSlide(current - 1));
  next.addEventListener('click', () => showSlide(current + 1));
  async function fullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }
      const el = document.getElementById('deck-stage');
      if (el.requestFullscreen) await el.requestFullscreen();
    } catch (e) {
      console.warn('Tela cheia indisponível', e);
    }
  }
  document.getElementById('btn-fullscreen').addEventListener('click', fullscreen);
  const notes = document.getElementById('presenter-notes'),
    notesButton = document.getElementById('btn-notes');
  function toggleNotes(force) {
    const open = typeof force === 'boolean' ? force : notes.hidden;
    notes.hidden = !open;
    notesButton.setAttribute('aria-expanded', String(open));
    if (!open) notesButton.focus();
  }
  notesButton.addEventListener('click', () => toggleNotes());
  document.getElementById('close-notes').addEventListener('click', () => toggleNotes(false));
  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (
      ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName) ||
      document.activeElement?.isContentEditable ||
      document.activeElement?.matches('#sql-results-scroll, .exercise-results, summary, .sql-schema button')
    )
      return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      showSlide(current + 1);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      showSlide(current - 1);
      e.preventDefault();
    } else if (e.key === 'Home') {
      showSlide(0);
      e.preventDefault();
    } else if (e.key === 'End') {
      showSlide(slides.length - 1);
      e.preventDefault();
    } else if (e.key.toLowerCase() === 'f') {
      fullscreen();
      e.preventDefault();
    } else if (e.key.toLowerCase() === 'n') {
      toggleNotes();
      e.preventDefault();
    } else if (e.key === 'Escape' && !notes.hidden) {
      toggleNotes(false);
      e.preventDefault();
    }
  });
  window.SqlLab.initExercises();
  if (window.CourseActivities) window.CourseActivities.init();
  showSlide(0);
  window.CourseDeck = { showSlide, getSlide: () => current + 1, totalSlides: slides.length };
})();
