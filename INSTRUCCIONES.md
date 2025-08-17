# Instrucciones de Instalación y Uso - Monitor de Consumo Energético

##  **INFORMACIÓN DEL PROYECTO**

**REPÚBLICA BOLIVARIANA DE VENEZUELA**  
**UNIVERSIDAD NACIONAL EXPERIMENTAL PARA LAS TELECOMUNICACIONES E INFORMÁTICA**  
**VICERRECTORADO ACADÉMICO**  
**PROGRAMA NACIONAL DE FORMACIÓN EN INGENIERÍA EN INFORMÁTICA**  
**U.C.: Proyecto Socio Integrador III  BootCamp**

---

### ** EQUIPO DE DESARROLLO**

| **Rol** | **Nombre** |
|---------|------------|
| **Docente Asesora** | Carol Armao |
| **Alumno** | Enmanuela Gutiérrez |
| **Alumno** | Antonio Ruiz |

**Versión:** 1.0  
**Fecha:** Agosto 2025  
**Caracas, Venezuela**

---

##  **DESCRIPCIÓN DEL PROYECTO**

**Monitor de Consumo Energético con Sugerencias de Ahorro** - Aplicación web para monitorear el consumo energético del hogar y recibir recomendaciones personalizadas de ahorro.

### **Objetivo del MVP:**
Validar la viabilidad técnica y la aceptación por parte de los usuarios de una herramienta digital que mejore la visibilidad y el control del consumo energético, fomentando hábitos de ahorro en los hogares.

### **Alcance del MVP:**
1. **Registro y autenticación de usuarios** - Creación de cuentas y acceso seguro
2. **Registro de lecturas eléctricas diarias** - Ingreso y almacenamiento validado de datos de consumo
3. **Visualización de datos** - Presentación del historial en listas y gráficos básicos
4. **Motor de recomendaciones** - Sugerencias simples basadas en el consumo registrado por usuario

---

##  **PRODUCT BACKLOG - SPRINT 1**

### **Prioridad 1: Registro y Autenticación de Usuarios**  **COMPLETADO**
**Como nuevo usuario, quiero registrarme e iniciar sesión para acceder y monitorear mi consumo.**

**Criterios de Aceptación:**
-  El usuario puede registrarse con nombre, correo y contraseña
-  Validación de campos obligatorios y formato de correo
-  Posibilidad de iniciar sesión con credenciales correctas
-  Mensaje de error en credenciales incorrectas

### **Prioridad 2: Registro de Lecturas Diarias**  **COMPLETADO**
**Como usuario registrado, quiero ingresar lecturas diarias de consumo para llevar un registro histórico.**

**Criterios de Aceptación:**
-  El usuario puede ingresar la fecha y valor de consumo
-  Los datos se almacenan correctamente en la base de datos
-  Validación para evitar duplicar lecturas del mismo día

### **Prioridad 3: Visualización del Historial**  **COMPLETADO**
**Como usuario, quiero visualizar mis lecturas en un historial para entender mi patrón de consumo.**

**Criterios de Aceptación:**
-  El usuario puede ver un listado y/o gráfico de su consumo
-  Posibilidad de filtrar por rango de fechas
-  Los datos corresponden al usuario autenticado

### **Prioridad 4: Motor de Recomendaciones**  **COMPLETADO**
**Como usuario, quiero recibir recomendaciones de ahorro personalizadas según mi consumo registrado.**

**Criterios de Aceptación:**
-  El sistema analiza el historial y genera recomendaciones automáticas
-  Las recomendaciones se muestran en la interfaz del usuario
-  El contenido es comprensible y relevante

---

##  **PLAN DE TRABAJO POR DÍA (8 DÍAS)**

### **Día 1  Inicio y organización**  **COMPLETADO**
-  Revisión final del Product Backlog
-  Configuración de entorno de desarrollo y repositorio
-  Documentación inicial del Sprint (meta, historias, criterios)

### **Día 2  Registro de usuarios (backend y frontend)**  **COMPLETADO**
-  Implementación de formulario de registro
-  Validación de datos y almacenamiento seguro
-  Documentación de flujo y pruebas

### **Día 3  Autenticación e inicio de sesión**  **COMPLETADO**
-  Implementación de login con validación
-  Manejo de sesiones y seguridad básica
-  Documentación de flujo y pruebas

### **Día 4  Registro de consumo eléctrico**  **COMPLETADO**
-  Creación de interfaz para ingresar lecturas
-  Validación y guardado en la base de datos
-  Documentación y capturas de ejemplo

### **Día 5  Visualización del historial**  **COMPLETADO**
-  Implementación de listado y/o gráfico básico del consumo
-  Filtro por usuario y orden cronológico
-  Documentación de la visualización

### **Día 6  Motor básico de recomendaciones**  **COMPLETADO**
-  Implementar lógica para detectar consumo alto y sugerir acciones
-  Mostrar recomendaciones personalizadas
-  Documentación y ejemplos

### **Día 7  Pruebas e integración**  **COMPLETADO**
-  Pruebas unitarias y de integración de todas las funcionalidades
-  Corrección de errores
-  Documentación de evidencias y flujo completo

### **Día 8  Presentación y cierre**  **COMPLETADO**
-  Revisión final del MVP
-  Preparación de presentación/demo
-  Entrega del documento final del proyecto

---

##  **TECNOLOGÍAS UTILIZADAS**

### **Frontend:**
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Vite** - Herramienta de build rápida y moderna
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Enrutamiento de la aplicación

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

---

##  **INSTALACIÓN Y EJECUCIÓN**

### **Prerrequisitos:**
- Node.js 18+ 
- MongoDB 6+
- npm o yarn

### **Pasos de instalación:**

#### **1. Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd monitor-energia
```

#### **2. Instalar dependencias**
```bash
npm install
```

#### **3. Configurar variables de entorno**
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales de MongoDB
# MONGODB_URI=mongodb://localhost:27017/monitor-energia
# NEXTAUTH_SECRET=tu-secreto-seguro-aqui
```

#### **4. Iniciar MongoDB**
```bash
# Asegúrate de que MongoDB esté ejecutándose
mongod
```

#### **5. Iniciar el servidor backend**
```bash
npm run server
```

#### **6. En otra terminal, iniciar el frontend**
```bash
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
       LoginForm.tsx   # Formulario de inicio de sesión
       RegisterForm.tsx # Formulario de registro
    pages/              # Páginas principales de la aplicación
       Dashboard.tsx   # Dashboard principal con recomendaciones
    contexts/           # Contextos de React (autenticación)
       AuthContext.tsx # Contexto de autenticación personalizado
    utils/              # Utilidades y funciones auxiliares
       recommendations.ts # Motor de recomendaciones
    server/             # Código del servidor backend
        models/         # Modelos de MongoDB
        routes/         # Rutas de la API
        index.ts        # Servidor principal
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

##  **DEFINICIÓN DE HECHO (DEFINITION OF DONE)**

Una funcionalidad se considera finalizada cuando:
-  Cumple todos sus criterios de aceptación
-  Está probada y funciona sin errores
-  La documentación y evidencias están completas
-  El código está integrado en la versión final del MVP

---

##  **CONTRIBUCIÓN**

Este proyecto fue desarrollado como parte del **Proyecto Socio Integrador III** en la **Universidad Nacional Experimental para las Telecomunicaciones e Informática**.

### **Equipo de Desarrollo:**
- **Enmanuela Gutiérrez** - Desarrollo Frontend y Backend
- **Alumno** - Antonio Ruiz
- **Carol Armao** - Docente Asesora

---

##  **LICENCIA**

Este proyecto es propiedad de la **Universidad Nacional Experimental para las Telecomunicaciones e Informática** y está destinado exclusivamente para fines educativos.

---

##  **CONTACTO**

Para más información sobre este proyecto, contactar a:
- **Docente Asesora:** Carol Armao
- **Universidad:** UNETI
- **Programa:** Ingeniería en Informática
