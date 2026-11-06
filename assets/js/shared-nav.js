(() => {
  if (document.getElementById('iec-shared-nav')) return;
  const host = document.createElement('div');
  host.id = 'iec-shared-nav';
  host.style.cssText = 'position:sticky;top:0;z-index:2147483000;display:block;';
  const root = host.attachShadow({mode:'open'});
  root.innerHTML = `
  <style>
    *{box-sizing:border-box}
    .bar{background:#fff;border-bottom:1px solid #e2e8f0;box-shadow:0 2px 8px #1427470b;font:600 15px/1.4 Arial,Helvetica,sans-serif;color:#142747}
    .inner{max-width:1200px;margin:auto;min-height:82px;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;gap:22px}
    a{text-decoration:none;color:#142747}
    .brand{display:flex;align-items:center;gap:13px;flex-shrink:0}
    .logo{width:53px;height:53px;background:#142747;border-radius:13px;display:grid;place-items:center;color:white;font-size:16px;font-weight:900}
    .brandwords{display:flex;flex-direction:column;font-size:20px;line-height:1.05}
    .brandwords small{font-size:9px;letter-spacing:2px;color:#65748a;margin-top:7px}
    .links{display:flex;align-items:center;gap:29px}
    .links a:hover,.links a:focus-visible{color:#812d45}
    .cta{background:#812d45!important;color:white!important;padding:14px 20px;border-radius:10px;white-space:nowrap}
    .cta:hover{background:#642136!important}
    button{display:none;background:white;border:1px solid #d7dce4;border-radius:8px;padding:8px 12px;color:#142747;font-size:23px;cursor:pointer}
    @media(max-width:900px){.inner{flex-wrap:wrap;min-height:70px}button{display:block}.links{display:none;width:100%;flex-direction:column;align-items:stretch;gap:0;padding:6px 0 12px}.links.open{display:flex}.links a{padding:11px 8px}.links .cta{text-align:center;margin-top:8px}}
  </style>
  <header class="bar">
    <div class="inner">
      <a class="brand" href="/index.html" aria-label="IEC Portal Home">
        <span class="logo">IEC</span>
        <span class="brandwords">IEC <strong>PORTAL</strong><small>TEACHER RESOURCES</small></span>
      </a>
      <button type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="iec-links">☰</button>
      <nav class="links" id="iec-links" aria-label="Main navigation">
        <a href="/index.html">Home</a>
        <a href="/index.html#features">Resources</a>
        <a href="/courses/">Courses</a>
        <a href="/index.html#how-it-works">How It Works</a>
        <a href="/index.html#about">About</a>
        <a class="cta" href="/portal.html">Lesson Library →</a>
      </nav>
    </div>
  </header>`;
  const button = root.querySelector('button');
  const nav = root.querySelector('nav');
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
  document.body.prepend(host);
})();
