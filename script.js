// ===========================
//  PROFILE CARD — script.js
//  Features:
//  1. Dark Mode Toggle
//  2. Follow Button Toggle
//  3. Animated Count Numbers
// ===========================


// ===========================
//  1. DARK MODE TOGGLE
// ===========================
const darkToggle = document.getElementById('darkToggle');
const darkIcon   = document.getElementById('darkIcon');
const body       = document.body;

// Check if user previously set dark mode
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  darkIcon.classList.replace('fa-moon', 'fa-sun');
}

darkToggle.addEventListener('click', function () {
  body.classList.toggle('dark');

  if (body.classList.contains('dark')) {
    darkIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    darkIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
});


// ===========================
//  2. FOLLOW BUTTON TOGGLE
// ===========================
const followBtn  = document.getElementById('followBtn');
const followText = document.getElementById('followText');
const followIcon = document.getElementById('followIcon');

followBtn.addEventListener('click', function () {
  const isFollowing = followBtn.classList.contains('following');

  if (isFollowing) {
    // Unfollow
    followBtn.classList.remove('following');
    followIcon.classList.replace('fa-user-check', 'fa-user-plus');
    followText.textContent = 'Follow';
  } else {
    // Follow
    followBtn.classList.add('following');
    followIcon.classList.replace('fa-user-plus', 'fa-user-check');
    followText.textContent = 'Following';
  }
});


// ===========================
//  3. ANIMATED COUNT NUMBERS
// ===========================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target   = parseInt(el.getAttribute('data-target'));
  const duration = 1200; // ms
  const steps    = 50;
  const stepTime = duration / steps;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(function () {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, stepTime);
}

// Use IntersectionObserver so animation
// triggers when card comes into view
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      statNumbers.forEach(animateCount);
      observer.disconnect(); // run only once
    }
  });
}, { threshold: 0.5 });

const card = document.querySelector('.card');
if (card) observer.observe(card);
