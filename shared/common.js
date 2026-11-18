// Comportamientos comunes de los diseños 6 y 7: entrada, música, calendario, copiar cuenta, parallax y animación del contador.
(function(){
  var d=document,C=window.BODA||{};
  var intro=d.getElementById('intro'),site=d.getElementById('site'),a=d.getElementById('bgm'),m=d.getElementById('music'),mi=d.getElementById('musicIc');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Música: se carga desde el principio y suena al instante al tocar la entrada
  if(a){a.preload='auto';a.volume=.6;a.load();a.addEventListener('canplay',function(){if(m)m.hidden=false},{once:true});}
  function play(){if(!a||!a.paused)return;var p=a.play();if(p&&p.then)p.then(function(){if(mi)mi.textContent='❚❚'}).catch(function(){})}
  if(m)m.addEventListener('click',function(){if(a.paused){a.play();mi.textContent='❚❚'}else{a.pause();mi.textContent='♪'}});

  // Entrada
  if(intro){
    var opened=false;
    function open(){
      if(opened)return;opened=true;
      intro.classList.add('open');
      setTimeout(function(){if(site)site.hidden=false;d.body.classList.remove('locked');window.scrollTo(0,0);d.body.classList.add('entered')},reduce?0:700);
      play();
    }
    intro.addEventListener('pointerdown',play);
    intro.addEventListener('click',open);
  } else if(site){site.hidden=false}

  // Calendario .ics
  var b=d.getElementById('icsBtn');
  if(b)b.addEventListener('click',function(){
    var l=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Boda//ES','BEGIN:VEVENT','UID:boda-clara-mateo-20270612@boda','DTSTAMP:20260101T000000Z','DTSTART:20270612T160000Z','DTEND:20270613T030000Z','SUMMARY:Boda de Clara & Mateo','LOCATION:'+(C.ceremonia?C.ceremonia.lugar+', '+C.ceremonia.direccion:''),'END:VEVENT','END:VCALENDAR'].join('\r\n');
    var u=URL.createObjectURL(new Blob([l],{type:'text/calendar'})),x=d.createElement('a');x.href=u;x.download='boda-clara-mateo.ics';d.body.appendChild(x);x.click();x.remove();
  });
  // Copiar número de cuenta
  var iban=C.regalos&&C.regalos.iban,cb=d.getElementById('copyIban');
  if(cb&&iban){cb.hidden=false;cb.addEventListener('click',function(){try{navigator.clipboard.writeText(iban);cb.textContent='¡Copiado!'}catch(e){}})}

  // Contador: pequeña animación al cambiar el número
  if(!reduce&&window.MutationObserver){
    ['cdS','cdM','cdH','cdD'].forEach(function(id){var el=d.getElementById(id);if(!el)return;
      new MutationObserver(function(){el.classList.remove('tick');void el.offsetWidth;el.classList.add('tick')}).observe(el,{childList:true,characterData:true,subtree:true});});
  }

  // Parallax suave
  var pars=[].slice.call(d.querySelectorAll('[data-par]'));
  if(pars.length&&!reduce){
    var ticking=false;
    function upd(){ticking=false;var vh=innerHeight;pars.forEach(function(el){var r=el.parentNode.getBoundingClientRect();if(r.bottom<-100||r.top>vh+100)return;var s=parseFloat(el.dataset.par)||.08;el.style.transform='translate3d(0,'+(((r.top+r.height/2)-vh/2)*-s).toFixed(1)+'px,0)'})}
    addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(upd)}},{passive:true});upd();
  }
})();
