(function () {
  'use strict';

  /* --- Mobile Navigation --- */
  var navToggle = document.querySelector('.nav__toggle');
  var nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('nav--open');
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav--open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav--open');
      }
    });
  }

  /* --- Image Slider --- */
  var slider = document.querySelector('.slider');

  if (slider) {
    var track = slider.querySelector('.slider__track');
    var slides = slider.querySelectorAll('.slider__slide');
    var prevBtn = slider.querySelector('.slider__btn--prev');
    var nextBtn = slider.querySelector('.slider__btn--next');
    var dotsContainer = slider.querySelector('.slider__dots');
    var currentIndex = 0;
    var autoPlayInterval;
    var totalSlides = slides.length;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.classList.add('slider__dot');
      dot.setAttribute('aria-label', 'Ir a la diapositiva ' + (i + 1));
      if (i === 0) dot.classList.add('slider__dot--active');
      dot.addEventListener('click', function () {
        goToSlide(i);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });

    var dots = dotsContainer.querySelectorAll('.slider__dot');

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = 'translateX(-' + currentIndex * 100 + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('slider__dot--active', i === currentIndex);
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlideFn() {
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlideFn();
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        resetAutoPlay();
      });
    }

    slider.addEventListener('mouseenter', function () {
      clearInterval(autoPlayInterval);
    });

    slider.addEventListener('mouseleave', function () {
      startAutoPlay();
    });

    startAutoPlay();
  }

  /* --- Scroll Reveal --- */
  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }

  /* --- Contact Form (visual only) --- */
  var contactForm = document.querySelector('.contact-form form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Mensaje recibido (demo)';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 2500);
    });
  }
})();
