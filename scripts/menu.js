"use strict";

(function initBurgerMenu() {
  const burgerBtn = document.querySelector(".header__action--menu");
  const drawer = document.getElementById("header-drawer");
  const overlay = document.querySelector(".site-overlay");
  const pageContent = document.getElementById("page-content");

  if (!burgerBtn || !drawer || !overlay) {
    console.warn(
      "[menu] Не найдены необходимые элементы. Проверь селекторы и HTML."
    );
    return;
  }

  const getFocusable = (root) =>
    root.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, details summary, [tabindex]:not([tabindex="-1"])'
    );

  const hasTransition = (el) => {
    const cs = getComputedStyle(el);
    const durations = cs.transitionDuration
      .split(",")
      .map((s) => parseFloat(s) || 0);
    const delays = cs.transitionDelay.split(",").map((s) => parseFloat(s) || 0);
    return durations.some((d, i) => d + (delays[i] || 0) > 0);
  };

  let lastFocused = null;
  let isAnimating = false;
  const isOpen = () => drawer.classList.contains("is-open");

  function openMenu() {
    if (isOpen() || isAnimating) return;
    isAnimating = hasTransition(drawer);

    lastFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    burgerBtn.setAttribute("aria-expanded", "true");
    drawer.removeAttribute("aria-hidden");
    overlay.removeAttribute("aria-hidden");

    overlay.hidden = false;
    drawer.hidden = false;

    document.body.classList.add("scroll-lock");

    if (pageContent && "inert" in HTMLElement.prototype) {
      pageContent.inert = true;
    }

    requestAnimationFrame(() => {
      overlay.classList.add("is-visible");
      drawer.classList.add("is-open");

      const focusables = getFocusable(drawer);
      if (focusables.length) {
        focusables[0].focus();
      } else {
        const hadTabindex = drawer.hasAttribute("tabindex");
        if (!hadTabindex) drawer.setAttribute("tabindex", "-1");
        drawer.focus({ preventScroll: true });
        if (!hadTabindex) drawer.removeAttribute("tabindex");
      }
    });

    document.addEventListener("keydown", onKeydown, true);
    overlay.addEventListener("click", onOverlayClick);
    drawer.addEventListener("click", onMenuClick);

    if (isAnimating) {
      const onEnd = (evt) => {
        if (evt.target !== drawer) return;
        drawer.removeEventListener("transitionend", onEnd);
        isAnimating = false;
      };
      drawer.addEventListener("transitionend", onEnd);
    } else {
      isAnimating = false;
    }
  }

  function closeMenu() {
    if (!isOpen() || isAnimating) return;
    isAnimating = hasTransition(drawer);

    burgerBtn.setAttribute("aria-expanded", "false");

    overlay.classList.remove("is-visible");
    drawer.classList.remove("is-open");

    document.body.classList.remove("scroll-lock");

    if (pageContent && "inert" in HTMLElement.prototype) {
      pageContent.inert = false;
    }

    const onHide = () => {
      drawer.setAttribute("aria-hidden", "true");
      overlay.setAttribute("aria-hidden", "true");
      drawer.hidden = true;
      overlay.hidden = true;

      document.removeEventListener("keydown", onKeydown, true);
      overlay.removeEventListener("click", onOverlayClick);
      drawer.removeEventListener("click", onMenuClick);

      if (lastFocused && document.contains(lastFocused)) {
        lastFocused.focus({ preventScroll: true });
      } else {
        burgerBtn.focus({ preventScroll: true });
      }

      isAnimating = false;
      drawer.removeEventListener("transitionend", onHide);
    };

    if (isAnimating) {
      drawer.addEventListener("transitionend", onHide);
    } else {
      onHide();
    }
  }

  function toggleMenu() {
    if (isAnimating) return;
    isOpen() ? closeMenu() : openMenu();
  }

  function onKeydown(e) {
    if (!isOpen()) return;

    if (e.key === "Escape" || e.key === "Esc") {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === "Tab") {
      const focusables = Array.from(getFocusable(drawer));
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  function onOverlayClick() {
    closeMenu();
  }

  function onMenuClick(e) {
    const activator = e.target.closest("a[href], button[data-close]");
    if (activator) {
      closeMenu();
    }
  }

  burgerBtn.addEventListener("click", toggleMenu);

  burgerBtn.setAttribute("aria-expanded", "false");
  drawer.setAttribute("aria-hidden", "true");
  overlay.setAttribute("aria-hidden", "true");
  drawer.hidden = true;
  overlay.hidden = true;
})();
