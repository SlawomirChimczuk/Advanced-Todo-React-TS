import React, { useState } from "react";
import Button from "../Button";
import type { Task } from "../TaskList";

export type TaskInputProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskInput({setTasks}: TaskInputProps) {

    const [value, setValue] = useState<string>('');
    // const [task, setTask] = useState<string>('');

    const createTask = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(value.trim() === "") return

        // setTask(value);

        const newTask: Task = {
            id: crypto.randomUUID(),
            name: value,
            status: 'new'
            // status: 'new' as const
        }

        setTasks(prevTask => [...prevTask, newTask])

        setValue('');
        
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div>
            <form onSubmit={(createTask)}>
                <input className="px-4 py-2 border mx-2 border-blue-400 rounded-lg placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 shadow-md transition-all"
                    type="text" 
                    onChange={handleChange}
                    value={value}
                />
                <Button>Add Task</Button>
                <br />
            </form>
            {/* <h3>123
                {task}
            </h3> */}
        </div>
  )
}
