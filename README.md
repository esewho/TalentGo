# **TALENTGO** | Proyecto Individual

## **📌 OBJETIVOS**

- Construir una Single Page Application utlizando las tecnologías: **React**, **Redux**, **Node**, **Express** y **Sequelize**.
- Poner en práctica recursos básicos de estilos y diseño (UX : UI).
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Utilizar y practicar testing.

<br />

---

## **⏱ HORARIOS Y FECHAS**

El proyecto individual tiene una duración máxima de tres semanas. Se inicia el 10-03-2025, y se agendará una corrección personalizada la última semana.

En el caso de completar todas las tareas antes de dicho lapso se podrá avisar a su instructor para coordinar una fecha de presentación del trabajo (DEMO).

<br />

---

## **⚠️ IMPORTANTE**

Es necesario contar minimamente con la última versión estable de NodeJS y NPM. Asegúrate de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto. Actualmente las versiónes necesarias son:

- **Node**: 12.18.3 o mayor
- **NPM**: 6.14.16 o mayor

Para verificar que versión tienes instalada:

```bash
node -v
npm -v
```

**ACLARACIÓN:** las dependencias actuales se encuentran en las versiones que venimos trabajando durante el bootcamp.

- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **react-router-dom**:^6.11.1
- **redux**: ^4.2.1
- **react-redux**: ^8.0.5

Está permitido, **bajo tu responsabilidad**, actualizar las dependencias a versiones más actuales si lo deseas. Versiones mas actuales podrían presentar configuraciones diferentes respecto a las versiones en las que venimos trabajando durante el bootcamp.

### **⛔️ Está rotundamente prohibido utilizar librerías externas para aplicar estilos a la SPA. Tendrás que utilizar CSS mediante algunas de las opciones vistas en el bootcamp (CSS puro, CSS Modules o Styled Components).**

<br />

---

## **📋 SOBRE LA API TALENTGO...**

## API - Remotive

La aplicación consume la API de Remotive para obtener listados de empleos.

Enlace a la documentacion: https://github.com/remotive-com/remote-jobs-api?tab=readme-ov-file

**Endpoint base:**

```
GET https://remotive.com/api/remote-jobs
```

### Parámetros de Consulta

| Parámetro    | Descripción                                    | Ejemplo                  |
| ------------ | ---------------------------------------------- | ------------------------ |
| category     | Filtra empleos por categoría (nombre o slug)   | `?category=software-dev` |
| company_name | Filtra por nombre de la empresa (parcialmente) | `?company_name=remotive` |
| search       | Búsqueda en título y descripción del empleo    | `?search=front%20end`    |
| limit        | Límite de resultados                           | `?limit=5`               |

## Uso de la API

Para realizar una búsqueda de empleos en la categoría "Software Development":

```js
import axios from "axios"

const API_URL = process.env.REMOTIVE_API_URL

const fetchJobs = async () => {
	try {
		const response = await axios.get(`${API_URL}?category=software-dev`)
		console.log(response.data)
	} catch (error) {
		console.error("Error fetching jobs:", error)
	}
}

fetchJobs()
```

<br />

---

## **📋 PARA COMENZAR...**

1. Deberás forkear este repositorio para tener una copia del mismo en tu cuenta personal de GitHub.

2. Clona el repositorio en tu computadora para comenzar a trabajar. Este repositorio contiene un **`BoilerPlate`** con la estructura general del proyecto, tanto del servidor como del cliente. El boilerplate cuenta con dos carpetas: **`server`** y **`client`**. En estas carpetas estará el código del back-end y el front-end respectivamente.

3. En la carpeta **`server`** deberás crear un archivo llamado: **`.env`** que tenga la siguiente forma:

   ```env
       DB_USER=usuariodepostgres
       DB_PASSWORD=passwordDePostgres
       DB_HOST=localhost
   ```

4. Reemplazar **`usuariodepostgres`** y **`passwordDePostgres`** con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

5. Adicionalmente será necesario que crees, **desde psql (shell o PGAdmin)**, una base de datos llamada **`jobs`**. Si no realizas este paso de manera manual no podrás avanzar con el proyecto.

<br />

---

## **📖 ENUNCIADO GENERAL**

La idea de este proyecto es construir una aplicación web de búsqueda de empleo a partir de la API [**Remotive**] en la que se pueda:

- Buscar ofertas de trabajo.
- Visualizar la información de las ofertas de trabajo.
- Filtrarlas.
- Ordenarlas.
- Dar de Alta (Crear) nuevas ofertas de trabajo.
  ⚠️ Para las funcionalidades de filtrado y ordenamiento NO se puede utilizar los endpoints de la API externa que ya devuelven los resultados filtrados u ordenados.

**IMPORTANTE**:

### Únicos end-point que se pueden utilizar

- GET https://remotive.com/api/remote-jobs
- GET https://remotive.com/api/remote-jobs?search={title}
- GET https://remotive.com/api/remote-jobs?limit=1 (para obtener un trabajo específico por ID)

---

<br />

## **📁 INSTRUCCIONES**

### **🖱 BASE DE DATOS**

Deberás crear dos modelos para tu base de datos. Una será para las ofertas de trabajo y la otra será para las categorías de trabajo (pueden llevar el nombre que tu quieras). La relación entre ambos modelos debe ser de muchos a muchos. A continuación te dejamos las propiedades que debe tener cada modelo.

**📍 MODELO 1 | Jobs**

- ID (deben ser distintos a los que vienen de la API). \*
- url. \* (enlace de el trabajo)
- title. \*
- company_name. \*
- company_logo \*
- category. \*
- job_type (full_time, partial... ).(completo, parcial, contrato, etc.) \*
- publication_date. \*
- candidate_required_location \* (Remoto, andalucia, madrid)
- description \*
- salary. \*

<br />

**📍 MODELO 2 | Categories**

- ID. \*
- Nombre. \*

<br />

---

<br />

### **🖱 BACK-END**

Para esta parte deberás construir un servidor utilizando **NodeJS** y **Express**. Tendrás que conectarlo con tu base de datos mediante **Sequelize**.

Tu servidor deberá contar con las siguientes rutas:

#### **📍 GET | /jobs**

- Obtiene un arreglo de objetos, donde cada objeto es una oferta de trabajo con su información.

IMPORTANTE: Si una oferta de trabajo no tiene logo de compañía, deberás colocarle una por defecto 🖼️

#### **📍 GET | /jobs/:idJob**

- Esta ruta obtiene el detalle de una oferta de trabajo específica. Es decir que devuelve un objeto con la información pedida en el detalle de una oferta.
- La oferta es recibida por parámetro (ID).
- Tiene que incluir los datos de la(s) categoría(s) a la que está asociada.
- Debe funcionar tanto para las ofertas de la API como para las de la base de datos.

#### **📍 GET | /jobs/title?="..."**

- Esta ruta debe obtener las primeras 15 ofertas de trabajo que se encuentren con la palabra recibida por query.
- Debe poder buscarla independientemente de mayúsculas o minúsculas.
- Si no existe la oferta, debe mostrar un mensaje adecuado.
- Debe buscar tanto las de la API como las de la base de datos.

#### **📍 POST | /jobs**

- Esta ruta recibirá todos los datos necesarios para crear una oferta de trabajo y relacionarla con sus categorías solicitadas.
- Toda la información debe ser recibida por body.
- Debe crear una oferta de trabajo en la base de datos, y esta debe estar relacionada con sus categorías indicadas (al menos una).

#### **📍 GET | /categories**

- Obtiene un arreglo con todas las categorías existentes de la API.
- En una primera instancia, cuando la base de datos este vacía, deberás guardar todas las categorías que encuentres en la API.
- Estas deben ser obtenidas de la API (se evaluará que no haya hardcodeo). Luego de obtenerlas de la API, deben ser guardadas en la base de datos para su posterior consumo desde allí.

<br />

---

<br />

### **🖱 FRONT-END**

Se debe desarrollar una aplicación utilizando **React** y **Redux** que contenga las siguientes vistas:

**📍 LANDING PAGE |** deberás crear una página de inicio o bienvenida con:

- Alguna imagen de fondo representativa al proyecto.
- Botón para ingresar a la **`home page`**.

<br />

**📍 HOME PAGE |** la página principal de tu SPA debe contener:

- SearchBar: un input de búsqueda para encontrar ofertas de trabajo por título.
- Sector en el que se vea un listado de cards con las ofertas de trabajo. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta **`GET /jobs`** y deberá mostrar su:
  - Logo de la compañía.
  - Título del puesto.
  - Categoría de trabajo.
  - Compañía.
- Cuando se le hace click a una Card deberá redirigir al detalle de esa oferta específica.
- Botones/Opciones para **filtrar** por categoría, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
- Botones/Opciones para **ordenar** tanto ascendentemente como descendentemente las ofertas por orden alfabético del título y por fecha de publicación.
- Paginado: el listado de ofertas se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 9 ofertas por página.

**⚠️ IMPORTANTE**: se deben mostrar tanto las ofertas traídas desde la API como así también las de la base de datos, pero **NO** está permitido almacenar en la base de datos las ofertas de la API. **Solamente se pueden guardar aquellas creadas desde el form**.

<br />

**📍 DETAIL PAGE |** en esta vista se deberá mostrar toda la información específica de una oferta:

- ID.
- Título.
- Compañía.
- Logo de la compañía.
- Ubicación requerida.
- Fecha de publicación.
- Tipo de trabajo.
- Salario.
- Descripción.
- Categoría(s).

**📍 FORM PAGE |**: en esta vista se encontrará el formulario para crear una nueva oferta de trabajo.

Este formulario debe ser **controlado completamente con JavaScritp**. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:

- Título.
- Compañía.
- Logo de la compañía.
- Ubicación requerida.
- Fecha de publicación.
- Tipo de trabajo.
- Salario.
- Descripción.
- Categoría(s).
- Posibilidad de seleccionar/agregar varias categorías en simultáneo.
- Botón para dar de alta (crear) la nueva oferta de trabajo.

> [**IMPORTANTE**]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el título no pueda contener símbolos, etc.

<br />

---

<br />

### **🖱 TESTING**

Ten en cuenta que en esta instancia no es obligatorio el desarrollo de testing para tu aplicación. De igual manera, te desafiamos a que los hagas, ¡ya que suman puntos!

- Al menos tener un componente del frontend con sus tests respectivos.
- Al menos tener dos ruta del backend con sus tests respectivos.
- Al menos tener un modelo de la base de datos con sus tests respectivos.

<br />

<br />

---

<br />

<div align="center">
<img src="./talentgo-logo.svg" alt="TalentGO Logo" style="margin-top: 30px; width: 300px;" />
</div>
