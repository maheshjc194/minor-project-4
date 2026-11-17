import { useState, useEffect } from "react";
import TaskForm from "./components/Taskform";
import FilterBar from "./components/filterbar";
import TaskList from "./components/tasklist";
import "./styles/App.css";

const STORAGE_KEY = "todo-tasks";
const loadTasks = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("all");

  // Side effect: persist tasks to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, dueDate) =>
    setTasks([{ id: Date.now(), text, dueDate, completed: false }, ...tasks]);
  const toggleTask = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const editTask = (id, changes) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...changes } : t)));

  const visible = tasks.filter(
    ({ completed }) => filter === "all" || (filter === "completed") === completed
  );
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const next = tasks.find((t) => !t.completed);

  return (
    <main className="app">
      <header className="app__head">
        <h1>Today’s tasks</h1>
        <p>
          {next ? `Up next: ${next.text}` : "Nothing pending. Add a task to begin."}
          {` (${pendingCount} pending)`}
        </p>
      </header>
      <TaskForm onAdd={addTask} />
      <FilterBar current={filter} onChange={setFilter} />
      <TaskList
        tasks={visible}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </main>
  );
}
