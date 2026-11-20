(function(){
  var C=window.BODA||{};
  // Música: se carga desde el principio y arranca al instante al tocar el sobre
  var i=document.getElementById('intro'),a=document.getElementById('bgm'),m=document.getElementById('music'),mi=document.getElementById('musicIc');
  if(a){
    a.preload='auto';a.src='../shared/audio/musica.m4a';a.volume=.6;a.load();
    a.addEventListener('canplay',function(){if(m)m.hidden=false},{once:true});
  }
  // Segundo en el que empieza la canción (config.musica.inicio): salta la intro y entra con un fundido suave
  var ini=(C.musica&&+C.musica.inicio)||0,seeked=false;
  if(a&&ini>0){a.loop=false;a.addEventListener('ended',function(){a.currentTime=ini;a.play()})}
  function fadeIn(){
    if(!a)return;var v=0,t=setInterval(function(){v+=.05;a.volume=Math.min(.6,v);if(v>=.6)clearInterval(t)},120);a.volume=.02;
  }
  function playMusic(){
    if(!a||!a.paused)return;
    if(ini>0&&!seeked){seeked=true;try{a.currentTime=ini}catch(e){}fadeIn()}
    var p=a.play();
    if(p&&p.then)p.then(function(){if(mi)mi.textContent='❚❚'}).catch(function(){});
  }
  if(m)m.addEventListener('click',function(){if(a.paused){a.play();mi.textContent='❚❚'}else{a.pause();mi.textContent='♪'}});
  if(i){
    // PRUEBA: el sobre se abre al ritmo del dedo (desliza hacia arriba) o con un toque; al soltar, se completa o vuelve
    var env=i.querySelector('.env'),flap=i.querySelector('.e-flap'),site=document.getElementById('site');
    var p=0,y0=0,p0=0,down=false,moved=false,raf=0,fin=false,wt=0;
    var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    var DIST=Math.min(340,innerHeight*.42);
    function clamp(v){return Math.max(0,Math.min(1,v))}
    function measure(){   // encoger solo lo necesario y centrar sobre + solapa levantada (como antes)
      if(!env||p>0)return;
      var r=env.getBoundingClientRect(),W=r.width,H=window.innerHeight;
      var s=Math.min(1,(H-56)/(W*1.1)),dy=H/2-0.1285*W*s-r.top;
      env.style.setProperty('--s',s.toFixed(3));env.style.setProperty('--dy',dy.toFixed(1)+'px');
    }
    function setP(v){
      p=clamp(v);
      i.style.setProperty('--p',p.toFixed(4));
      i.style.setProperty('--c',clamp((p-.36)/.64).toFixed(4));
      if(flap)flap.style.zIndex=p>=.5?0:5;
      if(p>0.02){i.classList.add('moving');if(site&&site.hidden)site.hidden=false}
    }
    function finish(){
      if(fin)return;fin=true;
      document.body.classList.remove('locked');window.scrollTo(0,0);
      i.classList.add('done');playMusic();
    }
    function animateTo(target){
      cancelAnimationFrame(raf);
      if(reduce){setP(target);if(target===1)finish();return}
      var from=p,t0=performance.now(),dur=250+1150*Math.abs(target-from);
      (function step(now){
        var k=Math.min(1,(now-t0)/dur),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
        setP(from+(target-from)*e);
        if(k<1)raf=requestAnimationFrame(step);else if(target===1)finish();
      })(t0);
    }
    measure();addEventListener('resize',function(){DIST=Math.min(340,innerHeight*.42);measure()});
    i.classList.add('scrub');
    i.addEventListener('pointerdown',function(e){
      if(fin)return;cancelAnimationFrame(raf);down=true;moved=false;y0=e.clientY;p0=p;playMusic();
      try{i.setPointerCapture(e.pointerId)}catch(_){}
    });
    i.addEventListener('pointermove',function(e){
      if(!down||fin)return;var dy=y0-e.clientY;
      if(Math.abs(dy)>8)moved=true;
      if(moved)setP(p0+dy/DIST);
    });
    function up(){
      if(!down||fin)return;down=false;playMusic();
      if(!moved)animateTo(1);else animateTo(p>.4?1:0);
    }
    i.addEventListener('pointerup',up);
    i.addEventListener('pointercancel',function(){if(!down)return;down=false;animateTo(p>.4?1:0)});
    // rueda del ratón / trackpad
    i.addEventListener('wheel',function(e){
      if(fin)return;e.preventDefault();cancelAnimationFrame(raf);
      setP(p+e.deltaY/700);clearTimeout(wt);wt=setTimeout(function(){animateTo(p>.4?1:0)},180);
    },{passive:false});
    // teclado (Enter / Espacio sobre el botón)
    i.addEventListener('click',function(e){if(e.detail===0&&!fin){playMusic();animateTo(1)}});
  }
  // Ilustraciones de muestra (solo en local; no se publican)
  if(C.demo&&C.demo.ilustraciones){
    var base='../local-demo/';
    document.body.classList.add('demo-ilus');
  }
  // Encuadre de cada foto (config.fotos.enfoque)
  (function(){
    var gl=document.getElementById('galList'),E=(C.fotos&&C.fotos.enfoque)||{};if(!gl)return;
    [].forEach.call(gl.querySelectorAll('img'),function(im){var s=im.getAttribute('src')||'';Object.keys(E).forEach(function(k){if(s.slice(-k.length)===k)im.style.objectPosition=E[k]})});
  })();
  // Estilo de la galería: carrusel | mosaico | polaroid (config.fotos.estilo; en local se puede probar con ?galeria=mosaico)
  (function(){
    var g=document.getElementById('galeria');if(!g)return;
    var est=(C.fotos&&C.fotos.estilo)||'carrusel';
    var q=/[?&]galeria=(\w+)/.exec(location.search);if(q&&C.demo&&C.demo.ilustraciones)est=q[1];
    if(['carrusel','mosaico','polaroid','arcos','marcos','parallax','pelicula','destacada'].indexOf(est)<0)est='carrusel';
    g.classList.add('g-'+est);
  })();
  // Mosaico: la primera foto va ancha; si sobra una suelta, la última también
  (function(){
    var gl=document.getElementById('galList');if(!gl)return;
    function lay(){var it=[].slice.call(gl.children);it.forEach(function(e,i){e.classList.toggle('w',i===0||(i===it.length-1&&it.length>2&&(it.length-1)%2===1))})}
    new MutationObserver(lay).observe(gl,{childList:true});lay();
  })();
  // Hueco de fotos (solo en local, para ver dónde irán; no se publica)
  if(C.demo&&C.demo.ilustraciones){
    var g=document.getElementById('galeria'),gl=document.getElementById('galList');
    if(g&&gl&&!gl.children.length){
      g.hidden=false;
      gl.innerHTML=['Foto','Foto','Foto'].map(function(x){return '<div class="ph">'+x+'<small>aquí irá una foto vuestra</small></div>'}).join('');
    }
  }
  // Carrusel de fotos: puntos que siguen al deslizar
  (function(){
    var gl=document.getElementById('galList'),g=document.getElementById('galeria');if(!gl||!g)return;
    var dots=document.createElement('div');dots.className='gdots';g.appendChild(dots);
    function items(){return [].slice.call(gl.children)}
    function build(){dots.innerHTML=items().map(function(_,i){return '<i data-i="'+i+'"></i>'}).join('');upd()}
    function upd(){var it=items();if(!it.length)return;var c=gl.scrollLeft+gl.clientWidth/2,best=0,bd=1e9;
      it.forEach(function(e,i){var d=Math.abs(e.offsetLeft+e.offsetWidth/2-c);if(d<bd){bd=d;best=i}});
      [].forEach.call(dots.children,function(d,i){d.classList.toggle('cur',i===best)})}
    dots.addEventListener('click',function(e){var i=e.target.dataset.i;if(i==null)return;var el=items()[i];gl.scrollTo({left:el.offsetLeft-(gl.clientWidth-el.offsetWidth)/2,behavior:'smooth'})});
    gl.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});
    new MutationObserver(function(){build();gl.scrollLeft=0}).observe(gl,{childList:true});build();gl.scrollLeft=0;
  })();
  // Colores reservados: muestras de pintura con su nombre
  (function(){
    var s=document.getElementById('swatches'),D=C.dressCode||{};if(!s||!D.coloresEvitar)return;
    var N=D.nombresColores||{};
    s.classList.add('chips');
    var any=D.coloresEvitar.some(function(c){return N[c]});if(!any)s.classList.add('nocap');
    s.innerHTML=D.coloresEvitar.map(function(c){return '<figure class="chip"><span style="background:'+c+'"></span>'+(N[c]?'<figcaption>'+N[c]+'</figcaption>':'')+'</figure>'}).join('');
  })();
  // Programa del día: la línea se dibuja al bajar y cada hora aparece cuando la línea llega a ella
  (function(){
    var tl=document.getElementById('tl');if(!tl)return;
    if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    tl.classList.add('anim');
    var lis=[].slice.call(tl.children),tick=false;
    function upd(){
      tick=false;var r=tl.getBoundingClientRect(),h=r.height||1;
      var reach=innerHeight*.72-r.top;                  // píxeles de línea ya "recorridos"
      var p=Math.max(0,Math.min(1,reach/h));
      tl.style.setProperty('--p',p.toFixed(3));
      lis.forEach(function(li){li.classList.toggle('in',reach>=li.offsetTop+14)});
    }
    addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
    addEventListener('resize',upd);upd();
  })();
  // Fotos: aparecen una a una al llegar a ellas; al pulsar una se ve grande
  (function(){
    var g=document.getElementById('galeria'),gl=document.getElementById('galList');if(!g||!gl)return;
    var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    var io='IntersectionObserver' in window&&!reduce?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15}):null;
    function prep(){
      var kids=[].slice.call(gl.children);
      if(!io||g.classList.contains('g-carrusel')||g.classList.contains('g-pelicula')||g.classList.contains('g-destacada')){kids.forEach(function(k){k.classList.add('in')});return}
      g.classList.add('gal-anim');
      kids.forEach(function(k,i){if(k.dataset.seen)return;k.dataset.seen=1;k.style.setProperty('--d',(i%2)*.18+'s');io.observe(k)});
    }
    new MutationObserver(prep).observe(gl,{childList:true});prep();
    // visor
    var lb;
    function openLB(src){
      if(!lb){lb=document.createElement('div');lb.className='lightbox';lb.hidden=true;lb.innerHTML='<img alt=""><button type="button" aria-label="'+tr('Cerrar')+'">×</button>';document.body.appendChild(lb);
        lb.addEventListener('click',function(){lb.hidden=true;document.body.classList.remove('locked')});
        document.addEventListener('keydown',function(ev){if(ev.key==='Escape'&&!lb.hidden){lb.hidden=true;document.body.classList.remove('locked')}})}
      lb.querySelector('img').src=src;lb.hidden=false;document.body.classList.add('locked');
    }
    g._open=openLB;
    gl.addEventListener('click',function(e){
      var im=e.target.closest&&e.target.closest('img');if(!im)return;
      if(g.classList.contains('g-destacada'))return;
      openLB(im.currentSrc||im.src);
    });
  })();
  // Frase de bienvenida: las palabras se van oscureciendo al bajar, con pétalos de hortensia cayendo
  (function(){
    var sec=document.getElementById('frase'),p=document.getElementById('welcome');if(!sec||!p)return;
    var txt=(p.textContent||'').trim();if(!txt)return;
    var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    p.innerHTML=txt.split(/\s+/).map(function(w){return '<span class="wd">'+w+'</span>'}).join(' ');
    if(reduce){sec.classList.add('static');return}
    // pétalos de hortensia (SVG con degradado, brillo y nervios), en tres planos de profundidad
    function petal(a,b,c,vein){
      var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="g" cx="48%" cy="70%" r="66%"><stop offset="0" stop-color="'+a+'"/><stop offset=".55" stop-color="'+b+'"/><stop offset="1" stop-color="'+c+'"/></radialGradient>'+
        '<linearGradient id="h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>'+
        '<path d="M50 98C12 75 0 35 25 11C36 2 46 4 50 13C54 4 64 2 75 11C100 35 88 75 50 98Z" fill="url(#g)"/>'+
        '<path d="M50 98C12 75 0 35 25 11C36 2 46 4 50 13C54 4 64 2 75 11C100 35 88 75 50 98Z" fill="url(#h)"/>'+
        '<path d="M50 90V24M50 72L32 52M50 72L68 52M50 56L39 40M50 56L61 40" stroke="'+vein+'" stroke-opacity=".34" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>';
      return 'url("data:image/svg+xml;utf8,'+encodeURIComponent(s)+'")';
    }
    var KINDS=[
      petal('#6C8CC2','#9DB7DD','#D3E0F2','#ffffff'),petal('#8AA6D2','#B1C6E6','#DDE8F6','#ffffff'),
      petal('#E8DDBF','#F8F2DE','#FFFFFF','#B9AE86'),petal('#F1EAD5','#FCF9F0','#FFFFFF','#B9AE86'),petal('#FFFFFF','#F6F8FB','#E3EBF5','#9BB0CC'),
      petal('#8CAE7C','#B6CEA6','#DBE8D0','#ffffff'),
      petal('#C79F45','#E3C77F','#F7E8BC','#ffffff'),petal('#D9B766','#EED9A2','#FAF1D3','#ffffff')];
    var WEIGHTS=[0,1,2,3,4,0,3,1,5,2,4,0,6,3,7,1,4,2];   // mezcla: azules, cremas, blancos y algún verde
    var LAYERS=[ // [tamaño mín, máx, desenfoque, opacidad, duración mín, máx]
      [11,16,.4,.7,17,24],[11,16,.4,.7,17,24],[20,30,0,.95,11,16],[20,30,0,.95,11,16],[20,30,0,.95,11,16],[44,64,2.4,.82,7.5,10.5]];
    var box=document.createElement('div');box.className='petals';box.setAttribute('aria-hidden','true');
    for(var k=0;k<WEIGHTS.length;k++){
      var L=LAYERS[(k*7+3)%LAYERS.length],s=document.createElement('i'),sz=L[0]+Math.random()*(L[1]-L[0]),dur=L[4]+Math.random()*(L[5]-L[4]);
      s.style.cssText='left:'+(Math.random()*104-2).toFixed(1)+'%;width:'+sz.toFixed(1)+'px;height:'+(sz*1.06).toFixed(1)+'px;background-image:'+KINDS[WEIGHTS[k]]+
        ';opacity:'+L[3]+';animation-duration:'+dur.toFixed(1)+'s,'+(5+Math.random()*4).toFixed(1)+'s,'+(3+Math.random()*3).toFixed(1)+'s;animation-delay:'+(-Math.random()*dur).toFixed(1)+'s,'+(-Math.random()*6).toFixed(1)+'s,'+(-Math.random()*5).toFixed(1)+'s;--dx:'+(Math.random()*110-55).toFixed(0)+'px';
      box.appendChild(s);
    }
    sec.querySelector('.frase-in').appendChild(box);
    // oscurecimiento al bajar
    var ws=[].slice.call(p.children),n=ws.length,tick=false;
    function upd(){
      tick=false;var r=sec.getBoundingClientRect(),vh=innerHeight,span=Math.max(1,r.height-vh);
      var pr=Math.max(0,Math.min(1,-r.top/span));   // empieza clara y se oscurece mientras la frase está en pantalla
      ws.forEach(function(w,i){var t=Math.max(0,Math.min(1,pr*(n+.6)-i));w.style.opacity=(.16+.84*t).toFixed(3)});
      sec.style.setProperty('--ln',Math.min(1,Math.max(0,(pr-.7)/.3)).toFixed(3));
    }
    addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
    addEventListener('resize',upd);upd();
  })();
  // Programa del día con la hora fija: la pantalla se queda quieta y va cambiando cada momento al bajar
  (function(){
    var sec=document.getElementById('timeline'),tl=document.getElementById('tl'),T=C.timeline||[];
    if(!sec||!tl||T.length<2)return;
    if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var n=T.length,h2=sec.querySelector('h2'),eb=sec.querySelector('.eyebrow');
    var inn=document.createElement('div');inn.className='pd-in';
    if(h2)inn.appendChild(h2);if(eb)inn.appendChild(eb);
    var st=document.createElement('div');st.className='pd-stage';
    st.innerHTML=T.map(function(r,i){return '<div class="pd-item"><b>'+r[0]+'</b><span>'+r[1]+'</span></div>'}).join('');
    var dots=document.createElement('div');dots.className='pd-dots';
    dots.innerHTML=T.map(function(r,i){return '<i><u></u><small>'+r[0].replace(' h','')+'</small></i>'}).join('');
    inn.appendChild(st);inn.appendChild(dots);sec.appendChild(inn);
    sec.classList.add('pinned');sec.style.height=(100+n*60)+'svh';
    var items=[].slice.call(st.children),dd=[].slice.call(dots.children),cur=-1,tick=false;
    function upd(){
      tick=false;var r=sec.getBoundingClientRect(),span=Math.max(1,r.height-innerHeight);
      var p=Math.max(0,Math.min(.9999,-r.top/span)),i=Math.floor(p*n);
      if(i===cur)return;cur=i;
      items.forEach(function(e,k){e.classList.toggle('on',k===i);e.classList.toggle('past',k<i)});
      dd.forEach(function(e,k){e.classList.toggle('on',k===i);e.classList.toggle('done',k<i)});
    }
    addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
    addEventListener('resize',function(){cur=-1;upd()});upd();
  })();
  // Galería parallax: cada columna se mueve a distinto ritmo al bajar
  // Galería tira de película: la tira avanza sola al bajar (y se puede deslizar con el dedo)
  (function(){
    var g=document.getElementById('galeria'),gl=document.getElementById('galList');if(!g||!gl)return;
    if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var tick=false;
    function upd(){
      tick=false;
      if(g.classList.contains('g-parallax')){
        var vh=innerHeight;
        [].forEach.call(gl.children,function(k,i){var r=k.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;
          var f=(i%2===0)?.09:-.12;k.style.translate='0 '+(((r.top+r.height/2)-vh/2)*f).toFixed(1)+'px'});
      }else if(g.classList.contains('g-pelicula')){
        var gr=g.getBoundingClientRect(),vh2=innerHeight,max=gl.scrollWidth-gl.clientWidth;if(max<=0)return;
        var p=Math.max(0,Math.min(1,(vh2-gr.top)/(vh2+gr.height)));
        if(!gl.dataset.touched)gl.scrollLeft=p*max;
      }
    }
    gl.addEventListener('touchstart',function(){gl.dataset.touched=1},{passive:true});
    gl.addEventListener('wheel',function(e){if(Math.abs(e.deltaX)>Math.abs(e.deltaY))gl.dataset.touched=1},{passive:true});
    addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
    addEventListener('resize',upd);upd();
  })();
  // Galería destacada: una foto grande y las demás como miniaturas debajo
  (function(){
    var g=document.getElementById('galeria'),gl=document.getElementById('galList');if(!g||!gl||!g.classList.contains('g-destacada'))return;
    var main=document.createElement('div');main.className='gd-main';
    var big=document.createElement('img');big.alt='';main.appendChild(big);
    var cnt=document.createElement('span');cnt.className='gd-count';main.appendChild(cnt);
    g.insertBefore(main,gl);
    var cur=-1;
    function imgs(){return [].slice.call(gl.querySelectorAll('img'))}
    function show(i){
      var l=imgs();if(!l.length)return;i=(i+l.length)%l.length;if(i===cur)return;cur=i;
      big.classList.add('sw');
      setTimeout(function(){big.src=l[i].currentSrc||l[i].src;big.style.objectPosition=l[i].style.objectPosition||'';big.classList.remove('sw')},180);
      l.forEach(function(e,k){e.classList.toggle('act',k===i)});cnt.textContent=(i+1)+' / '+l.length;
      var t=l[i];gl.scrollTo({left:t.offsetLeft-(gl.clientWidth-t.offsetWidth)/2,behavior:'smooth'});
    }
    gl.addEventListener('click',function(e){var im=e.target.closest&&e.target.closest('img');if(im)show(imgs().indexOf(im))});
    main.addEventListener('click',function(){if(g._open)g._open(big.src)});
    var tx=0;main.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
    main.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1))},{passive:true});
    function init(){var l=imgs();if(l.length&&cur<0){cur=-2;show(0);}}
    new MutationObserver(init).observe(gl,{childList:true});setTimeout(init,50);init();
  })();
  // Fotos: la imagen se desliza suavemente dentro de su marco al bajar (mosaico, marcos y arcos)
  (function(){
    var g=document.getElementById('galeria'),gl=document.getElementById('galList');if(!g||!gl)return;
    if(!(g.classList.contains('g-mosaico')||g.classList.contains('g-marcos')||g.classList.contains('g-arcos')))return;
    if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var tick=false;
    function base(im){
      if(!im._b){var m=(im.style.objectPosition||'50% 50%').match(/(-?[\d.]+)%\s+(-?[\d.]+)%/);im._b=m?[+m[1],+m[2]]:[50,50]}return im._b;
    }
    function upd(){
      tick=false;var vh=innerHeight;
      [].forEach.call(gl.querySelectorAll('img'),function(im){
        var r=im.getBoundingClientRect();if(r.bottom<-50||r.top>vh+50||!im.naturalWidth)return;
        var p=Math.max(0,Math.min(1,(vh-r.top)/(vh+r.height))),t=p-.5,b=base(im);
        var horiz=(im.naturalWidth/im.naturalHeight)>(r.width/r.height);   // sobra imagen a los lados o arriba/abajo
        var x=b[0],y=b[1];
        if(horiz)x=Math.max(0,Math.min(100,b[0]+t*36));else y=Math.max(0,Math.min(100,b[1]+t*36));
        im.style.objectPosition=x.toFixed(1)+'% '+y.toFixed(1)+'%';
      });
    }
    addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
    addEventListener('resize',upd);setTimeout(upd,300);
  })();
  // Hortensias de la portada: dos ramos en acuarela en las esquinas
  (function(){
    var hero=document.querySelector('.hero');if(!hero)return;
    [['tr','hort-tr.png'],['bl','hort-bl.png']].forEach(function(r){
      var im=new Image();im.src='../shared/img/'+r[1];im.alt='';im.className='hyd '+r[0];im.setAttribute('aria-hidden','true');im.decoding='async';hero.appendChild(im);
    });
  })();
  // Firma del pie: la frase de encima de los nombres sube y aparece al llegar al pie
  (function(){
    var f=document.querySelector('.foot'),ch=f;if(!ch)return;
    if(!('IntersectionObserver' in window)||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches))return;
    f.classList.add('anim');
    new IntersectionObserver(function(es,o){es.forEach(function(e){if(e.isIntersecting){f.classList.add('show');o.disconnect()}})},{threshold:.35}).observe(ch);
  })();
  // Solo en local: ?abrir abre el sobre solo (para hacer capturas)
  if(C.demo&&C.demo.ilustraciones&&/[?&]abrir\b/.test(location.search)){
    var mm=document.getElementById('music');if(mm)mm.style.display='none';
    setTimeout(function(){var it=document.getElementById('intro');if(it)it.click()},300);
  }
  // Número de cuenta: en dos líneas, por grupos, sin partirse
  (function(){
    var el=document.getElementById('regIban'),iban=C.regalos&&C.regalos.iban;if(!el||!iban)return;
    var one=iban.replace(/\s+/g,'').replace(/(.{4})/g,'$1 ').trim();
    el.innerHTML='<span class="ib-lbl">'+tr('Número de cuenta')+'</span><span class="ib-row">'+one+'</span>';
    el.classList.add('ib');
  })();
  // Número de cuenta oculto: se destapa al tocar el botón
  (function(){
    var el=document.getElementById('regIban'),cp=document.getElementById('copyIban'),iban=C.regalos&&C.regalos.iban;if(!el||!iban)return;
    var box=document.createElement('div');box.className='ib-reveal';box.id='ibReveal';
    var inner=document.createElement('div');inner.className='ib-inner';
    el.parentNode.insertBefore(box,el);box.appendChild(inner);inner.appendChild(el);if(cp)inner.appendChild(cp);
    var t=document.createElement('button');t.type='button';t.className='btn ghost ib-toggle';t.setAttribute('aria-expanded','false');t.setAttribute('aria-controls','ibReveal');
    t.innerHTML='<span class="ib-ic" aria-hidden="true">♡</span> <span class="ib-tx">'+tr('Ver número de cuenta')+'</span>';
    box.parentNode.insertBefore(t,box);
    t.addEventListener('click',function(){
      var open=box.classList.toggle('open');t.setAttribute('aria-expanded',open?'true':'false');
      t.querySelector('.ib-tx').textContent=tr(open?'Ocultar número de cuenta':'Ver número de cuenta');
      t.querySelector('.ib-ic').textContent=open?'♥':'♡';
    });
  })();
  // Calendario .ics
  var b=document.getElementById('icsBtn');
  if(b)b.addEventListener('click',function(){
    var l=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Boda//ES','BEGIN:VEVENT','UID:boda-clara-mateo-20270612@boda','DTSTAMP:20260101T000000Z',
      'DTSTART:20270612T160000Z','DTEND:20270613T030000Z','SUMMARY:'+tr('Boda de Clara & Mateo'),
      'LOCATION:'+(C.ceremonia?C.ceremonia.lugar+', '+C.ceremonia.direccion:'')].concat(['BEGIN:VALARM', 'TRIGGER:-P7D', 'ACTION:DISPLAY', 'DESCRIPTION:'+tr('Falta una semana para la boda de Clara y Mateo'), 'END:VALARM', 'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:'+tr('Mañana es la boda de Clara y Mateo'), 'END:VALARM', 'BEGIN:VALARM', 'TRIGGER:-PT3H', 'ACTION:DISPLAY', 'DESCRIPTION:'+tr('La ceremonia es a las {0}',tr(C.ceremonia?C.ceremonia.hora:'18:00 h')), 'END:VALARM'],['END:VEVENT','END:VCALENDAR']).join('\r\n');
    var u=URL.createObjectURL(new Blob([l],{type:'text/calendar'})),x=document.createElement('a');x.href=u;x.download='boda-clara-mateo.ics';document.body.appendChild(x);x.click();x.remove();
  });
  // Copiar número de cuenta
  var iban=C.regalos&&C.regalos.iban,cb=document.getElementById('copyIban');
  if(cb&&iban){cb.hidden=false;cb.addEventListener('click',function(){try{navigator.clipboard.writeText(iban);cb.textContent=tr('¡Copiado!')}catch(e){}});}
})();

// Botón flotante "Confirmar asistencia": para quien vuelve a entrar y no quiere recorrer toda la invitación
(function(){
  var rs=document.getElementById('rsvp'),b=document.getElementById('goRsvp');if(!rs||!b)return;
  var KEY='boda-rsvp-enviado',VKEY='boda-visitada',sent=false,back=false;
  try{sent=localStorage.getItem(KEY)==='1';back=localStorage.getItem(VKEY)==='1'}catch(e){}   // back = ya había entrado antes
  function label(){b.textContent=tr(sent?'Modificar mi respuesta':'Confirmar asistencia')}
  function upd(){
    if(document.body.classList.contains('locked')){b.hidden=true;return}
    try{localStorage.setItem(VKEY,'1')}catch(e){}        // anota que ya ha abierto el sobre
    var atEnd=scrollY+innerHeight>=document.documentElement.scrollHeight-200;   // ha llegado al final de la página
    if(!back&&!sent&&!atEnd){b.hidden=true;return}        // primera visita: solo sale al llegar abajo del todo
    var r=rs.getBoundingClientRect(),inView=r.top<innerHeight*.55&&r.bottom>innerHeight*.2;
    b.hidden=(inView&&!atEnd)||rs.classList.contains('done');
  }
  label();
  b.addEventListener('click',function(e){e.preventDefault();rs.scrollIntoView({behavior:'smooth',block:'start'})});
  addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});
  addEventListener('resize',upd);
  if(window.MutationObserver){
    new MutationObserver(function(){
      if(rs.classList.contains('done')&&!sent){sent=true;try{localStorage.setItem(KEY,'1')}catch(e){};label()}
      upd();
    }).observe(rs,{attributes:true,attributeFilter:['class']});
    new MutationObserver(upd).observe(document.body,{attributes:true,attributeFilter:['class']});
  }
  upd();
})();

// Textura de papel acuarela: activa para todos (se pone en el <head>); con ?sinpapel en el enlace se puede ver sin ella
if(/[?&]sinpapel\b/.test(location.search))document.documentElement.classList.remove('papel');
