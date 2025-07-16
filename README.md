
# Resumen Integral del Proyecto: Metanoia.click

## 1. Visión General del Producto

Metanoia.click es una plataforma de software como servicio (SaaS) B2B, diseñada para la automatización y análisis empresarial mediante Inteligencia Artificial. El objetivo del producto es ofrecer a las PyMEs y medianas empresas una suite de herramientas modulares que abordan problemas de negocio específicos en áreas clave como finanzas, recursos humanos, gestión de clientes y operaciones. La plataforma se presenta como una solución premium, de vanguardia y centrada en la obtención de resultados medibles y ROI para sus clientes.

## 2. Arquitectura y Stack Tecnológico

La aplicación está construida sobre un stack moderno, serverless y enfocado en el ecosistema de JavaScript/TypeScript, aprovechando al máximo las capacidades de Firebase y Next.js.

- **Frontend Framework:** Next.js (con App Router). La estructura de enrutamiento está organizada por funcionalidad y distingue entre rutas de marketing (`(marketing)`) y de la aplicación principal (`(main)`).
- **Lenguaje:** TypeScript. Se utiliza de forma extensiva para garantizar la seguridad de tipos en todo el proyecto.
- **UI Components:** ShadCN UI. La interfaz se construye utilizando una colección de componentes reutilizables, personalizables y accesibles basados en Radix UI.
- **Styling:** Tailwind CSS. Se utiliza para el estilizado, con un enfoque en clases de utilidad y un sistema de theming basado en variables CSS (HSL) definidas en `src/app/globals.css` para los modos claro y oscuro.
- **Backend & Base de Datos:** Firebase. Se utiliza Firestore como base de datos NoSQL para almacenar los datos de la aplicación (clientes, empleados, etc.) y Firebase Storage para el almacenamiento de archivos (como PDFs adjuntos). La configuración de Firebase se encuentra en `src/lib/firebase.ts`.
- **Inteligencia Artificial:** Genkit (con Google AI). Todas las funcionalidades de IA, como el análisis de datos, la predicción y el chat conversacional, se gestionan a través de "flows" de Genkit. Estos flujos están definidos en `src/ai/flows/` y utilizan los modelos de Gemini.
- **Manejo de Formularios:** React Hook Form con Zod para la validación de esquemas, asegurando la integridad de los datos antes de ser enviados a las Server Actions.
- **Internacionalización (i18n):** Next-Intl. La aplicación está preparada para ser multilingüe (español e inglés), con los textos centralizados en archivos JSON en la carpeta `messages/`.
- **Autenticación:** Firebase Auth.

## 3. Estructura de Funcionalidades y Módulos

El proyecto se organiza en módulos de negocio claros, cada uno con su propia sección en la aplicación y, en muchos casos, su propio dashboard y funcionalidades de IA asociadas.

- **Command Center (Dashboard Principal):** Es la vista de alto nivel del sistema. Muestra KPIs agregados de diferentes módulos como cobranzas, empleados y clientes en riesgo, y proporciona accesos rápidos a las demás secciones.
- **Inteligencia de Cliente:**
    - **CRM (Gestión de Clientes):** Permite registrar nuevos clientes a través de un formulario detallado que incluye información fiscal condicional (CUIT/RUT/RUC) y la capacidad de subir documentos.
    - **Gestión de Créditos:** Dashboard enfocado en la salud de la cartera de cobranzas, con métricas de mora, recupero y un pipeline de pagos visual.
    - **Atención al Cliente:** Módulo para la gestión de tickets de soporte, con análisis de canales, tiempos de respuesta y satisfacción.
- **IA y Analíticas:**
    - **Business Intelligence:** Permite a los usuarios pegar datos financieros, de mercado y de clientes para que la IA genere un dashboard con un resumen y recomendaciones.
    - **Análisis Financiero:** Ofrece un análisis de IA a nivel de CFO sobre datos financieros, además de formularios para registrar cobranzas y proyecciones.
    - **Automatización de Procesos:** Muestra métricas sobre workflows automatizados, horas ahorradas y ROI.
    - **Inventario Inteligente:** Dashboard para la gestión de stock, con alertas, valor de inventario y análisis de rotación.
- **Compañía:**
    - **Recursos Humanos:** Incluye un dashboard de métricas de personal y una sección de gestión para registrar nuevos empleados. Su funcionalidad estrella es el **Análisis Predictivo de Retención** por IA.
    - **Gestión Documental:** Un repositorio centralizado para documentos con flujos de aprobación.
- **Reporting y Mission Control (Configuración):** Módulos para la gestión de reportes y la configuración del sistema, usuarios y roles.
- **Asistente de IA (Chat):** Un componente de chat transversal disponible en la mayoría de los dashboards que permite a los usuarios hacer preguntas en lenguaje natural sobre los datos presentados.

## 4. Estilo Visual e Identidad de Marca

La identidad visual de Metanoia.click ha sido diseñada para proyectar una imagen profesional, tecnológica y premium.

- **Paleta de Colores (Modo Oscuro - Principal):**
    - **Fondo:** Azul oscuro profundo (`#090E1A`).
    - **Acento Primario:** Azul eléctrico vibrante (`#3874FF`) para elementos interactivos.
    - **Acento Secundario:** Verde esmeralda (`#10B981`) para indicadores de éxito.
- **Paleta de Colores (Modo Claro):**
    - **Fondo:** Gris suave y profesional (`#F5F7FA`) para reducir el deslumbramiento.
    - **Acento Primario:** Azul corporativo (`#5C87A6`).
    - **Acento Secundario:** Verde azulado (`#45A69B`).
- **Tipografía:** Se utiliza la fuente "Inter", con un buen peso en la jerarquía visual para diferenciar títulos, subtítulos y texto de cuerpo.
- **Iconografía:** Se usa la librería `lucide-react` para una iconografía limpia, moderna y consistente en toda la aplicación.
- **Diseño y Layout:**
    - **Tarjetas (Cards):** Son el elemento principal de la interfaz. Tienen bordes redondeados y sombras sutiles para dar una sensación de profundidad.
    - **Gradientes y Resplandores (Glow):** Se utilizan gradientes radiales sutiles en los fondos de página y efectos de resplandor en elementos clave para añadir un toque futurista y destacar la naturaleza tecnológica de la IA.
    - **Visualización de Datos:** Se emplean gráficos de `recharts` (integrados con ShadCN) para presentar datos complejos de forma clara y visualmente atractiva, respetando la paleta de colores de la marca.
- **Logo:** Consiste en el ícono `BrainCircuit` dentro de un círculo con un gradiente, acompañado del nombre "Metanoia.Click", comunicando la fusión de inteligencia y tecnología.
