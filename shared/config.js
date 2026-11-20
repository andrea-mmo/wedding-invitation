// Todo lo que se puede cambiar sin tocar el resto del código.
window.BODA = {
  novios: "Clara & Mateo",
  fechaTexto: "12 de junio de 2027",
  fechaBoda: "2027-06-12T18:00:00+02:00",
  fechaLimite: "2027-05-01T23:59:59+02:00",
  fechaLimiteTexto: "1 de mayo de 2027",
  bienvenida: "Nuestra historia, vuestro lugar en ella",
  ceremonia: {
    hora: "18:00 h",
    lugar: "Ermita de la Vega",
    direccion: "Calle Ejemplo, 1 · Valencia",
    mapa: "https://www.google.com/maps"
  },
  celebracion: {
    hora: "20:00 h",
    lugar: "Jardín del Olivar",
    direccion: "Camino de Muestra, 2 · Valencia",
    mapa: "https://www.google.com/maps"
  },
  bus: {
    recogida: "Plaza del Ayuntamiento",
    nota: "Los horarios definitivos y la organización del servicio se concretarán más adelante."
  },
  dressCode: {
    texto: "Un día tan especial merece una ocasión para vestirse de fiesta. Nos encantará veros guapos, elegantes y disfrutando de cada momento.",
    evitar: "Para mantener la armonía de nuestra celebración, os pedimos evitar los tonos verdes, beige y blanco, que hemos reservado para nuestro cortejo nupcial.",
    evitarResaltar: "os pedimos evitar los tonos verdes, beige y blanco",   // esta parte sale en negrita
    gracias: "¡Gracias por formar parte de nuestra historia!",
    coloresEvitar: ["#8EA17A", "#DFDEC1", "#0E8385", "#91AEA5", "#419085", "#F7F5EE"]
  },
  // Fotos de los novios (ponlas en shared/img/ y escribe aquí el nombre del archivo).
  fotos: {
    portada: "",   // ej. "portada.jpg"  (vacío = ilustración de la iglesia, provisional)
    galeria: ["fotos/foto3.jpg", "fotos/foto2.jpg", "fotos/foto6.jpg", "fotos/foto4.jpg", "fotos/foto5.jpg", "fotos/foto1.jpg"],
    estilo: "marcos", // "carrusel" | "mosaico" | "polaroid" | "arcos" | "marcos" | "parallax" | "pelicula" | "destacada"
    // punto de encuadre cuando una foto se recorta (x% y%). Por defecto, el centro.
    enfoque: {}
  },
  alojamiento: [], // opcional: [{ nombre: "Hotel", detalle: "Descripción", enlace: "https://..." }]
  timeline: [
    ["18:00 h", "Ceremonia"], ["20:00 h", "Cóctel"], ["21:00 h", "Banquete"], ["00:00 h", "Fiesta"], ["04:00 h", "Fin"]
  ],
  // Teléfono de contacto: se muestra bajo el formulario con un enlace a WhatsApp. Vacío = no se muestra.
  contacto: { nombre: "Clara", telefono: "+34 600 000 000" },   // ej. telefono: "+34 600 123 456"
  regalos: {
    texto: "Vuestra presencia es el mejor regalo. Si queréis tener un detalle, os dejamos nuestro número de cuenta para ayudarnos a empezar esta nueva etapa:",
    iban: "ES00 0000 0000 0000 0000 0000" // si está vacío se muestra «Próximamente»
  },
  // Música: segundo de la canción en el que empieza a sonar (0 = desde el principio). Sirve para saltar la intro.
  musica: { inicio: 0 },
  // Pie de página: frase de la franja verde, justo debajo de la iglesia. "" = no se muestra.
  creditos: "Diseño y desarrollo web\nAndrea Martinez Moreno",
  // SOLO PARA MUESTRA EN LOCAL: ilustraciones de otra boda en web/local-demo/. "preparar-publicacion.py" lo desactiva y las excluye.
  demo: { ilustraciones: false },
  // URL de la aplicación web de Google Apps Script (ver README.md). Vacío = modo prueba.
  endpoint: ""
};
