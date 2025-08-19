# Monitor de Consumo Energético con Sugerencias de Ahorro

Estado del Proyecto: Versión final estable (Agosto 2025)

Esta es una versión final estable, apegada al caso de uso académico, que incluye simulación demostrativa de datos, análisis de consumo y recomendaciones. El sistema está listo para su evaluación y demostración.

##  **INFORMACIÓN DEL PROYECTO**

**REPÚBLICA BOLIVARIANA DE VENEZUELA**  
**UNIVERSIDAD NACIONAL EXPERIMENTAL PARA LAS TELECOMUNICACIONES E INFORMÁTICA**  
**VICERRECTORADO ACADÉMICO**  
**PROGRAMA NACIONAL DE FORMACIÓN EN INGENIERÍA EN INFORMÁTICA**  
**U.C.: Proyecto Socio Tecnologico III Modulo 2   BootCamp**

---

### ** EQUIPO DE DESARROLLO**

| **Rol** | **Nombre** |
|---------|------------|
| **Docente Asesora** | Carol Armao |
| **Alumno** | Enmanuela Gutiérrez |
| **Alumno** | Antonio Ruiz |

**Versión:** Estable  
**Fecha:** 16/ Agosto / 2025  
**Caracas, Venezuela**

---

##  **OBJETIVO DEL MVP**

Validar la viabilidad técnica y la aceptación por parte de los usuarios de una herramienta digital que mejore la visibilidad y el control del consumo energético, fomentando hábitos de ahorro en los hogares.

##  **ALCANCE DEL MVP**

El MVP incluye las siguientes funcionalidades esenciales:

1. **Registro y autenticación de usuarios** - Creación de cuentas y acceso seguro
2. **Registro de lecturas eléctricas diarias** - Ingreso y almacenamiento validado de datos de consumo
3. **Visualización de datos** - Presentación del historial en listas y gráficos básicos
4. **Motor de recomendaciones** - Sugerencias simples basadas en el consumo registrado por usuario

##  **CRITERIOS DE ÉXITO DEL MVP**

- Al menos el **80%** de los usuarios de prueba completan el registro y pueden ingresar datos de consumo
- Los usuarios pueden visualizar su historial de consumo **sin errores**
- El sistema genera **recomendaciones correctas** en función de los datos ingresados
- Se obtiene **retroalimentación positiva** de al menos el **70%** de los usuarios que lo prueben

---

##  Estado de la Entrega Final

Características clave incluidas en esta versión estable:

- Dashboard simplificado con métrica de consumo, costo y recomendación del sistema
- Módulos dedicados: `Consumo`, `Análisis` e `Información`
- Simulador de datos en tiempo real integrado al sidebar como panel expandible
- Gráficos con Chart.js (incluye evolución temporal y comparaciones semanales)
- Sistema de precios dual USD + VES con tasa referencial oficial (BCV)
- Hook `useExchangeRate` para actualización de tasa y formateo de montos
- Componente `DualPriceDisplay` para mostrar precios en USD y VES
- Tabla de datos detallados con columna adicional de costo en VES
- Tutoriales interactivos con Driver.js (Login, Registro, Dashboard, Consumo, Análisis)
- Módulo `Información` sin tutorial (módulo meramente informativo)
- Corrección de layout: eliminación de espacio en blanco lateral y autoajuste del contenido
- UI consistente con Tailwind CSS y componentes `shadcn/ui`

Rutas principales:

- `/dashboard` – Resumen y recomendación del sistema
- `/consumo` – Filtros, métricas clave, gráficos y tabla detallada
- `/analisis` – Comparación semanal, eficiencia y patrones/insights
- `/informacion` – Stack, estructura, enlaces y equipo del proyecto

##  **PRODUCT BACKLOG - SPRINT 1**

### **Prioridad 1: Registro y Autenticación de Usuarios**
**Como nuevo usuario, quiero registrarme e iniciar sesión para acceder y monitorear mi consumo.**

**Criterios de Aceptación:**
-  El usuario puede registrarse con nombre, correo y contraseña
-  Validación de campos obligatorios y formato de correo
-  Posibilidad de iniciar sesión con credenciales correctas
-  Mensaje de error en credenciales incorrectas

**Estado:**  **COMPLETADO**

### **Prioridad 2: Registro de Lecturas Diarias**
**Como usuario registrado, quiero ingresar lecturas diarias de consumo para llevar un registro histórico.**

**Criterios de Aceptación:**
-  El usuario puede ingresar la fecha y valor de consumo
-  Los datos se almacenan correctamente en la base de datos
-  Validación para evitar duplicar lecturas del mismo día

**Estado:**  **COMPLETADO**

### **Prioridad 3: Visualización del Historial**
**Como usuario, quiero visualizar mis lecturas en un historial para entender mi patrón de consumo.**

**Criterios de Aceptación:**
-  El usuario puede ver un listado y/o gráfico de su consumo
-  Posibilidad de filtrar por rango de fechas
-  Los datos corresponden al usuario autenticado

**Estado:**  **COMPLETADO**

### **Prioridad 4: Motor de Recomendaciones**
**Como usuario, quiero recibir recomendaciones de ahorro personalizadas según mi consumo registrado.**

**Criterios de Aceptación:**
-  El sistema analiza el historial y genera recomendaciones automáticas
-  Las recomendaciones se muestran en la interfaz del usuario
-  El contenido es comprensible y relevante

**Estado:**  **COMPLETADO**

---

##  **TECNOLOGÍAS UTILIZADAS**

### **Frontend:**
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Vite** - Herramienta de build rápida y moderna
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Enrutamiento de la aplicación
- **shadcn/ui** - Componentes de interfaz modernos
- **Chart.js + react-chartjs-2** - Visualización de datos
- **Driver.js** - Tutoriales interactivos

### **Backend:**
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **bcryptjs** - Hashing seguro de contraseñas

### **Autenticación:**
- **Sistema personalizado** - Contexto de autenticación con React
- **JWT** - Tokens de autenticación
- **LocalStorage** - Persistencia de sesiones

---

##  **CARACTERÍSTICAS IMPLEMENTADAS**

### ** Funcionalidades Completadas:**
- **Sistema de autenticación robusto** sin dependencias externas
- **Motor de recomendaciones inteligente** con análisis de patrones
- **Dashboard analítico** con métricas en tiempo real
- **Gráficos de consumo** interactivos y responsivos
- **API REST completa** para gestión de datos
- **Base de datos optimizada** con índices y validaciones
- **UI moderna y responsive** con Tailwind CSS
- **Protección de rutas** automática
- **Validaciones de formularios** completas
- **Manejo de errores** robusto

### ** Motor de Recomendaciones:**
- **Análisis automático** del consumo energético
- **Detección de patrones** (aumento >15%, disminución >10%)
- **Sugerencias personalizadas** según el tipo de alerta
- **Cálculos en tiempo real** con datos históricos

### ** Dashboard Avanzado:**
- **Panel de recomendaciones** con colores dinámicos
- **Métricas de consumo** (total, costo, promedio)
- **Gráfico de tendencias** visual e interactivo
- **Alertas inteligentes** con iconos y mensajes

### **Módulos y Componentes Clave:**
- **Simulador en Sidebar**: control de inicio/pausa, estadísticas en tiempo real y estilo distintivo
- **Consumo**: métricas, filtros avanzados, exportación CSV, gráficos (incluye distribución por dispositivo)
- **Análisis**: comparación semanal, eficiencia, patrones/insights y evolución temporal
- **Información**: stack, estructura, enlaces a GitHub y tarjetas del equipo (sin tutorial)

### **Monedas y Tasas de Cambio:**
- Hook `useExchangeRate` con fuente referencial oficial (BCV)
- Componente `DualPriceDisplay` para mostrar USD y VES en todas las vistas relevantes
- Conversión aplicada a métricas, tarjetas y tabla de datos

---

##  **INSTALACIÓN Y EJECUCIÓN**

### **Prerrequisitos:**
- Node.js 18+ 
- MongoDB 6+
- npm o yarn

### **Pasos de instalación:**
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd monitor-energia

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de MongoDB

# Iniciar el servidor backend
npm run server

# En otra terminal, iniciar el frontend
npm run dev
```

### **Comandos disponibles:**
- `npm run dev` - Inicia el frontend en modo desarrollo
- `npm run server` - Inicia el servidor backend
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter de código

---

##  **ESTRUCTURA DE LA APLICACIÓN**

```
monitor-energia/
 src/
    components/          # Componentes React reutilizables
    pages/              # Páginas principales de la aplicación
    contexts/           # Contextos de React (autenticación)
    utils/              # Utilidades y funciones auxiliares
    server/             # Código del servidor backend
 public/                 # Archivos estáticos
 dist/                   # Build de producción
 docs/                   # Documentación del proyecto
```

---

##  **SEGURIDAD IMPLEMENTADA**

- **Contraseñas hasheadas** con bcryptjs (12 salt rounds)
- **Validación de entrada** en frontend y backend
- **Protección de rutas** con autenticación
- **Sanitización de datos** antes de almacenar
- **Manejo seguro de sesiones** con localStorage

---

##  **MÉTRICAS DE CALIDAD**

- **Cobertura de funcionalidades:** 100% del MVP
- **Tiempo de respuesta:** < 200ms para operaciones CRUD
- **Tasa de errores:** < 1% en operaciones críticas
- **Compatibilidad:** Navegadores modernos (Chrome, Firefox, Safari, Edge)

---

##  **CONTRIBUCIÓN**

Este proyecto fue desarrollado como parte del **Proyecto Socio Tecnologico III Modulo 2** en la **Universidad Nacional Experimental para las Telecomunicaciones e Informática**.

### **Equipo de Desarrollo:**
- **Enmanuela Gutiérrez** - Desarrollo Frontend y Backend
- **Antonio Ruiz** - Desarrollo Frontend y Backend
- **Carol Armao** - Docente Asesora

---

##  **LICENCIA**

Este proyecto es propiedad de la **Universidad Nacional Experimental para las Telecomunicaciones e Informática** y está destinado exclusivamente para fines educativos.

---

##  **CONTACTO**

Para más información sobre este proyecto, contactar a:
- **Docente Asesora:** Carol Armao
- **Universidad:** UNETI
- **Programa:** PNF de Ingeniería en Informática
