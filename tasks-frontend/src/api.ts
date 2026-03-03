const BASE_URL = "https://my-app.practice-hono.workers.dev"

const AUTH_HEADER = {
  Authorization: "Bearer 1234",
  "Content-Type": "application/json"
}

export const getTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: AUTH_HEADER
  })
  return res.json()
}

export const createTask = async (title: string) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: AUTH_HEADER,
    body: JSON.stringify({ title })
  })
  return res.json()
}

export const updateTask = async (id: number, title: string) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: AUTH_HEADER,
    body: JSON.stringify({ title })
  })
  return res.json()
}

export const deleteTask = async (id: number) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: AUTH_HEADER
  })
  return res.json()
}