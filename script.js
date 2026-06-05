// ===== THEME MANAGEMENT =====
// Note: The inline <script> in index.html <head> handles initial theme
// to prevent FOUC. This toggleTheme function handles user interaction.

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.blur-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger animations based on data-delay attribute
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));

  // ===== EXPANDABLE WORK CARDS =====
  const workCards = document.querySelectorAll('.work-card');
  workCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      card.classList.toggle('expanded');
    });
    // Keyboard accessibility: Enter and Space toggle expansion
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('expanded');
      }
    });
  });

  // ===== SMOOTH NAVBAR HIDE/SHOW ON SCROLL =====
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down — hide navbar
      navbar.style.opacity = '0';
      navbar.style.transform = 'translateY(-100%)';
      navbar.style.pointerEvents = 'none';
    } else {
      // Scrolling up — show navbar
      navbar.style.opacity = '1';
      navbar.style.transform = 'translateY(0)';
      navbar.style.pointerEvents = 'auto';
    }
    lastScrollY = currentScrollY;
  });

  // ===== TYPING EFFECT FOR HERO NAME (subtle) =====
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    heroName.style.opacity = '0';
    heroName.style.filter = 'blur(8px)';
    heroName.style.transform = 'translateY(8px)';
    heroName.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

    setTimeout(() => {
      heroName.style.opacity = '1';
      heroName.style.filter = 'blur(0)';
      heroName.style.transform = 'translateY(0)';
    }, 100);
  }
});
