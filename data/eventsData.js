// src/data/eventsData.js

// Importar imágenes locales
import img1 from '../assets/images.jpeg';
import img2 from '../assets/images-2.jpeg';
import img3 from '../assets/images-3.jpeg';
import img4 from '../assets/images-4.jpeg';
import img5 from '../assets/images-5.jpeg';

// Lista de eventos destacados con fechas en dos formatos: YYYY-MM-DD y "DD de Mes, YYYY"
const featuredEvents = [
  // Universidad de Los Lagos
  { 
    id: 1, 
    title: "Festival de Primavera", 
    dateISO: "2024-09-23", 
    dateFormatted: "23 de Septiembre, 2024", 
    image: img1, 
    universidad: "Universidad de Los Lagos", 
    carrera: "Informática", 
    sede: "Campus Osorno" 
  },
  { 
    id: 2, 
    title: "Concierto de Verano", 
    dateISO: "2024-10-01", 
    dateFormatted: "1 de Octubre, 2024", 
    image: img4, 
    universidad: "Universidad de Los Lagos", 
    carrera: "Construcción", 
    sede: "Campus Puerto Montt" 
  },
  { 
    id: 3, 
    title: "Seminario de Ciberseguridad", 
    dateISO: "2024-10-10", 
    dateFormatted: "10 de Octubre, 2024", 
    image: img1, 
    universidad: "Universidad de Los Lagos", 
    carrera: "Informática", 
    sede: "Campus Chinquihue" 
  },
  
  // Instituto AIEP
  { 
    id: 4, 
    title: "Feria de Ciencias", 
    dateISO: "2024-10-15", 
    dateFormatted: "15 de Octubre, 2024", 
    image: img3, 
    universidad: "Instituto AIEP", 
    carrera: "Salud", 
    sede: "Sede Providencia" 
  },
  { 
    id: 5, 
    title: "Taller de Emergencias Médicas", 
    dateISO: "2024-10-25", 
    dateFormatted: "25 de Octubre, 2024", 
    image: img3, 
    universidad: "Instituto AIEP", 
    carrera: "Salud", 
    sede: "Sede Concepción" 
  },
  { 
    id: 6, 
    title: "Jornada de Actualización en Enfermería", 
    dateISO: "2024-11-05", 
    dateFormatted: "5 de Noviembre, 2024", 
    image: img4, 
    universidad: "Instituto AIEP", 
    carrera: "Salud", 
    sede: "Sede Bellavista" 
  },
  
  // Instituto Profesional Duoc UC
  { 
    id: 7, 
    title: "Fiesta de Bienvenida", 
    dateISO: "2024-11-12", 
    dateFormatted: "12 de Noviembre, 2024", 
    image: img1, 
    universidad: "Instituto Profesional Duoc UC", 
    carrera: "Construcción", 
    sede: "Sede San Joaquín" 
  },
  { 
    id: 8, 
    title: "Fiesta de Fin de Año", 
    dateISO: "2024-12-31", 
    dateFormatted: "31 de Diciembre, 2024", 
    image: img2, 
    universidad: "Instituto Profesional Duoc UC", 
    carrera: "Informática", 
    sede: "Sede Antonio Varas" 
  },
  { 
    id: 9, 
    title: "Torneo de Innovación y Tecnología", 
    dateISO: "2025-01-05", 
    dateFormatted: "5 de Enero, 2025", 
    image: img2, 
    universidad: "Instituto Profesional Duoc UC", 
    carrera: "Informática", 
    sede: "Sede Plaza Oeste" 
  },
  
  // Universidad de Chile
  { 
    id: 10, 
    title: "Congreso de Ciencias Políticas", 
    dateISO: "2025-01-20", 
    dateFormatted: "20 de Enero, 2025", 
    image: img5, 
    universidad: "Universidad de Chile", 
    carrera: "Ciencias Políticas", 
    sede: "Campus Juan Gómez Millas" 
  },
  { 
    id: 11, 
    title: "Feria del Libro Universitario", 
    dateISO: "2025-02-16", 
    dateFormatted: "16 de Febrero, 2025", 
    image: img1, 
    universidad: "Universidad de Chile", 
    carrera: "Literatura", 
    sede: "Campus Andrés Bello" 
  },
  { 
    id: 12, 
    title: "Hackathon de Inteligencia Artificial", 
    dateISO: "2025-03-12", 
    dateFormatted: "12 de Marzo, 2025", 
    image: img2, 
    universidad: "Universidad de Chile", 
    carrera: "Informática", 
    sede: "Facultad de Ciencias Físicas y Matemáticas" 
  },

  // Libre (Abiertos a todos)
  { 
    id: 19, 
    title: "Hackathon Universitario", 
    dateISO: "2024-09-05", 
    dateFormatted: "5 de Septiembre, 2024", 
    image: img2, 
    universidad: "libre", 
    carrera: "Informática" 
  },
  { 
    id: 20, 
    title: "Maratón Universitaria", 
    dateISO: "2024-09-30", 
    dateFormatted: "30 de Septiembre, 2024", 
    image: img5, 
    universidad: "libre", 
    carrera: "Salud" 
  },
  { 
    id: 21, 
    title: "Festival de Cortometrajes", 
    dateISO: "2024-10-28", 
    dateFormatted: "28 de Octubre, 2024", 
    image: img1, 
    universidad: "libre", 
    carrera: "Arte" 
  },
  { 
    id: 22, 
    title: "Competencia de Robótica", 
    dateISO: "2024-11-30", 
    dateFormatted: "30 de Noviembre, 2024", 
    image: img3, 
    universidad: "libre", 
    carrera: "Informática" 
  },
  { 
    id: 23, 
    title: "Torneo de Debate Interuniversitario", 
    dateISO: "2024-12-08", 
    dateFormatted: "8 de Diciembre, 2024", 
    image: img4, 
    universidad: "libre", 
    carrera: "Ciencias Políticas" 
  },
];

export default featuredEvents;