  document.getElementById('year').textContent = new Date().getFullYear();

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));

  // Close the mobile menu on resize past the mobile breakpoint, so it
  // doesn't stay stuck open (with body scroll locked) if a tablet is rotated
  // from portrait to landscape, or a browser window is resized/un-maximized.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 780 && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // threshold is based on the target element's own height, so tall sections
  // (e.g. the certifications grid) could need more viewport height than any
  // mobile/tablet screen has, and would never reveal. Trigger instead as soon
  // as an element starts entering the viewport, which works at any screen size.
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('.reveal, .flow-line, .node-box').forEach(el => io.observe(el));