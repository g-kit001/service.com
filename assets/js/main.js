/* --- assets/js/main.js --- */

document.addEventListener('DOMContentLoaded', () => {

  /**
   * フェードインアニメーションのためのIntersection Observer
   */
  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.1
  });

  const fadeInElements = document.querySelectorAll('.fade-in');
  fadeInElements.forEach(el => fadeInObserver.observe(el));

  /**
   * 汎用モーダル機能
   */
  const openTriggers = document.querySelectorAll('.js-modal-open');
  const closeTriggers = document.querySelectorAll('.js-modal-close');

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('is-visible');
      document.body.classList.add('modal-open');
    }
  };

  const closeModal = () => {
    const visibleModal = document.querySelector('.modal.is-visible');
    if (visibleModal) {
      visibleModal.classList.remove('is-visible');
      document.body.classList.remove('modal-open');
    }
  };

  openTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modalTarget;
      if (modalId) {
        openModal(modalId);
      }
    });
  });

  closeTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      closeModal();
    });
  });
  
  // ESCキーでモーダルを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.querySelector('.modal.is-visible')) {
      closeModal();
    }
  });
});
