# Financial Products Manager - Angular

Solución para la gestión de productos financieros basada en una arquitectura modular y reactiva, cumpliendo con los requerimientos técnicos y de diseño establecidos.

## 📁 Estructura del Proyecto

El proyecto sigue una organización por dominios y capas de responsabilidad:

- **`src/app/core`**: Servicios globales, modelos de datos y utilitarios transversales.
- **`src/app/feature/products`**: Módulo principal de la aplicación.
  - **`components`**: Componentes de UI (tabla, búsqueda, paginación).
  - **`facade`**: Capa de abstracción para la gestión de estado y lógica de negocio.
  - **`page`**: Componentes contenedores de página (listado y formulario).
  - **`utils`**: Validadores personalizados para el formulario.
- **`src/app/shared`**: Componentes reutilizables (diálogos, botones, notificaciones) y servicios de utilidad.

## 🚀 Arquitectura Técnica

- **Angular 21**: Implementación de Standalone Components y gestión de estado mediante **Signals** (`signal`, `computed`, `effect`).
- **Pattern Facade**: Uso de `ProductsFacade` para desacoplar la interfaz de los servicios de infraestructura, garantizando un flujo de datos predecible.
- **Validaciones Avanzadas**: Implementación de validadores asíncronos para la verificación de IDs únicos y validaciones cruzadas para fechas.
- **CSS Puro**: Maquetación responsive (Flexbox/Grid) basada estrictamente en los diseños D1-D4, sin librerías externas.

## 🛠️ Instalación y Ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
Configurar el Backend:
Asegurar que el servidor local de la prueba esté activo en http://localhost:3002.
Ejecutar la aplicación:
bash
npm run start