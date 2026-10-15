import Button from "../Button"
import type { Task, TaskStatus } from "../TaskList"



export type TasksProps = {
    tasks: Task[];
    // setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    nextTask: (id: string, nextStatus: TaskStatus) => void;
    removeTask: (id: string) => void;
    nextStatus?: TaskStatus;
    buttonText?: string;
}

export default function TaskItem({tasks, nextTask, buttonText, nextStatus, removeTask}: TasksProps) {

  return (
     <div className="space-y-2">
      {tasks.map(task => (
        <div key={task.id} className="flex justify-between items-center p-3 bg-white shadow rounded-md">
            <span className={task.status === 'done' ? 'line-through text-gray-400' : ''}>
              {task.name}
            </span>
            {nextTask && buttonText && nextStatus && (
              <Button onClick={() => nextTask(task.id, nextStatus)}>{buttonText}</Button>
            )}
            <Button onClick={() => removeTask(task.id)}>Remove Task</Button>
        </div>
      ))}
    </div>
  )
}
