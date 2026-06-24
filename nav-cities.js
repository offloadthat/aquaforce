/* AquaForce — injects a "Service area" cities dropdown into the nav (desktop) + mobile menu. */
(function(){
  if (window.__afCities) return; window.__afCities = true;
  var CITIES = [
    ['Santa Monica','santa-monica'],['Pasadena','pasadena'],['Long Beach','long-beach'],
    ['Glendale','glendale'],['Burbank','burbank'],['Beverly Hills','beverly-hills'],
    ['Culver City','culver-city'],['Torrance','torrance'],['Inglewood','inglewood'],
    ['Manhattan Beach','manhattan-beach']
  ];
  var css = ''
  + '.nav__dd{position:relative;display:inline-flex;align-items:center}'
  + '.nav__dd-caret{font-size:9px;margin-left:5px;opacity:.7}'
  + '.nav__dd::after{content:"";position:absolute;top:100%;left:-10px;right:-10px;height:14px}'
  + '.nav__dd-menu{position:absolute;top:calc(100% + 12px);left:50%;transform:translateX(-50%) translateY(6px);min-width:210px;'
  + 'background:#fff;border:1px solid rgba(13,27,42,.1);border-radius:14px;box-shadow:0 20px 44px -16px rgba(13,27,42,.45);'
  + 'padding:8px;opacity:0;visibility:hidden;transition:opacity .18s,transform .18s;z-index:101;display:grid;grid-template-columns:1fr 1fr;gap:1px}'
  + '.nav__dd:hover .nav__dd-menu,.nav__dd:focus-within .nav__dd-menu{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0)}'
  + '.nav__dd-menu a{display:block;padding:9px 12px;border-radius:9px;font-family:var(--font-cond,"Barlow Condensed"),sans-serif;'
  + 'font-size:13.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--ink-2,#33465a);white-space:nowrap}'
  + '.nav__dd-menu a:hover{background:#eef5fc;color:var(--accent,#0a73e6)}'
  + '.nav__dd-all{grid-column:1 / -1;margin-top:4px;padding-top:11px!important;border-top:1px solid rgba(13,27,42,.1);color:var(--accent,#0a73e6)!important;text-align:center}'
  + '.mm-cities{display:flex;flex-direction:column;align-items:center;gap:1px;margin:0 0 8px}'
  + '.mm-cities a{font-family:var(--font-cond,"Barlow Condensed"),sans-serif;font-size:17px;font-weight:600;letter-spacing:.02em;color:var(--ink-2,#33465a);padding:6px}'
  + '.mm-cities a:hover{color:var(--accent,#0a73e6)}'
  + '.mm-cities__lbl{font-family:var(--font-cond,"Barlow Condensed"),sans-serif;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--muted,#6b7c8d);margin:6px 0 2px}'
  + '.mobile-menu{justify-content:flex-start!important;padding:84px 16px 36px!important;overflow-y:auto!important}';
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);

  function build(){
    // ---- desktop dropdown ----
    var d = document.querySelector('.nav__links a[href="service-area.html"]');
    if (d){
      var dd = document.createElement('div'); dd.className = 'nav__dd';
      d.parentNode.insertBefore(dd, d); dd.appendChild(d);
      var car = document.createElement('span'); car.className = 'nav__dd-caret'; car.textContent = '▾'; d.appendChild(car);
      var menu = document.createElement('div'); menu.className = 'nav__dd-menu';
      CITIES.forEach(function(c){ var a = document.createElement('a'); a.href = 'city-'+c[1]+'.html'; a.textContent = c[0]; menu.appendChild(a); });
      var all = document.createElement('a'); all.href = 'service-area.html'; all.className = 'nav__dd-all'; all.textContent = 'All service areas →'; menu.appendChild(all);
      dd.appendChild(menu);
    }
    // ---- mobile menu list ----
    var m = document.querySelector('.mobile-menu a[href="service-area.html"]');
    if (m){
      var lbl = document.createElement('div'); lbl.className = 'mm-cities__lbl'; lbl.textContent = 'Cities we serve';
      var wrap = document.createElement('div'); wrap.className = 'mm-cities';
      CITIES.forEach(function(c){ var a = document.createElement('a'); a.href = 'city-'+c[1]+'.html'; a.textContent = c[0]; wrap.appendChild(a); });
      m.parentNode.insertBefore(lbl, m.nextSibling);
      lbl.parentNode.insertBefore(wrap, lbl.nextSibling);
    }
  }
  if (document.readyState !== 'loading') build(); else document.addEventListener('DOMContentLoaded', build);
})();
