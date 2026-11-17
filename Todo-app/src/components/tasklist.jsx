import TaskItem from "./TaskItem";

export default function TaskList({ tasks, ...handlers }) {
  if (tasks.length === 0) return <p className="empty">No tasks here yet.</p>;
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} {...handlers} />
      ))}
    </ul>
  );
}
