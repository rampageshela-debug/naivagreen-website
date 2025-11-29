/* script.js */
document.addEventListener('DOMContentLoaded',function(){
  // loader
  const loader = document.getElementById('site-loader');
  if(loader){ setTimeout(()=>{ loader.classList.add('hidden'); },600); }

  // theme toggle with persistent storage
  const root = document.documentElement;
  const toggle = document.getElementById('theme-switch');
  function setTheme(t){
    root.setAttribute('data-theme', t);
    localStorage.setItem('ng_theme', t);
  }
  const saved = localStorage.getItem('ng_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(saved);
  if(toggle){
    toggle.addEventListener('change', e=>{
      setTheme(e.target.checked ? 'dark' : 'light');
    });
    toggle.checked = (saved==='dark');
  }

  // basic AOS-like fade-up simple implementation
  const aosElems = document.querySelectorAll('[data-aos]');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('aos-animate'); }
    });
  },{threshold:0.12});
  aosElems.forEach(el=>obs.observe(el));

  // debug script: report missing images
  document.querySelectorAll('img').forEach(img=>{
    img.addEventListener('error', ()=> console.warn('Missing image:', img.src));
  });

  // basic i18n toggle
  const langBtn = document.getElementById('langToggle');
  if(langBtn){
    langBtn.addEventListener('click', ()=>{
      const cur = localStorage.getItem('ng_lang') || 'en';
      const next = cur==='en'?'sw':'en';
      localStorage.setItem('ng_lang', next);
      location.reload();
    });
  }

});
