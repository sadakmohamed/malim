import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);
lucide.createIcons();

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const darkIcon = document.querySelector('.dark-mode-icon');
const lightIcon = document.querySelector('.light-mode-icon');

const toggleTheme = () => {
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  
  if (isLight) {
    darkIcon.classList.replace('block', 'hidden');
    lightIcon.classList.replace('hidden', 'block');
  } else {
    lightIcon.classList.replace('block', 'hidden');
    darkIcon.classList.replace('hidden', 'block');
  }
};

// Initialize Theme
if (localStorage.getItem('theme') === 'light') {
  toggleTheme();
}

themeToggle?.addEventListener('click', toggleTheme);

// Custom Cursor Logic
const cursor = document.getElementById('cursor');
const cursorGlow = document.getElementById('cursor-glow');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const animateCursor = () => {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  
  if(cursor) {
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
  }

  glowX += (mouseX - glowX) * 0.05;
  glowY += (mouseY - glowY) * 0.05;

  if(cursorGlow) {
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
  }

  requestAnimationFrame(animateCursor);
};

animateCursor();

// Magnetic Buttons & Interactive Elements
const magneticBtns = document.querySelectorAll('.magnetic-btn, .glass-card');

magneticBtns.forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: "power2.out"
    });
    
    if(cursor) cursor.classList.add('scale-150', 'bg-cyan-400/50');
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
    if(cursor) cursor.classList.remove('scale-150', 'bg-cyan-400/50');
  });
});

// GSAP Scroll Reveals
const revealOnScroll = () => {
  const elements = document.querySelectorAll('.gs-reveal');
  
  elements.forEach((el, index) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        delay: (index % 3) * 0.1
      }
    );
  });
};

// Counter Animation
const runCounters = () => {
  const counters = document.querySelectorAll('.stat-counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 90%"
      },
      onUpdate: () => {
        counter.innerText = Math.ceil(obj.val);
      }
    });
  });
};

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  runCounters();
});
