import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const { id, text, dueDate, completed } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(text);
  const [draftDate, setDraftDate] = useState(dueDate);

  const save = () => {
    if (draft.trim()) onEdit(id, { text: draft.trim(), dueDate: draftDate });
    setIsEditing(false);
  };

  const overdue =
    !completed && dueDate && dueDate < new Date().toISOString().slice(0, 10);

  return (
    <li className={`task ${completed ? "task--done" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        aria-label={`Mark "${text}" as ${completed ? "pending" : "completed"}`}
      />
      {isEditing ? (
        <div className="task__edit">
          <input value={draft} onChange={(e) => setDraft(e.target.value)} />
          <input
            type="date"
            value={draftDate}
            onChange={(e) => setDraftDate(e.target.value)}
          />
          <button onClick={save}>Save</button>
          <button className="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="task__body">
            <span className="task__text">{text}</span>
            <span className="task__meta">
              <b className={completed ? "badge badge--done" : "badge"}>
                {completed ? "Completed" : "Pending"}
              </b>
              {dueDate && (
                <span className={overdue ? "overdue" : ""}>Due {dueDate}</span>
              )}
            </span>
          </div>
          <div className="task__actions">
            <button className="ghost" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="ghost danger" onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
