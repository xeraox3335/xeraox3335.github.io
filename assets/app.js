/* ── Router ───────────────────────────────────────────────── */
(() => {
  'use strict';

  const content = document.getElementById('content');
  const navLinks = document.querySelectorAll('nav a[data-route]');
  const cache = new Map();

  /* Map URL path → file inside /files/ */
  function pathToFile(path) {
    const normalizedPath = path.replace(/\/$/, '') || '/';
    const pagePath = normalizedPath === '/' ? '/home' : normalizedPath;
    return `/files${pagePath}.html`;
  }

  /* Highlight the active nav link */
  function setActiveNav(path) {
    const normalised = path.replace(/\/$/, '') || '/';
    navLinks.forEach(a => {
      const route = a.dataset.route.replace(/\/$/, '') || '/';
      a.classList.toggle('active', route === normalised);
    });
  }

  /* Render HTML into #content with a fade */
  function render(html) {
    content.innerHTML = html;

    content.classList.remove('fade-in');
    // Force reflow to restart animation
    void content.offsetWidth;
    content.classList.add('fade-in');

    /* Re-intercept any links inside the loaded page */
    interceptLinks(content);
    initPageBehavior();
  }

  function initPageBehavior() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const feedback = document.getElementById('formFeedback');
        if (feedback) {
          feedback.textContent = '✓ Thanks! Your message was received (demo only).';
          feedback.focus();
        }
        contactForm.reset();
      }, { once: true });
    }
  }

  /* Load a page by URL path */
  async function navigate(path, push = true) {
    setActiveNav(path);

    if (push) {
      history.pushState({ path }, '', path);
    }

    /* Serve from cache if available */
    if (cache.has(path)) {
      render(cache.get(path));
      return;
    }

    /* Show spinner while loading */
    content.innerHTML = '<div class="loader"></div>';

    const file = pathToFile(path);
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      cache.set(path, html);
      render(html);
    } catch (err) {
      console.warn('Failed to load page:', path, err);
      const notFound = `
        <section class="not-found">
          <h1 class="not-found__code">404</h1>
          <p class="not-found__title">
            Page not found
          </p>
          <p class="not-found__text">
            The page <code class="not-found__path">${path}</code>
            does not exist.
          </p>
          <a href="/" data-route="/" class="btn btn-primary">
            Go Home
          </a>
        </section>`;
      cache.set(path, notFound);
      render(notFound);
    }
  }

  /* Returns true for links that should NOT be handled by the router */
  function isExternalLink(href) {
    return !href || href.startsWith('http') || href.startsWith('//') || href.startsWith('#');
  }

  /* Intercept clicks on internal links */
  function interceptLinks(root) {
    root.querySelectorAll('a[href]').forEach(a => {
      if (isExternalLink(a.getAttribute('href'))) return;
      a.addEventListener('click', e => {
        e.preventDefault();
        navigate(new URL(a.href, location.origin).pathname);
      });
    });
  }

  /* Handle browser back / forward */
  window.addEventListener('popstate', e => {
    const path = (e.state && e.state.path) || location.pathname;
    navigate(path, false);
  });

  /* Intercept nav links */
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      navigate(a.dataset.route);
    });
  });

  /* Initial load — honour GitHub Pages 404.html redirect */
  document.getElementById('year').textContent = new Date().getFullYear();
  const redirectPath = sessionStorage.getItem('spa:redirect');
  if (redirectPath && redirectPath !== location.pathname) {
    sessionStorage.removeItem('spa:redirect');
    navigate(redirectPath, true);
  } else {
    navigate(location.pathname, false);
  }
})();