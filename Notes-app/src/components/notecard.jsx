export default function NoteCard({ note, onEdit, onDelete }) {
  const { id, title, body, category, updatedAt } = note;
  return (
    <article className="card" data-cat={category}>
      <h2>{title || "Untitled"}</h2>
      <p>{body}</p>
      <footer>
        <small>
          {category} · {new Date(updatedAt).toLocaleString()}
        </small>
        <div>
          <button className="ghost" onClick={() => onEdit(id)}>
            Edit
          </button>
          <button className="ghost" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
}
