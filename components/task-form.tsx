"use client"

import { SyntheticEvent, useState } from "react"

type Props = {
    onAdd: (title: string) => void
}

export const TaskForm = ({ onAdd }: Props) => {
    const [title, setTitle] = useState("")
    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        onAdd(title)
        setTitle("")
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap=-2">
            <input 
                className="border p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New task"
            />
            <button className="bg-blue-500 text-white px-3 py-2 rounded" type="submit">
                Add
            </button>
        </form>
    )
}

