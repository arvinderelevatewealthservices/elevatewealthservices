// Premium Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
  mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active', isActive);
    mobileMenuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    document.body.style.overflow = isActive ? 'hidden' : '';
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && mobileMenuToggle && 
        !navMenu.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// Navbar Scroll Effect with enhanced animation
const navbar = document.querySelector('nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
}, { passive: true });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileMenuToggle) {
          mobileMenuToggle.classList.remove('active');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
      
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent.trim();
    submitBtn.textContent = 'Redirecting to WhatsApp...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    const serviceLabels = {
      'mutual-funds': 'Mutual Fund Advisory',
      insurance: 'Insurance Solutions',
      trading: 'Trading & Investing',
      all: 'All Services / General Consultation'
    };

    const consultationMessage = [
      'Hello ElevateWealthServices,',
      '',
      'I would like to book a consultation. Please find my details below:',
      '',
      'Name: ' + (data.name || '-'),
      'Phone: ' + (data.phone || '-'),
      'Email: ' + (data.email || 'Not provided'),
      'Service: ' + (serviceLabels[data.service] || data.service || '-'),
      'Message: ' + (data.message || 'No additional message'),
      '',
      'Kindly contact me at your earliest convenience.',
      '',
      'Thank you.'
    ].join('\n');

    const whatsappUrl = 'https://wa.me/919815519057?text=' + encodeURIComponent(consultationMessage);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

// WhatsApp button
const whatsappBtn = document.querySelector('[href^="https://wa.me/"]');
if (whatsappBtn) {
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
}

// Phone and email click handlers
document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    // Allow default behavior for phone links
  });
});

document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    // Allow default behavior for email links
  });
});

// Brand Partners — Luxury Slider
(function () {
  function getVis() {
    return window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1;
  }

  function BPSlider(trackId, wrapId, prevId, nextId, dotsId) {
    var track = document.getElementById(trackId);
    var wrap = document.getElementById(wrapId);
    var prevBtn = document.getElementById(prevId);
    var nextBtn = document.getElementById(nextId);
    var dotsEl = document.getElementById(dotsId);
    if (!track || !wrap) return null;

    var idx = 0;
    var timer = null;
    var total = track.children.length;

    function maxIdx() { return Math.max(0, total - getVis()); }

    function buildDots() {
      if (!dotsEl) return;
      dotsEl.innerHTML = '';
      var count = maxIdx() + 1;
      for (var i = 0; i < count; i++) {
        var d = document.createElement('button');
        d.className = 'bp-dot' + (i === idx ? ' active' : '');
        d.setAttribute('aria-label', 'Slide ' + (i + 1));
        (function (n) {
          d.addEventListener('click', function () { go(n); resetTimer(); });
        })(i);
        dotsEl.appendChild(d);
      }
    }

    function update() {
      var vis = getVis();
      var cardW = wrap.offsetWidth / vis;
      for (var i = 0; i < track.children.length; i++) {
        track.children[i].style.minWidth = cardW + 'px';
        track.children[i].style.maxWidth = cardW + 'px';
      }
      if (idx > maxIdx()) idx = maxIdx();
      track.style.transform = 'translateX(' + (-idx * cardW) + 'px)';
      var dots = dotsEl ? dotsEl.querySelectorAll('.bp-dot') : [];
      for (var j = 0; j < dots.length; j++) {
        dots[j].classList.toggle('active', j === idx);
      }
    }

    function go(n) {
      idx = Math.max(0, Math.min(n, maxIdx()));
      update();
    }

    if (prevBtn) prevBtn.addEventListener('click', function () {
      go(idx <= 0 ? maxIdx() : idx - 1); resetTimer();
    });
    if (nextBtn) nextBtn.addEventListener('click', function () {
      go(idx >= maxIdx() ? 0 : idx + 1); resetTimer();
    });

    wrap.addEventListener('mouseenter', function () { clearInterval(timer); });
    wrap.addEventListener('mouseleave', startTimer);
    window.addEventListener('resize', function () { buildDots(); update(); });

    function startTimer() {
      if (maxIdx() <= 0) return;
      timer = setInterval(function () { go(idx >= maxIdx() ? 0 : idx + 1); }, 4000);
    }
    function resetTimer() { clearInterval(timer); startTimer(); }

    buildDots();
    update();
    startTimer();

    return {
      update: function () { buildDots(); update(); }
    };
  }

  var sliders = {};

  document.querySelectorAll('.bp-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.bp-tab').forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.bp-panel').forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = document.getElementById('bpp-' + tab.dataset.tab);
      if (panel) {
        panel.classList.add('active');
        if (sliders[tab.dataset.tab]) sliders[tab.dataset.tab].update();
      }
    });
  });

  function initSliders() {
    sliders.mf = BPSlider('bpst-mf', 'bpsw-mf', 'bparr-mf-prev', 'bparr-mf-next', 'bpdots-mf');
    sliders.ins = BPSlider('bpst-ins', 'bpsw-ins', 'bparr-ins-prev', 'bparr-ins-next', 'bpdots-ins');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSliders);
  } else {
    initSliders();
  }
})();
