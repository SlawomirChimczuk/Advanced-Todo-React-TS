import { useEffect, useMemo, useState } from "react";
import TaskInput from "./sections/TaskInput";
import TaskItem from "./sections/TaskItem";

export type TaskStatus = 'new' | 'in-progress' | 'done';

export type Task = {
  id: string;
  name: string;
  status: TaskStatus;
}


export default function TaskList() {

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks]);

  const nextTask = (id: string, nextStatus: TaskStatus) => {
    setTasks(curr => curr.map(el => 
      el.id === id ? { ...el, status: nextStatus} : el
    ));
  }

   const removeTask = (id: string) => {
    setTasks(curr => curr.filter(el => el.id !== id));
  }

  const newTasks = useMemo(() => tasks.filter(task => task.status === 'new'),[tasks]);
  const inProgressTasks = useMemo(() => tasks.filter(task => task.status === 'in-progress'),[tasks])
  const doneTasks = useMemo(() => tasks.filter(t => t.status === 'done'), [tasks]);



  return (
    <div className="p-6">      
      <TaskInput setTasks={setTasks}/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-bold mb-3 text-blue-600">New</h2>
          <TaskItem tasks={newTasks} 
            buttonText = 'Start'
            nextStatus="in-progress"
            nextTask={nextTask}
            removeTask={removeTask}
          />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-bold mb-3 text-yellow-600">In Progress</h2>
          <TaskItem tasks={inProgressTasks} 
            buttonText = 'Complete' 
            nextStatus="done"
            nextTask={nextTask}
            removeTask={removeTask}
          />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-bold mb-3 text-green-600">Done</h2>
          <TaskItem tasks={doneTasks} 
            nextTask={nextTask}
            removeTask={removeTask}
          />
        </div>
      </div>
    </div>
  )
}
