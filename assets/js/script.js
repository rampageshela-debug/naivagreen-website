/* assets/js/script.js */
document.addEventListener('DOMContentLoaded', function(){
  // loader hide
  const loader = document.getElementById('site-loader');
  if(loader){ setTimeout(()=> loader.classList.add('hidden'), 600); }

  // theme toggle
  const root = document.documentElement;
  const themeKey = 'ng_theme_pref';
  const saved = localStorage.getItem(themeKey) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', saved);
  const themeSwitch = document.getElementById('theme-switch');
  if(themeSwitch){
    themeSwitch.checked = (saved === 'dark');
    themeSwitch.addEventListener('change', function(){
      const theme = this.checked ? 'dark' : 'light';
      root.setAttribute('data-theme', theme);
      localStorage.setItem(themeKey, theme);
    });
  }

  // simple AOS-like reveal
  const elems = document.querySelectorAll('[data-aos]');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('aos-animate');
    });
  }, {threshold: 0.12});
  elems.forEach(el=>obs.observe(el));

  // mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.querySelector('.nav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', ()=> nav.classList.toggle('open'));
  }

  // debug missing images
  document.querySelectorAll('img').forEach(img=>{
    img.addEventListener('error', ()=> console.warn('Missing image:', img.src));
  });
});
