// Idiomas: ES (por defecto), CA y EN.
// El texto original está en español (HTML, config.js y JS). Este diccionario traduce cada frase tal cual está escrita en español.
// Formato:  "Texto en español": ["Català", "English"]
// Las frases con variables llevan {0}, {1}… (ver tr()).
(function () {
  var D = {
    // ---------- Título y portada ----------
    "Clara & Mateo · 12 de junio de 2027": ["Clara & Mateo · 12 de juny de 2027", "Clara & Mateo · 12 June 2027"],
    "Toda la información de nuestra boda y confirmación de asistencia.": ["Tota la informació del nostre casament i la confirmació d'assistència.", "All the details of our wedding and how to RSVP."],
    "12 de junio de 2027": ["12 de juny de 2027", "12 June 2027"],
    "1 de mayo de 2027": ["1 de maig de 2027", "1 May 2027"],
    "12 · junio · 2027": ["12 · juny · 2027", "12 · June · 2027"],
    "Abrir invitación": ["Obrir la invitació", "Open the invitation"],
    "Desliza para abrir": ["Llisca per obrir", "Swipe to open"],
    "Música": ["Música", "Music"],
    "Confirmar asistencia": ["Confirmar assistència", "RSVP"],
    "Modificar mi respuesta": ["Modificar la meva resposta", "Change my reply"],
    "Seguir bajando": ["Continuar baixant", "Keep scrolling"],
    "Bienvenida": ["Benvinguda", "Welcome"],
    "Nuestra historia, vuestro lugar en ella": ["La nostra història, el vostre lloc en ella", "Our story, with a place in it for you"],
    // ---------- Cuenta atrás ----------
    "Faltan": ["Falten", "Only"],
    "días": ["dies", "days"], "horas": ["hores", "hours"], "minutos": ["minuts", "minutes"], "segundos": ["segons", "seconds"],
    "para el día más especial": ["per al dia més especial", "until our special day"],
    // ---------- Dónde y cuándo ----------
    "Dónde y cuándo": ["On i quan", "Where and when"],
    "Ceremonia y celebración": ["Cerimònia i celebració", "Ceremony and celebration"],
    "Ceremonia": ["Cerimònia", "Ceremony"],
    "Celebración": ["Celebració", "Celebration"],
    "Cómo llegar": ["Com arribar-hi", "Get directions"],
    "Añadir al calendario": ["Afegir al calendari", "Add to calendar"],
    "18:00 h": ["18:00 h", "6:00 pm"], "20:00 h": ["20:00 h", "8:00 pm"],
    "Ermita de la Vega": ["Ermita de la Vega", "Ermita de la Vega"],
    "Calle Ejemplo, 1 · Valencia": ["Carrer d'Exemple, 1 · València", "1 Example Street · Valencia"],
    "Jardín del Olivar": ["Jardí de l'Olivar", "Olive Grove Garden"],
    "Camino de Muestra, 2 · Valencia": ["Camí de Mostra, 2 · València", "2 Sample Road · Valencia"],
    "Plaza del Ayuntamiento": ["Plaça de l'Ajuntament", "Town Hall Square"],
    // ---------- Vestimenta ----------
    "Código de vestimenta": ["Codi de vestimenta", "Dress code"],
    "Invitados bailando, vestidos de gala": ["Convidats ballant, vestits de gala", "Guests dancing in formal wear"],
    "Etiqueta": ["Etiqueta", "Formal attire"],
    "Un día tan especial merece una ocasión para vestirse de fiesta. Nos encantará veros guapos, elegantes y disfrutando de cada momento.": ["Un dia tan especial mereix una ocasió per vestir-se de festa. Ens encantarà veure-us guapos, elegants i gaudint de cada moment.", "A day this special deserves dressing up. We'll love to see you looking elegant and enjoying every moment."],
    "os pedimos evitar los tonos verdes, beige y blanco": ["us demanem evitar els tons verds, beix i blanc", "please avoid green, beige and white"],
    "Para mantener la armonía de nuestra celebración, os pedimos evitar los tonos verdes, beige y blanco, que hemos reservado para nuestro cortejo nupcial.": ["Per mantenir l'harmonia de la nostra celebració, us demanem evitar els tons verds, beix i blanc, que hem reservat per al nostre seguici nupcial.", "To keep our celebration harmonious, please avoid green, beige and white, which we have reserved for our wedding party."],
    "¡Gracias por formar parte de nuestra historia!": ["Gràcies per formar part de la nostra història!", "Thank you for being part of our story!"],
    // ---------- Regalos ----------
    "Regalos": ["Regals", "Gifts"],
    "Un detalle con cariño": ["Un detall amb carinyo", "A thoughtful gesture"],
    "Vuestra presencia es el mejor regalo. Si queréis tener un detalle, os dejamos nuestro número de cuenta para ayudarnos a empezar esta nueva etapa:": ["La vostra presència és el millor regal. Si voleu tenir un detall, us deixem el nostre número de compte per ajudar-nos a començar aquesta nova etapa:", "Your presence is the best gift. If you'd like to give something, here is our account number to help us start this new chapter:"],
    "Próximamente": ["Pròximament", "Coming soon"],
    "Número de cuenta": ["Número de compte", "Account number"],
    "Ver número de cuenta": ["Veure el número de compte", "Show account number"],
    "Ocultar número de cuenta": ["Amagar el número de compte", "Hide account number"],
    "Copiar número de cuenta": ["Copiar el número de compte", "Copy account number"],
    "¡Copiado!": ["Copiat!", "Copied!"],
    // ---------- Galería y contacto ----------
    "Nuestros momentos": ["Els nostres moments", "Our moments"],
    "Cerrar": ["Tancar", "Close"],
    "¿Alguna duda?": ["Algun dubte?", "Any questions?"],
    "Escribir a {0}": ["Escriure a {0}", "Message {0}"],
    "Escribir a {0} por WhatsApp": ["Escriure a {0} per WhatsApp", "Message {0} on WhatsApp"],
    "los novios": ["els nuvis", "the couple"],
    "Hola {0}, tengo una duda sobre la boda.": ["Hola {0}, tinc un dubte sobre el casament.", "Hi {0}, I have a question about the wedding."],
    // ---------- Formulario ----------
    "Confirma tu asistencia": ["Confirma la teva assistència", "Please RSVP"],
    "Esperamos que podáis venir": ["Esperem que pugueu venir", "We hope you can join us"],
    "Tienes hasta el {0} para confirmar; puedes hacerlo ahora o volver más tarde. Después de esa fecha no se podrán modificar las respuestas.": ["Tens fins al {0} per confirmar; pots fer-ho ara o tornar més tard. Després d'aquesta data no es podran modificar les respostes.", "You have until {0} to reply; you can do it now or come back later. After that date, replies can no longer be changed."],
    "El plazo de confirmación terminó el {0}. Si necesitas hacer algún cambio, contacta con nosotros.": ["El termini de confirmació va acabar el {0}. Si necessites fer algun canvi, contacta amb nosaltres.", "The reply deadline ended on {0}. If you need to make a change, please contact us."],
    "El plazo de confirmación ha terminado.": ["El termini de confirmació ha acabat.", "The reply deadline has passed."],
    "Tus datos": ["Les teves dades", "Your details"],
    "Nombre y apellidos": ["Nom i cognoms", "Full name"],
    "Asistencia": ["Assistència", "Attendance"],
    "¿Nos acompañarás?": ["Ens acompanyaràs?", "Will you join us?"],
    "¿Asistirás a nuestra boda?": ["Assistiràs al nostre casament?", "Will you attend our wedding?"],
    "Sí, allí estaré": ["Sí, hi seré", "Yes, I'll be there"],
    "No, lo siento": ["No, ho sento", "No, I'm sorry"],
    "Sí": ["Sí", "Yes"], "No": ["No", "No"],
    "Acompañantes": ["Acompanyants", "Companions"],
    "¿Vendrás acompañado/a?": ["Vindràs acompanyat/ada?", "Will you bring a companion?"],
    "Nombre y apellidos del acompañante": ["Nom i cognoms de l'acompanyant", "Your companion's full name"],
    "¿Vendrán niños pequeños contigo?": ["Vindran nens petits amb tu?", "Will young children come with you?"],
    "¿Cuántos?": ["Quants?", "How many?"],
    "¿Necesitan menú infantil?": ["Necessiten menú infantil?", "Do they need a children's menu?"],
    "Alergias y menús": ["Al·lèrgies i menús", "Allergies and menus"],
    "Indica a quién corresponde cada alergia o necesidad.": ["Indica a qui correspon cada al·lèrgia o necessitat.", "Tell us who each allergy or dietary need is for."],
    "Autobús": ["Autobús", "Bus"],
    "Habrá servicio de autobús": ["Hi haurà servei d'autobús", "There will be a bus service"],
    "para trasladar a los invitados hasta el lugar de la celebración.": ["per portar els convidats fins al lloc de la celebració.", "to take guests to the celebration venue."],
    "Punto de recogida:": ["Punt de recollida:", "Pick-up point:"],
    "Regreso a las": ["Tornada a les", "Return at"],
    "o a las": ["o a les", "or at"],
    "24:00 h": ["24:00 h", "midnight"], "04:00 h": ["04:00 h", "4:00 am"],
    "Los horarios definitivos y la organización del servicio se concretarán más adelante.": ["Els horaris definitius i l'organització del servei es concretaran més endavant.", "Final times and how the service will work will be confirmed later."],
    "¿Necesitas plaza de autobús?": ["Necessites plaça d'autobús?", "Do you need a seat on the bus?"],
    "Sí, solo ida": ["Sí, només anada", "Yes, outbound only"],
    "Sí, solo vuelta": ["Sí, només tornada", "Yes, return only"],
    "Sí, ida y vuelta": ["Sí, anada i tornada", "Yes, round trip"],
    "Para el regreso, ¿en qué horario volverás?": ["Per a la tornada, a quina hora tornaràs?", "For the return, which time will you take?"],
    "¿Cuántas plazas necesitas?": ["Quantes places necessites?", "How many seats do you need?"],
    "(contando acompañante y niños)": ["(comptant acompanyant i nens)", "(including companion and children)"],
    "Ponle banda sonora": ["Posa-li banda sonora", "Add a soundtrack"],
    "¿Qué canción te haría salir a bailar?": ["Quina cançó et faria sortir a ballar?", "Which song would get you dancing?"],
    "(opcional)": ["(opcional)", "(optional)"],
    "Título y artista": ["Títol i artista", "Title and artist"],
    "Revisión": ["Revisió", "Review"],
    "Revisa tus respuestas": ["Revisa les teves respostes", "Check your answers"],
    "Comprueba que todo está bien antes de enviar.": ["Comprova que tot estigui bé abans d'enviar.", "Make sure everything looks right before sending."],
    "Atrás": ["Enrere", "Back"], "Siguiente": ["Següent", "Next"], "Confirmar y enviar": ["Confirmar i enviar", "Confirm and send"],
    "Puedes volver a enviar el formulario con el mismo nombre para modificar tu respuesta hasta la fecha límite.": ["Pots tornar a enviar el formulari amb el mateix nom per modificar la teva resposta fins a la data límit.", "You can send the form again with the same name to change your reply until the deadline."],
    // ---------- Personas (alergias y menús) ----------
    "Invitado/a": ["Convidat/ada", "Guest"],
    "Acompañante": ["Acompanyant", "Companion"],
    "Niño/a {0}": ["Nen/a {0}", "Child {0}"],
    "Nombre del niño/a {0}": ["Nom del nen/a {0}", "Name of child {0}"],
    "Edad": ["Edat", "Age"],
    "¿Alergia o intolerancia?": ["Al·lèrgia o intolerància?", "Allergy or intolerance?"],
    "¿Cuál?": ["Quina?", "Which one?"],
    "Menú": ["Menú", "Menu"],
    "Ninguno": ["Cap", "None"], "Vegetariano": ["Vegetarià", "Vegetarian"], "Vegano": ["Vegà", "Vegan"], "Otro": ["Un altre", "Other"],
    "Indica la necesidad alimentaria": ["Indica la necessitat alimentària", "Describe the dietary need"],
    // ---------- Avisos del formulario ----------
    "Revisa tu teléfono. Si no es de España, añade el prefijo de tu país.": ["Revisa el teu telèfon. Si no és d'Espanya, afegeix el prefix del teu país.", "Please check your phone number. If it isn't Spanish, add your country code."],
    "Escribe solo un número de teléfono.": ["Escriu només un número de telèfon.", "Please enter only a phone number."],
    "Escribe tu nombre y apellidos.": ["Escriu el teu nom i cognoms.", "Please enter your full name."],
    "Indícanos si asistirás.": ["Indica'ns si assistiràs.", "Please tell us whether you'll attend."],
    "Escribe el nombre y apellidos de tu acompañante.": ["Escriu el nom i cognoms del teu acompanyant.", "Please enter your companion's full name."],
    "Indica nombre y edad de cada niño/a.": ["Indica el nom i l'edat de cada nen/a.", "Please give each child's name and age."],
    "Indica la alergia de {0}.": ["Indica l'al·lèrgia de {0}.", "Please describe {0}'s allergy."],
    "Indica el menú especial de {0}.": ["Indica el menú especial de {0}.", "Please describe {0}'s special menu."],
    "Indica cuántas plazas de autobús necesitas.": ["Indica quantes places d'autobús necessites.", "Please say how many bus seats you need."],
    "Has pedido más plazas de autobús que personas en tu invitación.": ["Has demanat més places d'autobús que persones a la teva invitació.", "You asked for more bus seats than people on your invitation."],
    "Elige el horario de regreso.": ["Tria l'horari de tornada.", "Please choose the return time."],
    "Enviando…": ["Enviant…", "Sending…"],
    "No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.": ["No s'ha pogut enviar. Revisa la teva connexió i torna-ho a provar.", "Could not send. Check your connection and try again."],
    "¡Gracias, {0}!": ["Gràcies, {0}!", "Thank you, {0}!"],
    "Hemos recibido tu confirmación. ¡Nos hace muchísima ilusión que vengas!": ["Hem rebut la teva confirmació. Ens fa moltíssima il·lusió que vinguis!", "We've received your reply. We're so happy you're coming!"],
    "Sentimos que no puedas venir, gracias por avisarnos.": ["Sentim que no pugui venir, gràcies per avisar-nos.", "We're sorry you can't make it, thank you for letting us know."],
    // ---------- Pasos y resumen ----------
    "Paso {0} de {1} · {2}": ["Pas {0} de {1} · {2}", "Step {0} of {1} · {2}"],
    "Paso {0} · {1}": ["Pas {0} · {1}", "Step {0} · {1}"],
    "Editar": ["Editar", "Edit"],
    "Nombre": ["Nom", "Name"], "Teléfono": ["Telèfon", "Phone"],
    "No podré asistir": ["No podré assistir", "I won't be able to attend"],
    "Niños/as": ["Nens/es", "Children"], "Menú infantil": ["Menú infantil", "Children's menu"],
    "año": ["any", "year"], "años": ["anys", "years"],
    "Alergia: {0}": ["Al·lèrgia: {0}", "Allergy: {0}"], "Sin alergias": ["Sense al·lèrgies", "No allergies"],
    "{0} · Menú: {1}": ["{0} · Menú: {1}", "{0} · Menu: {1}"],
    "Plaza de autobús": ["Plaça d'autobús", "Bus seat"], "Regreso": ["Tornada", "Return"], "Plazas": ["Places", "Seats"],
    "Canción": ["Cançó", "Song"],
    // ---------- Calendario (.ics) ----------
    "Boda de Clara & Mateo": ["Casament de Clara & Mateo", "Wedding of Clara & Mateo"],
    "Falta una semana para la boda de Clara y Mateo": ["Falta una setmana per al casament de Clara i Mateo", "One week until Clara and Mateo's wedding"],
    "Mañana es la boda de Clara y Mateo": ["Demà és el casament de Clara i Mateo", "Clara and Mateo's wedding is tomorrow"],
    "La ceremonia es a las {0}": ["La cerimònia és a les {0}", "The ceremony is at {0}"],
    "Cambiar a modo noche": ["Canviar a mode nit", "Switch to dark mode"],
    "Cambiar a modo día": ["Canviar a mode dia", "Switch to light mode"],
    // ---------- Pie ----------
    "Diseño y desarrollo web": ["Disseny i desenvolupament web", "Web design and development"]
  };

  var LANGS = ["es", "ca", "en"];
  var norm = function (s) { return String(s).replace(/\s+/g, " ").trim(); };

  // idioma: ?lang=xx > guardado > idioma del navegador
  var lang = "es";
  try {
    var q = /[?&]lang=(es|ca|en)\b/.exec(location.search);
    var saved = localStorage.getItem("boda-lang");
    var nav = (navigator.language || "es").slice(0, 2).toLowerCase();
    lang = q ? q[1] : (LANGS.indexOf(saved) > -1 ? saved : (LANGS.indexOf(nav) > -1 ? nav : "es"));
    if (q) localStorage.setItem("boda-lang", lang);
  } catch (e) {}
  var idx = lang === "ca" ? 0 : 1;

  // tr("texto en español", v0, v1…) → texto en el idioma activo, con {0}, {1}… sustituidos
  function tr(s) {
    var vars = Array.prototype.slice.call(arguments, 1);
    s = String(s);
    var out = s;
    if (lang !== "es") {
      var parts = s.split("\n").map(function (line) { var e = D[norm(line)]; return e ? e[idx] : line; });
      out = parts.join("\n");
    }
    return out.replace(/\{(\d+)\}/g, function (m, i) { return vars[i] !== undefined ? vars[i] : m; });
  }
  window.LANG = lang;
  window.tr = tr;
  document.documentElement.lang = lang;

  // ---------- Traducir lo que ya está en el HTML ----------
  function walk(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) {
      var p = n.parentNode && n.parentNode.nodeName;
      if (p === "SCRIPT" || p === "STYLE") continue;
      list.push(n);
    }
    list.forEach(function (n) {
      var k = norm(n.nodeValue); if (!k) return;
      var e = D[k]; if (!e) return;
      n.nodeValue = n.nodeValue.replace(/\S[\s\S]*\S|\S/, e[idx]);
    });
    ["alt", "aria-label", "placeholder", "title", "data-t"].forEach(function (a) {
      [].forEach.call(root.querySelectorAll("[" + a + "]"), function (el) {
        var e = D[norm(el.getAttribute(a))]; if (e) el.setAttribute(a, e[idx]);
      });
    });
  }
  if (lang !== "es") {
    walk(document.body);
    document.title = tr(document.title);
    var md = document.querySelector('meta[name="description"]');
    if (md) md.content = tr(md.content);
    // banners con la fecha escrita (mes): uno por idioma
    [].forEach.call(document.querySelectorAll("img"), function (im) {
      var m = /(.*banner-(?:limpio|letras))(\.(?:png|jpg))$/.exec(im.getAttribute("src") || "");
      if (m) im.setAttribute("src", m[1] + "-" + lang + m[2]);
    });
  }

  // ---------- Selector de idioma ----------
  var bar = document.createElement("div");
  bar.className = "lang";
  bar.setAttribute("role", "group");
  bar.setAttribute("aria-label", "Idioma · Llengua · Language");
  [["es", "ES"], ["ca", "CA"], ["en", "EN"]].forEach(function (l) {
    var b = document.createElement("button");
    b.type = "button"; b.textContent = l[1]; b.dataset.l = l[0];
    b.setAttribute("aria-pressed", l[0] === lang ? "true" : "false");
    if (l[0] === lang) b.className = "on";
    bar.appendChild(b);
  });
  document.body.appendChild(bar);
  // mientras el sobre está cerrado el selector va bajo los nombres, para no tapar nada
  bar.addEventListener("click", function (e) {
    e.stopPropagation();
    var b = e.target.closest("button"); if (!b || b.dataset.l === lang) return;
    try {
      localStorage.setItem("boda-lang", b.dataset.l);
      sessionStorage.setItem("boda-cambio", JSON.stringify({ y: window.scrollY, abierto: document.body.classList.contains("locked") ? 0 : 1 }));
    } catch (er) {}
    var u = location.pathname + location.search.replace(/[?&]lang=(es|ca|en)/, "").replace(/^&/, "?") + location.hash;
    location.href = u;
  });
  // evita que tocar el selector abra el sobre
  bar.addEventListener("pointerdown", function (e) { e.stopPropagation(); }, true);

  // tras cambiar de idioma: se vuelve al mismo punto, sin repetir la animación del sobre
  window.addEventListener("load", function () {
    var st; try { st = JSON.parse(sessionStorage.getItem("boda-cambio") || "null"); sessionStorage.removeItem("boda-cambio"); } catch (e) {}
    if (!st || !st.abierto) return;
    var intro = document.getElementById("intro"), site = document.getElementById("site");
    if (intro) intro.remove();
    document.body.classList.remove("locked");
    if (site) site.hidden = false;
    window.dispatchEvent(new Event("resize"));
    [60, 500, 1400].forEach(function (t) { setTimeout(function () { window.scrollTo({ top: st.y, left: 0, behavior: "instant" }); }, t); });
  });
})();
