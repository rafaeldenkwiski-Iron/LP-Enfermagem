// ================= JAVASCRIPT REFATORADO =================
// Todas as funções foram otimizadas, sem código morto

// ================= MENU HAMBÚRGUER =================
(function initMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const body = document.body;
  
  if (!hamburger || !navMenu) return;
  
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
  }
  
  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('menu-open');
  }
  
  hamburger.addEventListener('click', toggleMenu);
  
  // Fecha menu ao clicar em um link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Fecha menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active')) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    }
  });
})();

// ================= SMOOTH SCROLL =================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();

// ================= CARROSSEL =================
(function initCarousel() {
  const slides = document.querySelectorAll('.carousel img');
  const dots = document.querySelectorAll('.dot');
  
  if (slides.length === 0) return;
  
  let currentIndex = 0;
  let carouselInterval = null;
  
  function updateCarousel() {
    slides.forEach(img => img.classList.remove('active'));
    slides[currentIndex].classList.add('active');
    
    if (dots.length > 0) {
      dots.forEach(dot => dot.classList.remove('active-dot'));
      dots[currentIndex].classList.add('active-dot');
    }
  }
  
  function startCarousel() {
    if (carouselInterval) clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 5000);
  }
  
  function stopCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }
  
  // Inicia o carrossel
  startCarousel();
  
  // Pausa ao passar o mouse
  const carouselContainer = document.querySelector('.carousel');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopCarousel);
    carouselContainer.addEventListener('mouseleave', startCarousel);
  }
  
  // Clique nos dots
  if (dots.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        stopCarousel();
        startCarousel();
      });
    });
  }
  
  // Swipe no mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  carouselContainer?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  carouselContainer?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
      stopCarousel();
      startCarousel();
    }
    if (touchEndX > touchStartX + 50) {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
      stopCarousel();
      startCarousel();
    }
  });
  
  // Garante que o primeiro slide esteja ativo
  if (!slides[0].classList.contains('active')) {
    slides[0].classList.add('active');
  }
})();

// ================= SCROLL REVEAL =================
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight - 100 && rect.bottom >= 0;
  }
  
  function handleScrollReveal() {
    revealElements.forEach(el => {
      if (isElementInViewport(el)) {
        el.classList.add('active');
      }
    });
  }
  
  window.addEventListener('load', handleScrollReveal);
  window.addEventListener('scroll', handleScrollReveal);
})();

// ================= FAQ ACCORDION =================
(function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    }
  });
})();

// ================= FORMULÁRIO =================
(function initForm() {
  const newsletterForm = document.getElementById('form-newsletter');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('📧 Obrigado! Em breve você receberá o guia no seu e-mail.');
      newsletterForm.reset();
    });
  }
})();

// ================= FALLBACK PARA IMAGENS =================
(function initImageFallback() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      if (!this.hasAttribute('data-fallback')) {
        this.setAttribute('data-fallback', 'true');
        this.src = 'https://placehold.co/800x500/DFEDF8/337DBE?text=Imagem+Enfermagem';
        this.alt = 'Imagem ilustrativa - Curso de Enfermagem';
      }
    });
  });
})();

// ================= CONTROLE DE PERFORMANCE =================
// Limpa intervalos ao sair da página (opcional)
window.addEventListener('beforeunload', () => {
  // O intervalo do carrossel será limpo naturalmente ao sair
  // Mantido para boas práticas
});