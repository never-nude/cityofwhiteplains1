/* City of White Plains — EN/ES language toggle
   - Chrome translated via [data-i18n] / [data-i18n-ph] / [data-i18n-al] keys (all pages)
   - Full page bodies (flagged data-translate-body: home + Pay & Apply) translated via a
     curated phrase dictionary — real civic Spanish, not machine translation.
   - Choice persists in-session via sessionStorage (no localStorage). No dependencies. */
(function () {
  "use strict";
  window.WP = window.WP || {};
  var LANG_KEY = "wp-lang";

  /* ---- Chrome strings (keyed) ---- */
  var ATTR = {
    "skip": ["Skip to main content", "Saltar al contenido principal"],
    "govstrip": ["An official website of the <strong>City of White Plains, New York</strong>",
                 "Un sitio web oficial de la <strong>Ciudad de White Plains, Nueva York</strong>"],
    "tagline": ["Westchester County · Incorporated 1916", "Condado de Westchester · Constituida en 1916"],
    "searchph": ["Search permits, taxes, services…", "Buscar permisos, impuestos, servicios…"],
    "searcharia": ["Search the city website", "Buscar en el sitio web de la ciudad"],
    "searchbtn": ["Search", "Buscar"],
    "nav.residents": ["Residents", "Residentes"],
    "nav.pay": ["Pay & Apply", "Pagar y Solicitar"],
    "nav.rec": ["Recreation", "Recreación"],
    "nav.depts": ["Departments", "Departamentos"],
    "nav.news": ["News", "Noticias"],
    "nav.gov": ["Government", "Gobierno"],
    "nav.contact": ["Contact", "Contacto"],
    "home": ["Home", "Inicio"],
    "search": ["Search", "Buscar"],
    "minutes": ["Meeting Minutes", "Actas de la Reunión"],
    "search.kick": ["Find a service", "Encuentre un servicio"],
    "search.title": ["Search the City website", "Busque en el sitio web de la Ciudad"],
    "search.sub": ["Search across services, departments, meetings, and news. Resident tasks appear first.",
                   "Busque en servicios, departamentos, reuniones y noticias. Las gestiones para residentes aparecen primero."],
    "search.help": ["Popular searches: property taxes, parking ticket, building permit, pool hours, council minutes.",
                    "Búsquedas populares: impuesto predial, multa de estacionamiento, permiso de construcción, horario de piscinas, actas del concejo."],
    "menu": ["Menu", "Menú"],
    "closemenu": ["Close menu", "Cerrar menú"],
    "bottom.home": ["Home", "Inicio"],
    "bottom.pay": ["Pay", "Pagar"],
    "bottom.rec": ["Pools", "Piscinas"],
    "bottom.report": ["Report", "Reportar"],
    "bottom.search": ["Search", "Buscar"],
    "foot.hours": ["Office hours: Monday–Friday, 9 a.m.–5 p.m.", "Horario de oficina: lunes a viernes, 9 a. m.–5 p. m."],
    "foot.paytaxes": ["Pay Taxes", "Pagar Impuestos"],
    "foot.permits": ["Permits", "Permisos"],
    "foot.report": ["Report an Issue", "Reportar un Problema"],
    "foot.council": ["Common Council", "Concejo Municipal"],
    "foot.meetings": ["Meetings", "Reuniones"],
    "foot.budget": ["Budget", "Presupuesto"],
    "foot.code": ["Municipal Code", "Código Municipal"],
    "foot.connect": ["Connect", "Conectar"],
    "foot.contact": ["Contact Us", "Contáctenos"],
    "foot.newsletter": ["Newsletter", "Boletín"],
    "foot.sitemap": ["Site Map", "Mapa del Sitio"],
    "foot.accessibility": ["Accessibility", "Accesibilidad"],
    "foot.copyright": ["© 2026 City of White Plains, New York. All rights reserved.",
                       "© 2026 Ciudad de White Plains, Nueva York. Todos los derechos reservados."],
    "foot.concept": ["Redesign concept — not an official city website.",
                     "Concepto de rediseño — no es un sitio web oficial de la ciudad."],
    "alerts.subscribe": ["Subscribe to alerts", "Suscribirse a las alertas"]
  };

  /* ---- Dynamic strings used from JS (search badges, results page) ---- */
  var DYN = {
    "Task": "Tarea", "Service": "Servicio", "Info": "Información",
    "Department": "Departamento", "Page": "Página", "News": "Noticias",
    "Search results for": "Resultados de búsqueda para",
    "Browse popular services": "Explorar servicios populares",
    "result": "resultado", "results": "resultados",
    "No results found. Try a simpler word like “tax,” “permit,” or “pool.”":
      "No se encontraron resultados. Pruebe una palabra más simple como «impuesto», «permiso» o «piscina».",
    "Updated": "Actualizado", "Dismiss this alert": "Descartar esta alerta",
    "No active alerts right now.": "No hay alertas activas en este momento.",
    "Notice": "Aviso", "Warning": "Advertencia", "Emergency": "Emergencia"
  };

  /* ---- Body phrases (home + Pay & Apply), keyed by exact English text ---- */
  var PHRASE_ES = {
    // Home — hero
    "Birthplace of the State of New York": "Cuna del Estado de Nueva York",
    "The business of White Plains, made easy.": "Los trámites de White Plains, más fáciles.",
    "Westchester's county seat — services, meetings, and records, all in plain reach.":
      "Sede del condado de Westchester: servicios, reuniones y registros, todo a su alcance.",
    // Home — tasks
    "What can we help you with?": "¿En qué podemos ayudarle?",
    "All services →": "Todos los servicios →",
    "Pay Taxes & Bills": "Pagar Impuestos y Facturas",
    "Property tax, water, parking tickets": "Impuesto predial, agua, multas de estacionamiento",
    "Permits & Licenses": "Permisos y Licencias",
    "Building, business, and parking": "Construcción, negocios y estacionamiento",
    "Trash & Recycling": "Basura y Reciclaje",
    "Collection schedules and rules": "Horarios y reglas de recolección",
    "Recreation & Parks": "Recreación y Parques",
    "Pools, programs, registration": "Piscinas, programas, inscripción",
    "Meetings & Agendas": "Reuniones y Agendas",
    "Council, planning, and zoning": "Concejo, planificación y zonificación",
    "Parking & Transit": "Estacionamiento y Transporte",
    "Garages, permits, Bee-Line": "Garajes, permisos, Bee-Line",
    "Report a Problem": "Reportar un Problema",
    "Potholes, streetlights, and more": "Baches, alumbrado público y más",
    "Records & Forms": "Registros y Formularios",
    "FOIL requests and certificates": "Solicitudes FOIL y certificados",
    // Home — alert
    "Notice": "Aviso",
    "Soccer Fest street closures downtown": "Cierres de calles en el centro por el Soccer Fest",
    "this weekend. Free resident parking and watch parties June 14, 27 & July 11.":
      "este fin de semana. Estacionamiento gratuito para residentes y fiestas de transmisión el 14 y 27 de junio y el 11 de julio.",
    "Details →": "Detalles →",
    // Home — news
    "City News": "Noticias de la Ciudad",
    "View all announcements →": "Ver todos los anuncios →",
    "Community": "Comunidad",
    "Recreation": "Recreación",
    "Employment": "Empleo",
    "June 13, 2026": "13 de junio de 2026",
    "June 9, 2026": "9 de junio de 2026",
    "June 2, 2026": "2 de junio de 2026",
    "Downtown Soccer Fest returns for a three-week run": "El Soccer Fest del centro regresa por tres semanas",
    "Watch international matchups on the big screen in the heart of downtown.":
      "Vea partidos internacionales en pantalla gigante en el corazón del centro.",
    "Gardella and Kittrell pools open for the summer": "Las piscinas Gardella y Kittrell abren para el verano",
    "Kittrell features zero-depth entry and lap lanes. Registration is open.":
      "Kittrell cuenta con entrada de profundidad cero y carriles para nadar. La inscripción está abierta.",
    "Hiring summer camp counselors and lifeguards": "Contratando consejeros de campamento y salvavidas para el verano",
    "The City is staffing up for the 2026 season. Apply online today.":
      "La Ciudad está contratando personal para la temporada 2026. Solicite en línea hoy.",
    // Home — departments
    "Departments": "Departamentos",
    "Full directory →": "Directorio completo →",
    "Mayor & Common Council": "Alcalde y Concejo Municipal",
    "Governance and legislation": "Gobierno y legislación",
    "Public Safety": "Seguridad Pública",
    "Police and Fire": "Policía y Bomberos",
    "Programs and facilities": "Programas e instalaciones",
    "Building Department": "Departamento de Construcción",
    "Permits and inspections": "Permisos e inspecciones",
    "Finance": "Finanzas",
    "Taxes and assessment": "Impuestos y avalúo",
    "Planning": "Planificación",
    "Zoning and development": "Zonificación y desarrollo",
    "City Court": "Corte Municipal",
    "Filings and appearances": "Presentaciones y comparecencias",
    "Public Library": "Biblioteca Pública",
    "Hours and catalog": "Horarios y catálogo",
    "Public Works": "Obras Públicas",
    "Streets and sanitation": "Calles y saneamiento",
    // Home — history
    "Why we say \"Birthplace of New York\"": "Por qué decimos «Cuna de Nueva York»",
    "The State of New York was born here.": "El Estado de Nueva York nació aquí.",
    "On July 9, 1776, the New York Provincial Congress met at the original County Court House in White Plains, adopted the Declaration of Independence, and declared New York an independent state. Two days later, the Declaration was read publicly here for the first time in New York. We've been governing ourselves ever since.":
      "El 9 de julio de 1776, el Congreso Provincial de Nueva York se reunió en el antiguo Palacio de Justicia del Condado en White Plains, adoptó la Declaración de Independencia y declaró a Nueva York como estado independiente. Dos días después, la Declaración se leyó públicamente aquí por primera vez en Nueva York. Desde entonces nos gobernamos a nosotros mismos.",
    "July 9 · A capital is declared": "9 de julio · Se declara una capital",

    // Pay & Apply — header
    "Online Services": "Servicios en Línea",
    "Pay a bill or apply for a permit": "Pague una factura o solicite un permiso",
    "Pay property taxes, water and sewer charges, and parking tickets, or apply for the permits and licenses the City issues — all online, around the clock.":
      "Pague el impuesto predial, los cargos de agua y alcantarillado y las multas de estacionamiento, o solicite los permisos y licencias que emite la Ciudad, todo en línea, las 24 horas.",
    // Pay — make a payment
    "Make a payment": "Hacer un pago",
    "Property Taxes": "Impuesto Predial",
    "Pay by parcel number or by your tax bill ID": "Pague por número de parcela o por su número de factura de impuestos",
    "Water & Sewer": "Agua y Alcantarillado",
    "Pay your quarterly utility statement": "Pague su factura trimestral de servicios",
    "Parking Tickets": "Multas de Estacionamiento",
    "Pay or contest a citation by ticket number": "Pague o impugne una multa por número de boleto",
    "Permit Fees": "Cargos de Permisos",
    "Settle outstanding building or business fees": "Pague cargos pendientes de construcción o de negocios",
    // Pay — apply
    "Apply for a permit or license": "Solicitar un permiso o licencia",
    "Building Permit": "Permiso de Construcción",
    "Renovations, additions, and new construction": "Renovaciones, ampliaciones y construcción nueva",
    "Business License": "Licencia Comercial",
    "Open or renew a business in the City": "Abra o renueve un negocio en la Ciudad",
    "Parking Permit": "Permiso de Estacionamiento",
    "Residential and overnight permits": "Permisos residenciales y nocturnos",
    "Special Event": "Evento Especial",
    "Block parties, festivals, and park use": "Fiestas de barrio, festivales y uso de parques",
    "Dog License": "Licencia de Perro",
    "Required annually for all dogs in the City": "Obligatoria cada año para todos los perros de la Ciudad",
    "Bulk Pickup": "Recolección de Objetos Grandes",
    "Schedule large-item or yard waste removal": "Programe el retiro de objetos grandes o desechos de jardín",
    // Pay — how it works
    "How online payment works": "Cómo funciona el pago en línea",
    "Find your account": "Encuentre su cuenta",
    "Search by parcel number, account ID, or ticket number. You'll see the balance and due date before you pay anything.":
      "Busque por número de parcela, número de cuenta o número de boleto. Verá el saldo y la fecha de vencimiento antes de pagar.",
    "Review the charges": "Revise los cargos",
    "Confirm the amount and read any notes from the department. Partial payments are accepted on most accounts.":
      "Confirme el monto y lea las notas del departamento. Se aceptan pagos parciales en la mayoría de las cuentas.",
    "Pay securely": "Pague de forma segura",
    "Pay by bank transfer (no fee) or by card (small processing fee applies). You'll get a confirmation number immediately.":
      "Pague por transferencia bancaria (sin cargo) o con tarjeta (se aplica un pequeño cargo de procesamiento). Recibirá un número de confirmación de inmediato.",
    "Keep your receipt": "Guarde su recibo",
    "A receipt is emailed to you and saved to your account. Payments post to City records within one business day.":
      "Se le envía un recibo por correo electrónico y se guarda en su cuenta. Los pagos se registran en los archivos de la Ciudad en un día hábil.",
    // Pay — report
    "Report a problem instead": "¿Prefiere reportar un problema?",
    "Need to flag a pothole, a broken streetlight, or a missed collection? You don't need an account — just tell us where and what, and the request routes to the right department.":
      "¿Necesita reportar un bache, un poste de luz dañado o una recolección omitida? No necesita una cuenta: solo díganos dónde y qué, y la solicitud se enviará al departamento correspondiente.",
    "Report a problem →": "Reportar un problema →",
    // Pay — sidebar
    "Need help paying?": "¿Necesita ayuda para pagar?",
    "Property tax exemptions": "Exenciones del impuesto predial",
    "Senior & veteran relief": "Alivio para adultos mayores y veteranos",
    "Payment plan options": "Opciones de plan de pago",
    "Dispute a charge": "Impugnar un cargo",
    "Finance Department": "Departamento de Finanzas",
    "Tax & Assessment Office": "Oficina de Impuestos y Avalúo",
    "City Hall, 1st Floor": "Ayuntamiento, 1.er piso",
    "Phone:": "Teléfono:",
    "Hours:": "Horario:",
    "Mon–Fri, 9 a.m.–5 p.m.": "lun.–vie., 9 a. m.–5 p. m.",
    "Accepted payment": "Pagos aceptados",
    "Bank transfer (ACH) — free": "Transferencia bancaria (ACH): gratis",
    "In person at City Hall": "En persona en el Ayuntamiento",
    "By mail (check or money order)": "Por correo (cheque o giro postal)",
    // breadcrumb leaf
    "Pay & Apply": "Pagar y Solicitar"
  };
  var PHRASE_EN = {};
  Object.keys(PHRASE_ES).forEach(function (k) { PHRASE_EN[PHRASE_ES[k]] = k; });

  function getLang() { try { return sessionStorage.getItem(LANG_KEY) || "en"; } catch (e) { return "en"; } }
  function store(l) { try { sessionStorage.setItem(LANG_KEY, l); } catch (e) {} }

  WP.lang = getLang();
  WP.t = function (s) { var l = getLang(); return (l === "es" && DYN[s]) ? DYN[s] : s; };

  function attrVal(key, l) {
    var pair = ATTR[key]; if (!pair) return null;
    return l === "es" ? pair[1] : pair[0];
  }

  function applyAttr(root, l) {
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = attrVal(el.getAttribute("data-i18n"), l); if (v == null) return;
      if (v.indexOf("<") !== -1) el.innerHTML = v; else el.textContent = v;
    });
    root.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = attrVal(el.getAttribute("data-i18n-ph"), l); if (v != null) el.setAttribute("placeholder", v);
    });
    root.querySelectorAll("[data-i18n-al]").forEach(function (el) {
      var v = attrVal(el.getAttribute("data-i18n-al"), l); if (v != null) el.setAttribute("aria-label", v);
    });
  }
  WP.applyLang = function (node) { applyAttr(node || document, getLang()); };

  function inChrome(node) {
    var p = node.parentNode;
    while (p && p !== document.body) {
      var tag = p.nodeName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "HEADER" || tag === "FOOTER" || tag === "NAV") return true;
      if (p.hasAttribute && (p.hasAttribute("data-i18n") || p.hasAttribute("data-i18n-html"))) return true;
      if (p.classList && (p.classList.contains("gov-strip") || p.classList.contains("masthead") ||
        p.classList.contains("tabbar") || p.classList.contains("nav-drawer"))) return true;
      p = p.parentNode;
    }
    return false;
  }

  function translateBody(l) {
    if (!document.body.hasAttribute("data-translate-body")) return;
    var map = (l === "es") ? PHRASE_ES : PHRASE_EN;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return inChrome(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var raw = node.nodeValue, key = raw.trim(), rep = map[key];
      if (rep != null) node.nodeValue = raw.replace(key, rep);
    });
  }

  function updateToggle(l) {
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      if (l === "en") { b.textContent = "Español"; b.setAttribute("aria-label", "Cambiar el sitio al español"); b.lang = "es"; }
      else { b.textContent = "English"; b.setAttribute("aria-label", "Switch site to English"); b.lang = "en"; }
    });
  }

  function apply(l) {
    document.documentElement.lang = l;
    applyAttr(document, l);
    translateBody(l);
    updateToggle(l);
    WP.lang = l;
    document.dispatchEvent(new CustomEvent("wp:languagechange", { detail: { lang: l } }));
  }

  WP.setLang = function (l) { store(l); apply(l); };

  function init() {
    document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
      b.addEventListener("click", function () { WP.setLang(getLang() === "en" ? "es" : "en"); });
    });
    apply(getLang());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
