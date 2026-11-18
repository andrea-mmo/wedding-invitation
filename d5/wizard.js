// Formulario por pasos (carrusel): cada sección aparece al terminar la anterior.
(function(){
  var d=document,form=d.getElementById('form');if(!form)return;
  var $=function(id){return d.getElementById(id)};
  var back=$('wizBack'),next=$('wizNext'),send=$('send'),err=$('err'),lbl=$('wizLbl'),dots=$('wizDots'),note=$('wizNote');
  var steps=[].slice.call(form.querySelectorAll('.step')),cur=0,first=true,ret=false,reviewStep=$('review');
  var radio=function(n){var e=form.querySelector('input[name="'+n+'"]:checked');return e?e.value:''};
  function active(){return steps.filter(function(s){var n=s.parentNode;while(n&&n!==form){if(n.hidden)return false;n=n.parentNode}return true})}
  function msg(t){err.textContent=t||''}

  function validate(s){
    var i=steps.indexOf(s);
    if(i===0){
      if($('nombre').value.trim().split(/\s+/).length<2)return tr('Escribe tu nombre y apellidos.');
    }else if(i===1){
      if(!radio('asiste'))return tr('Indícanos si asistirás.');
      if(radio('asiste')==='Sí'&&$('contacto')&&$('contacto').value.trim()){var ce=window.contactError&&window.contactError($('contacto').value);if(ce)return ce}   // teléfono opcional: solo se revisa si lo escriben
    }else if(i===2){
      if(radio('acomp')==='Sí'&&!$('acompNombre').value.trim())return tr('Escribe el nombre y apellidos de tu acompañante.');
      if(radio('ninos')==='Sí'){
        var n=Math.min(6,Math.max(1,+$('ninosN').value||1));
        for(var k=0;k<n;k++){var a=$('kidN'+k),e=$('kidE'+k);if(!a||!a.value.trim()||!e||e.value.trim()==='')return tr('Indica nombre y edad de cada niño/a.')}
      }
    }else if(i===3){
      var ps=[].slice.call(d.querySelectorAll('#personas .person'));
      for(var j=0;j<ps.length;j++){
        var sa=ps[j].querySelector('[data-f="alergia"]'),de=ps[j].querySelector('[data-f="detalle"]'),mn=ps[j].querySelector('[data-f="menu"]'),ot=ps[j].querySelector('[data-f="otro"]');
        var who=ps[j].querySelector('h4').textContent.trim();
        if(sa&&sa.value==='Sí'&&!de.value.trim())return tr('Indica la alergia de {0}.',who);
        if(mn&&mn.value==='Otro'&&!ot.value.trim())return tr('Indica el menú especial de {0}.',who);
      }
    }else if(i===4){
      var b=radio('bus');
      if(b&&b!=='No'){
        var pl=+$('plazas').value||0,tot=d.querySelectorAll('#personas .person').length||1;
        if(pl<1)return tr('Indica cuántas plazas de autobús necesitas.');
        if(pl>tot)return tr('Has pedido más plazas de autobús que personas en tu invitación.');
        if(b!=='Sí, solo ida'&&!radio('vuelta'))return tr('Elige el horario de regreso.');
      }
    }
    return '';
  }

  // resumen de respuestas antes de enviar
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function row(k,v){return k?'<p><span>'+tr(k)+':</span>'+esc(v)+'</p>':'<p>'+esc(v)+'</p>'}
  function sec(title,i,rows){return '<section class="rv-sec"><div class="rv-h"><span>'+tr(title)+'</span><button type="button" class="rv-edit" data-go="'+i+'">'+tr('Editar')+'</button></div>'+rows+'</section>'}
  function buildReview(){
    var box=$('rv');if(!box)return;
    var v=function(id){var e=$(id);return e?e.value.trim():''},as=radio('asiste'),h='';
    h+=sec('Tus datos',0,row('Nombre',v('nombre')));
    h+=sec('Asistencia',1,row('',tr(as==='Sí'?'Sí, allí estaré':'No podré asistir'))+(as==='Sí'&&v('contacto')?row('Teléfono',v('contacto')):''));
    if(as==='Sí'){
      var r=row('Acompañante',radio('acomp')==='Sí'?v('acompNombre'):tr('No'));
      if(radio('ninos')==='Sí'){
        var n=Math.min(6,Math.max(1,+$('ninosN').value||1)),kids=[];
        for(var k=0;k<n;k++){var a=$('kidN'+k),e=$('kidE'+k);if(a&&a.value.trim())kids.push(a.value.trim()+(e&&e.value.trim()!==''?' ('+e.value.trim()+' '+tr(e.value.trim()==='1'?'año':'años')+')':''))}
        r+=row('Niños/as',kids.join(', '))+row('Menú infantil',tr(radio('menuInf')||'No'));
      }else r+=row('Niños/as',tr('No'));
      h+=sec('Acompañantes',2,r);
      var al='';
      [].forEach.call(d.querySelectorAll('#personas .person'),function(p){
        var sa=p.querySelector('[data-f="alergia"]'),de=p.querySelector('[data-f="detalle"]'),mn=p.querySelector('[data-f="menu"]'),ot=p.querySelector('[data-f="otro"]');
        var txt=tr('{0} · Menú: {1}',sa&&sa.value==='Sí'?tr('Alergia: {0}',de?de.value.trim():''):tr('Sin alergias'),mn&&mn.value==='Otro'?(ot?ot.value.trim():tr('Otro')):tr(mn?mn.value:'Ninguno'));
        al+=row(p.querySelector('h4').textContent.trim(),txt);
      });
      h+=sec('Alergias y menús',3,al);
      var b=radio('bus')||'No',bs=row('Plaza de autobús',tr(b));
      if(b!=='No'){if(b!=='Sí, solo ida')bs+=row('Regreso',tr(radio('vuelta')));bs+=row('Plazas',v('plazas'))}
      h+=sec('Autobús',4,bs);
      var c=form.querySelector('[name="cancion"]');
      h+=sec('Música',5,row('Canción',c&&c.value.trim()?c.value.trim():'—'));
    }
    box.innerHTML=h;
  }
  $('rv')&&$('rv').addEventListener('click',function(e){
    var b=e.target.closest('.rv-edit');if(!b)return;
    var i=active().indexOf(steps[+b.dataset.go]);if(i<0)return;
    ret=true;form.dataset.dir='back';cur=i;render(true);
  });

  // al cambiar de paso, "Paso X de 6" queda siempre en el mismo sitio de la pantalla (ni fotos arriba, ni título del formulario)
  function place(){
    var go=function(){var y=lbl.getBoundingClientRect().top-14;if(Math.abs(y)>2)window.scrollBy({top:y,left:0,behavior:'instant'})};
    go();setTimeout(go,350);
  }
  function render(scroll,keep){
    var list=active();if(cur>=list.length)cur=list.length-1;
    var tb=$('telBox');if(tb)tb.hidden=radio('asiste')!=='Sí';   // el teléfono (opcional) solo aparece al confirmar que sí van
    steps.forEach(function(s){s.classList.remove('on')});
    var s=list[cur];s.classList.add('on');
    var last=cur===list.length-1;
    back.hidden=cur===0;next.hidden=last;send.hidden=!last;
    if(last&&radio('asiste')==='No')note.hidden=false;
    lbl.textContent=radio('asiste')?tr('Paso {0} de {1} · {2}',cur+1,list.length,s.dataset.t||''):tr('Paso {0} · {1}',cur+1,s.dataset.t||'');
    dots.innerHTML=!radio('asiste')?'':list.map(function(_,i){return '<i class="'+(i<cur?'done':i===cur?'cur':'')+'"></i>'}).join('');
    if(s===reviewStep){ret=false;buildReview()}
    if(!keep)msg('');
        if(scroll&&!first)place();
    first=false;
  }
  var busy=false,reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(dir){
    if(busy)return;
    var s=active()[cur];
    if(dir>0){var m=validate(s);if(m){msg(m);return}}
    var n=Math.max(0,Math.min(active().length-1,cur+dir));
    if(ret&&dir>0)n=active().length-1;
    if(n===cur)return;
    form.dataset.dir=dir>0?'fwd':'back';
    if(reduce){cur=n;render(true);return}
    busy=true;s.classList.add('out');
    setTimeout(function(){s.classList.remove('out');cur=n;render(true);busy=false},260);
  }
  // deslizar con el dedo: izquierda = siguiente, derecha = atrás
  var tx=0,ty=0;
  form.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
  form.addEventListener('touchend',function(e){
    var dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;
    if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.8)go(dx<0?1:-1);
  },{passive:true});
  next.addEventListener('click',function(){go(1)});
  back.addEventListener('click',function(){go(-1)});
  form.addEventListener('keydown',function(e){
    if(e.key==='Enter'&&e.target.tagName!=='TEXTAREA'&&e.target.tagName!=='BUTTON'){
      e.preventDefault();var l=active();if(cur<l.length-1)go(1);else send.click();
    }
  });
  // un envío antes del último paso nunca debe llegar a app.js
  form.addEventListener('submit',function(e){
    var l=active();
    if(cur<l.length-1){e.preventDefault();e.stopImmediatePropagation();go(1);return}
    for(var i=0;i<l.length;i++){var m=validate(l[i]);if(m){e.preventDefault();e.stopImmediatePropagation();cur=i;render(true);msg(m);return}}
  },true);
  // teclado abierto: sin cálculos propios (peleaban con el iPhone y la página saltaba); solo se sube el campo una vez, con una distancia fija desde arriba
  function isField(e){return e&&form.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)&&e.type!=='radio'&&e.type!=='checkbox'}
  function reveal(el){if(el===d.activeElement)try{el.scrollIntoView({block:'start',inline:'nearest',behavior:'instant'})}catch(_){el.scrollIntoView(true)}}
  form.addEventListener('focusin',function(e){var el=e.target;if(!isField(el))return;form.classList.add('kb');setTimeout(function(){reveal(el)},380);setTimeout(function(){reveal(el)},950)});
  form.addEventListener('focusout',function(){setTimeout(function(){if(!isField(d.activeElement))form.classList.remove('kb')},120)});
  // el aviso de error desaparece en cuanto el invitado vuelve a escribir
  form.addEventListener('input',function(e){if(isField(e.target)&&err.textContent)msg('')});
  // la barra de botones solo tiene fondo cuando está pegada abajo
  var bar=d.querySelector('.wiz-bar'),bt=false;
  function chkBar(){bt=false;if(!bar)return;var r=bar.getBoundingClientRect();bar.classList.toggle('stuck',r.bottom>=innerHeight-2&&r.top<innerHeight)}
  addEventListener('scroll',function(){if(!bt){bt=true;requestAnimationFrame(chkBar)}},{passive:true});addEventListener('resize',chkBar);setTimeout(chkBar,400);
  // si cambian las respuestas, se recalcula la lista de pasos
  form.addEventListener('change',function(){setTimeout(function(){render(false,true)},0)});
  // al enviar: se oculta la cabecera de la sección y solo queda el mensaje dentro del arco
  var th=$('thanks'),rs=$('rsvp');
  if(th&&rs&&window.MutationObserver)new MutationObserver(function(){rs.classList.toggle('done',!th.hidden)}).observe(th,{attributes:true,attributeFilter:['hidden']});
  render(false);

  // desplegable propio: se abre hacia abajo con el mismo estilo que los campos
  function enhance(sel){
    if(sel.dataset.dd)return;sel.dataset.dd=1;
    var w=d.createElement('div');w.className='dd';
    var b=d.createElement('button');b.type='button';b.className='dd-btn';b.setAttribute('aria-haspopup','listbox');
    var ul=d.createElement('ul');ul.className='dd-list';ul.setAttribute('role','listbox');ul.hidden=true;
    sel.parentNode.insertBefore(w,sel);w.appendChild(sel);w.appendChild(b);w.appendChild(ul);
    sel.classList.add('dd-native');sel.tabIndex=-1;
    function paint(){var so=sel.options[sel.selectedIndex];b.textContent=so?so.text:sel.value;[].forEach.call(ul.children,function(li){li.classList.toggle('sel',li.dataset.v===sel.value)})}
    [].forEach.call(sel.options,function(o){var li=d.createElement('li');li.dataset.v=o.value;li.textContent=o.text;li.setAttribute('role','option');ul.appendChild(li)});
    function close(){ul.hidden=true;w.classList.remove('open')}
    b.addEventListener('click',function(e){e.preventDefault();var o=ul.hidden;d.querySelectorAll('.dd.open').forEach(function(x){x.classList.remove('open');x.querySelector('.dd-list').hidden=true});if(o){ul.hidden=false;w.classList.add('open')}});
    ul.addEventListener('click',function(e){var li=e.target.closest('li');if(!li)return;sel.value=li.dataset.v;paint();close();sel.dispatchEvent(new Event('input',{bubbles:true}));sel.dispatchEvent(new Event('change',{bubbles:true}))});
    d.addEventListener('click',function(e){if(!w.contains(e.target))close()});
    var lab=w.closest('label');if(lab)lab.addEventListener('click',function(e){if(w.contains(e.target))return;e.preventDefault();e.stopPropagation();b.click()});
    paint();
  }
  function scan(){[].forEach.call(d.querySelectorAll('#personas select'),enhance)}
  var pe=$('personas');if(pe){scan();new MutationObserver(scan).observe(pe,{childList:true})}
})();
