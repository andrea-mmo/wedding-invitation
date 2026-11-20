(function () {
  const C = window.BODA;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const set = (id, t) => { const e = $(id); if (e) e.textContent = tr(t); };

  // ---------- Textos desde config ----------
  set("introNames", C.novios); set("introDate", C.fechaTexto);
  set("heroDate", C.fechaTexto); set("welcome", C.bienvenida);
  set("cerHora", C.ceremonia.hora); set("cerLugar", C.ceremonia.lugar); set("cerDir", C.ceremonia.direccion); $("cerMapa").href = C.ceremonia.mapa;
  set("celHora", C.celebracion.hora); set("celLugar", C.celebracion.lugar); set("celDir", C.celebracion.direccion); $("celMapa").href = C.celebracion.mapa;
  set("busPunto", C.bus.recogida); set("busPunto2", C.bus.recogida); set("busNota", C.bus.nota);
  set("dressTxt", C.dressCode.texto); set("dressEvitar", C.dressCode.evitar);
  // la parte más importante del aviso de colores va en negrita (sin cambiar el tamaño del texto)
  (function () {
    const e = $("dressEvitar"), t = tr(C.dressCode.evitar || ""), r = tr(C.dressCode.evitarResaltar || ""), i = r ? t.indexOf(r) : -1;
    if (e && i >= 0) e.innerHTML = esc(t.slice(0, i)) + "<strong>" + esc(r) + "</strong>" + esc(t.slice(i + r.length));
  })();
  set("dressGracias", C.dressCode.gracias || "");
  // teléfono de contacto (con enlace a WhatsApp)
  (function () {
    const ct = C.contacto || {}, hc = $("helpContact");
    if (!hc || !ct.telefono) return;
    let d = String(ct.telefono).replace(/[\s.\-()]/g, "").replace(/^00/, "+");
    const wa = d.startsWith("+") ? d.slice(1) : (/^[6-9]\d{8}$/.test(d) ? "34" + d : d);
    const nombre = ct.nombre || tr("los novios");
    const msg = encodeURIComponent(tr("Hola {0}, tengo una duda sobre la boda.", nombre));
    const icono = '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3z"/></svg>';
    hc.innerHTML = '<p class="q">' + tr("¿Alguna duda?") + '</p><a href="https://wa.me/' + esc(wa) + "?text=" + msg + '" target="_blank" rel="noopener" aria-label="' + esc(tr("Escribir a {0} por WhatsApp", nombre)) + '">' + icono + " " + esc(tr("Escribir a {0}", nombre)) + "</a>";
    hc.hidden = false;
  })();
  set("regTxt", C.regalos.texto); set("regIban", C.regalos.iban || "Próximamente");
  set("foot", C.novios);
  if ($("credit")) { $("credit").textContent = tr(C.creditos || ""); $("credit").hidden = !C.creditos; }
  const F = C.fotos || {};
  if ($("heroImg") && F.portada) $("heroImg").src = "../shared/img/" + F.portada;
  if ($("footImg") && F.pie) $("footImg").src = "../shared/img/" + F.pie;
  if ($("galList")) {
    if (!(F.galeria || []).length) $("galeria").hidden = true;
    else { $("galeria").hidden = false; $("galList").innerHTML = F.galeria.map((f) => `<img src="../shared/img/${esc(f)}" alt="" loading="lazy">`).join(""); }
  }
  if ($("alojList")) {
    const aloj = C.alojamiento || [];
    if (!aloj.length) $("alojamiento").hidden = true;
    else $("alojList").innerHTML = aloj.map((h) => `<article class="card"><h3>${esc(h.nombre)}</h3><p>${esc(h.detalle || "")}</p>${h.enlace ? `<a class="link" href="${esc(h.enlace)}" target="_blank" rel="noopener">Ver alojamiento →</a>` : ""}</article>`).join("");
  }
  if ($("tl")) $("tl").innerHTML = C.timeline.map(([h, t]) => `<li><b>${h}</b><span>${t}</span></li>`).join("");
  if ($("swatches")) $("swatches").innerHTML = C.dressCode.coloresEvitar.map((c) => `<i style="background:${c}" title="${c}"></i>`).join("");

  // ---------- Sobre ----------
  if ($("openBtn")) {
    $("openBtn").addEventListener("click", () => {
      $("intro").classList.add("open");
      $("site").hidden = false;
      document.body.classList.remove("locked");
      window.scrollTo(0, 0);
    });
  }

  // ---------- Cuenta atrás ----------
  const target = new Date(C.fechaBoda).getTime();
  function tick() {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    $("cdD").textContent = Math.floor(s / 86400);
    $("cdH").textContent = Math.floor((s % 86400) / 3600);
    $("cdM").textContent = Math.floor((s % 3600) / 60);
    $("cdS").textContent = s % 60;
  }
  tick(); setInterval(tick, 1000);

  // ---------- Fecha límite ----------
  const closed = Date.now() > new Date(C.fechaLimite).getTime();
  const dl = $("deadlineMsg");
  if (closed) {
    dl.textContent = tr("El plazo de confirmación terminó el {0}. Si necesitas hacer algún cambio, contacta con nosotros.", tr(C.fechaLimiteTexto));
    dl.classList.add("closed");
    $("form").hidden = true;
  } else {
    dl.textContent = tr("Tienes hasta el {0} para confirmar; puedes hacerlo ahora o volver más tarde. Después de esa fecha no se podrán modificar las respuestas.", tr(C.fechaLimiteTexto));
  }

  // ---------- Formulario dinámico ----------
  const form = $("form");
  const radio = (name) => (form.querySelector(`input[name="${name}"]:checked`) || {}).value || "";
  const state = {}; // alergias/menús por persona: key -> {alergia, detalle, menu, otro}

  const trRol = (r) => { const m = /^Niño\/a (\d+)$/.exec(r); return m ? tr("Niño/a {0}", m[1]) : tr(r); };

  function people() {
    const list = [{ key: "g", rol: "Invitado/a", rolT: tr("Invitado/a"), src: "nombre" }];
    if (radio("acomp") === "Sí") list.push({ key: "a", rol: "Acompañante", rolT: tr("Acompañante"), src: "acompNombre" });
    if (radio("ninos") === "Sí") {
      const n = Math.min(6, Math.max(1, +$("ninosN").value || 1));
      for (let i = 0; i < n; i++) list.push({ key: "k" + i, rol: "Niño/a " + (i + 1), rolT: tr("Niño/a {0}", i + 1), src: "kidN" + i });
    }
    return list;
  }

  function renderKids() {
    const n = Math.min(6, Math.max(1, +$("ninosN").value || 1));
    const old = [...document.querySelectorAll("#ninosList input")].map((i) => i.value);
    $("ninosList").innerHTML = Array.from({ length: n }, (_, i) =>
      `<div class="kid"><input id="kidN${i}" placeholder="${esc(tr("Nombre del niño/a {0}", i + 1))}" value="${esc(old[i * 2] || "")}">` +
      `<input id="kidE${i}" type="number" min="0" max="17" placeholder="${esc(tr("Edad"))}" value="${esc(old[i * 2 + 1] || "")}"></div>`).join("");
  }

  function contactError(v) {
    // teléfono de cualquier país: solo números (con espacios, guiones o paréntesis) y un "+" o "00" inicial
    const MSG = tr("Revisa tu teléfono. Si no es de España, añade el prefijo de tu país.");
    v = v.trim();
    if (!v) return MSG;
    if (/[A-Za-z@]/.test(v)) return tr("Escribe solo un número de teléfono.");
    if (/[^\d\s.\-()+]/.test(v)) return MSG;
    const d = v.replace(/[\s.\-()]/g, "").replace(/^00/, "+");
    if (/\+/.test(d.slice(1))) return MSG;               // el "+" solo puede ir al principio
    const digitos = d.replace(/\D/g, "").length;
    return digitos >= 7 && digitos <= 15 ? "" : MSG;     // longitud posible de un teléfono (norma internacional)
  }
  window.contactError = contactError;

  function nameOf(p) { const el = $(p.src) || form.elements[p.src]; return (el && el.value.trim()) || ""; }

  function renderPeople() {
    $("personas").innerHTML = people().map((p) => {
      const s = (state[p.key] = state[p.key] || { alergia: "No", detalle: "", menu: "Ninguno", otro: "" });
      return `<div class="person" data-key="${p.key}">
        <h4>${esc(p.rolT)}<span data-title="${p.key}">${nameOf(p) ? " · " + esc(nameOf(p)) : ""}</span></h4>
        <label>${tr("¿Alergia o intolerancia?")}
          <select data-f="alergia"><option value="No"${s.alergia === "No" ? " selected" : ""}>${tr("No")}</option><option value="Sí"${s.alergia === "Sí" ? " selected" : ""}>${tr("Sí")}</option></select></label>
        <label ${s.alergia === "Sí" ? "" : "hidden"} data-show="detalle">${tr("¿Cuál?")}<input data-f="detalle" value="${esc(s.detalle)}"></label>
        <label>${tr("Menú")}
          <select data-f="menu">${["Ninguno", "Vegetariano", "Vegano", "Otro"].map((m) => `<option value="${m}"${s.menu === m ? " selected" : ""}>${tr(m)}</option>`).join("")}</select></label>
        <label ${s.menu === "Otro" ? "" : "hidden"} data-show="otro">${tr("Indica la necesidad alimentaria")}<input data-f="otro" value="${esc(s.otro)}"></label>
      </div>`;
    }).join("");
  }

  $("personas").addEventListener("input", (e) => {
    const f = e.target.dataset.f; if (!f) return;
    const card = e.target.closest(".person"); const s = state[card.dataset.key];
    s[f] = e.target.value;
    card.querySelector('[data-show="detalle"]').hidden = s.alergia !== "Sí";
    card.querySelector('[data-show="otro"]').hidden = s.menu !== "Otro";
  });

  function refreshTitles() {
    people().forEach((p) => { const t = document.querySelector(`[data-title="${p.key}"]`); if (t) t.textContent = nameOf(p) ? " · " + nameOf(p) : ""; });
  }

  function syncVisibility() {
    const yes = radio("asiste") === "Sí";
    $("yes").hidden = !yes;
    $("acompBox").hidden = radio("acomp") !== "Sí";
    $("ninosBox").hidden = radio("ninos") !== "Sí";
    const bus = radio("bus");
    $("busBox").hidden = bus === "No";
    $("retBox").hidden = !(bus === "Sí, solo vuelta" || bus === "Sí, ida y vuelta");
    renderPeople();
  }

  form.addEventListener("change", (e) => {
    if (e.target.name === "bus" || e.target.name === "asiste" || e.target.name === "acomp" || e.target.name === "ninos" || e.target.id === "ninosN") {
      if (e.target.id === "ninosN") renderKids();
      if (e.target.name === "ninos" && radio("ninos") === "Sí") renderKids();
      syncVisibility();
    }
  });
  form.addEventListener("input", (e) => { if (e.target.matches("#nombre,#acompNombre,#ninosList input")) refreshTitles(); });
  renderKids(); syncVisibility();

  // ---------- Envío ----------
  function fail(msg) { set("err", msg); }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); set("err", "");
    if (Date.now() > new Date(C.fechaLimite).getTime()) return fail(tr("El plazo de confirmación ha terminado."));
    const nombre = $("nombre").value.trim();
    if (nombre.split(/\s+/).length < 2) return fail(tr("Escribe tu nombre y apellidos."));
    const asiste = radio("asiste");
    if (!asiste) return fail(tr("Indícanos si asistirás."));
    const cEl = $("contacto");   // teléfono opcional: solo se guarda (y se revisa) si confirman que sí van
    const telefono = asiste === "Sí" && cEl ? cEl.value.trim() : "";
    const contactoMsg = telefono ? contactError(telefono) : "";
    if (contactoMsg) return fail(contactoMsg);

    const data = { nombre, contacto: telefono, asiste, mensaje: form.elements.mensaje ? form.elements.mensaje.value.trim() : "", cancion: form.elements.cancion ? form.elements.cancion.value.trim() : "" };
    if (asiste === "Sí") {
      data.acompanante = "";
      if (radio("acomp") === "Sí") {
        data.acompanante = $("acompNombre").value.trim();
        if (!data.acompanante) return fail(tr("Escribe el nombre y apellidos de tu acompañante."));
      }
      data.ninos = [];
      if (radio("ninos") === "Sí") {
        const n = Math.min(6, Math.max(1, +$("ninosN").value || 1));
        for (let i = 0; i < n; i++) {
          const nm = $("kidN" + i).value.trim(), ed = $("kidE" + i).value.trim();
          if (!nm || ed === "") return fail(tr("Indica nombre y edad de cada niño/a."));
          data.ninos.push({ nombre: nm, edad: ed });
        }
        data.menuInfantil = radio("menuInf");
      }
      data.personas = people().map((p) => {
        const s = state[p.key] || {};
        return { rol: p.rol, nombre: nameOf(p), alergia: s.alergia || "No", detalle: s.alergia === "Sí" ? s.detalle || "" : "", menu: s.menu || "Ninguno", otro: s.menu === "Otro" ? s.otro || "" : "" };
      });
      for (const p of data.personas) {
        if (p.alergia === "Sí" && !p.detalle.trim()) return fail(tr("Indica la alergia de {0}.", p.nombre || trRol(p.rol)));
        if (p.menu === "Otro" && !p.otro.trim()) return fail(tr("Indica el menú especial de {0}.", p.nombre || trRol(p.rol)));
      }
      data.bus = radio("bus");
      if (data.bus !== "No") {
        data.plazas = +$("plazas").value || 0;
        if (data.plazas < 1) return fail(tr("Indica cuántas plazas de autobús necesitas."));
        if (data.plazas > data.personas.length) return fail(tr("Has pedido más plazas de autobús que personas en tu invitación."));
        if (data.bus !== "Sí, solo ida") {
          data.vuelta = radio("vuelta");
          if (!data.vuelta) return fail(tr("Elige el horario de regreso."));
        }
      }
    }

    const btn = $("send"), btnTxt = btn.textContent; btn.disabled = true; btn.textContent = tr("Enviando…");
    try {
      let res = { ok: true };
      if (C.endpoint) {
        const r = await fetch(C.endpoint, { method: "POST", body: JSON.stringify(data) });
        res = await r.json();
      } else {
        const all = JSON.parse(localStorage.getItem("boda-pruebas") || "[]"); all.push(data);
        localStorage.setItem("boda-pruebas", JSON.stringify(all));
        console.info("Modo prueba (sin endpoint). Datos:", data);
      }
      if (!res.ok) throw new Error(res.error || "Error");
      form.hidden = true; dl.hidden = true;
      $("thanks").hidden = false;
      $("thanks").innerHTML = `<p class="script">${esc(tr("¡Gracias, {0}!", nombre.split(" ")[0]))}</p><p>${tr(asiste === "Sí" ? "Hemos recibido tu confirmación. ¡Nos hace muchísima ilusión que vengas!" : "Sentimos que no puedas venir, gracias por avisarnos.")}</p>`;
      const show = () => { const s = $("rsvp") || $("thanks"); window.scrollBy({ top: s.getBoundingClientRect().top, left: 0, behavior: "instant" }); };
      show(); setTimeout(show, 80); setTimeout(show, 500);
    } catch (err) {
      fail(err.message && err.message !== "Failed to fetch" ? err.message : tr("No se pudo enviar. Revisa tu conexión e inténtalo de nuevo."));
      btn.disabled = false; btn.textContent = btnTxt;
    }
  });
})();
