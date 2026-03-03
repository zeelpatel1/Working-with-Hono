export const getTask = async (db: any, limit: number, offset: number) => {
    return await db.prepare("SELECT * from tasks LIMIT ? OFFSET ?").bind(limit, offset).all()
}

export const createTask = async (db: any, title: string) => {
    return await db
        .prepare("INSERT INTO tasks (title) VALUES (?)")
        .bind(title)
        .run()
}

export const deleteTask = async (db: any, id: number) => {
    return await db
        .prepare("DELETE FROM tasks WHERE id = ?")
        .bind(id)
        .run()
}

export const updateTask = async (db: any, id: number, title: string) => {
    return await db
        .prepare("UPDATE tasks SET title = ? WHERE id = ?")
        .bind(title, id)
        .run()
}