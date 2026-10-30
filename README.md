# Control de Jornada / Frontend

Proyecto inicial del entrenamiento de Next.js. Sigue la estructura de carpetas de los
proyectos de la empresa, con un ejemplo completo de CRUD (**Tareas**) que sirve de guía
para construir el CRUD de tu entidad contra `control-jornada-backend`.

## Tecnologías

| Tema           | Elección                                          |
| -------------- | ------------------------------------------------- |
| Framework      | Next.js 16 (App Router) con React 19 y TypeScript |
| UI             | MUI 7 y notistack para avisos                     |
| Formularios    | React Hook Form con validación Yup                |
| Consumo de API | `fetch` nativo                       |

## Requisitos

- Node.js 20.9 o superior (hay un `.nvmrc` con la 22)
- pnpm (`npm install -g pnpm`)
- Para tu entidad: el backend corriendo en `http://localhost:8080`

## Cómo correrlo

```bash
pnpm install
pnpm mock
pnpm dev
```

`pnpm mock` y `pnpm dev` van en terminales separadas. Abre http://localhost:3000.

| Comando          | Qué hace                                              |
| ---------------- | ----------------------------------------------------- |
| `pnpm dev`       | Servidor de desarrollo                                |
| `pnpm build`     | Compila para producción                               |
| `pnpm start`     | Corre la versión compilada                            |
| `pnpm lint`      | Revisa el código con ESLint                           |
| `pnpm typecheck` | Revisa los tipos con TypeScript                       |
| `pnpm prettier`  | Formatea el código                                    |
| `pnpm mock`      | Backend simulado de tareas en `http://localhost:8090` |

## Entornos y URLs

Igual que en los proyectos de la empresa, las URLs viven en `next.config.ts`, agrupadas por
entorno (`local`, `dev`, `stg`, `pro`). El entorno se elige con la variable `STAGE`
(por defecto `local`).

| Variable                       | Valor          | Para qué                               |
| ------------------------------ | -------------- | -------------------------------------- |
| `process.env.BASE_URL_API`     | `/api/backend` | Tu backend (`control-jornada-backend`) |
| `process.env.BASE_URL_EXAMPLE` | `/api/mock`    | El mock del ejemplo de tareas          |

Las dos apuntan a rutas del mismo Next.js. En `next.config.ts`, `rewrites` las redirige a
`http://localhost:8080` y `http://localhost:8090`. Así el navegador nunca llama directo al
backend y no hay problemas de CORS.

Ejemplo: ``fetch(`${process.env.BASE_URL_API}/empleados`)`` llega a
`http://localhost:8080/empleados`.

## Estructura

```
scripts/mock-server.mjs           backend simulado de tareas
src/
├── app/                          rutas (App Router)
│   ├── layout.tsx                layout raíz: tema, avisos y menú
│   ├── page.tsx                  redirige a /task/list
│   ├── loading.tsx · error.tsx · not-found.tsx
│   └── task/
│       ├── list/page.tsx         /task/list
│       ├── add/page.tsx          /task/add
│       └── add/[id]/page.tsx     /task/add/:id (editar)
├── components/                   componentes compartidos
│   ├── layout · layouts/         layout con menú lateral y cabecera
│   ├── custom-breadcrumbs/       título de página con migas de pan
│   ├── custom-dialog/            diálogo de confirmación
│   ├── hook-form/                campos conectados a React Hook Form
│   ├── label/                    etiqueta de estado
│   ├── snackbar/                 avisos (notistack)
│   └── table/                    cabecera, paginación, estados vacíos y useTable
├── config/Global.ts              constantes globales
├── enums/                        enumeraciones
├── helpers/API.ts                manejo de respuestas y errores de fetch
├── hooks/                        hooks reutilizables
├── model/                        interfaces de las entidades
├── routes/                       paths.ts, hooks y RouterLink
├── sections/                     pantallas por módulo
│   └── task/
│       ├── task.ts               columnas, filtros y esquema Yup
│       ├── task-table-row.tsx · task-table-toolbar.tsx
│       ├── task-new-edit-form.tsx
│       └── view/                 vistas de lista, creación y edición
├── services/rest/                llamadas al backend con fetch
├── themes/                       tema de MUI
└── utils/                        funciones utilitarias
```

## Cómo agregar tu entidad

Toma el módulo `task` como guía y crea lo mismo para tu entidad, por ejemplo `employee`:

1. **Modelo:** `src/model/employee.model.ts` con la interfaz que devuelve el backend. Expórtala en `src/model/index.ts`.
2. **Servicio:** `src/services/rest/employee/employeeService.ts` con `fetch` usando `process.env.BASE_URL_API`. Expórtalo en `src/services/rest/index.ts`.
3. **Rutas:** agrega `employee` en `src/routes/paths.ts` y crea `src/app/employee/list`, `add` y `add/[id]`.
4. **Menú:** agrega tu entrada en `src/components/layouts/dashboard/config-navigation.tsx`.
5. **Pantallas:** en `src/sections/employee/` crea la fila de tabla, el toolbar, el formulario y las vistas.
6. **Prueba:** crea, lista, edita y elimina contra el backend real.

## Convenciones

- Nombres de archivos en `kebab-case`; componentes en `PascalCase`.
- Las páginas de `app` son delgadas: exportan `metadata` y renderizan una vista de `sections`.
- Las vistas que usan estado, efectos o eventos llevan `'use client'`.
- Las llamadas al backend solo se hacen desde `services`; los componentes no usan `fetch` directo.
- Antes de subir cambios: `pnpm lint`, `pnpm typecheck` y `pnpm prettier`.
