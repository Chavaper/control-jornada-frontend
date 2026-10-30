import { createServer } from 'node:http'

const PORT = Number(process.env.PORT) || 8090

let nextId = 4
let tasks = [
  {
    id: 1,
    title: 'Revisar estructura del proyecto',
    description: 'Recorrer app, sections, services y model',
    completed: true
  },
  {
    id: 2,
    title: 'Probar el backend en Postman',
    description: 'Anotar rutas, payloads y errores de la entidad',
    completed: false
  },
  {
    id: 3,
    title: 'Crear el servicio con fetch',
    description: 'Listar, obtener, crear, actualizar y eliminar',
    completed: false
  }
]

const send = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(body === undefined ? '' : JSON.stringify(body))
}

const readBody = (req) =>
  new Promise((resolve) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch {
        resolve(null)
      }
    })
  })

const validate = (body) => {
  const errors = {}
  if (!body || typeof body.title !== 'string' || !body.title.trim()) {
    errors.title = 'El título es obligatorio'
  } else if (body.title.length > 100) {
    errors.title = 'El título no puede superar 100 caracteres'
  }
  if (body?.description && body.description.length > 255) {
    errors.description = 'La descripción no puede superar 255 caracteres'
  }
  return errors
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  const parts = url.pathname.split('/').filter(Boolean)

  if (parts[0] !== 'tasks' || parts.length > 2) {
    return send(res, 404, { message: 'Recurso no encontrado' })
  }

  const id = parts[1] ? Number(parts[1]) : null
  const index = id ? tasks.findIndex((task) => task.id === id) : -1

  if (req.method === 'GET' && id === null) {
    return send(res, 200, tasks)
  }

  if (req.method === 'GET') {
    return index === -1
      ? send(res, 404, { message: `No existe la tarea ${id}` })
      : send(res, 200, tasks[index])
  }

  if (req.method === 'POST' && id === null) {
    const body = await readBody(req)
    const errors = validate(body)
    if (Object.keys(errors).length) {
      return send(res, 400, { message: 'Datos inválidos', errors })
    }
    const task = {
      id: nextId++,
      title: body.title.trim(),
      description: body.description ?? '',
      completed: Boolean(body.completed)
    }
    tasks.push(task)
    return send(res, 201, task)
  }

  if (req.method === 'PUT' && id !== null) {
    if (index === -1) {
      return send(res, 404, { message: `No existe la tarea ${id}` })
    }
    const body = await readBody(req)
    const errors = validate(body)
    if (Object.keys(errors).length) {
      return send(res, 400, { message: 'Datos inválidos', errors })
    }
    tasks[index] = {
      id,
      title: body.title.trim(),
      description: body.description ?? '',
      completed: Boolean(body.completed)
    }
    return send(res, 200, tasks[index])
  }

  if (req.method === 'DELETE' && id !== null) {
    if (index === -1) {
      return send(res, 404, { message: `No existe la tarea ${id}` })
    }
    tasks = tasks.filter((task) => task.id !== id)
    return send(res, 204)
  }

  return send(res, 405, { message: 'Método no permitido' })
})

server.listen(PORT, () => {
  console.log(`Mock de tareas en http://localhost:${PORT}/tasks`)
})
