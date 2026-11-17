import { useState, useEffect } from "react";
import { CATEGORIES } from "../app";

const empty = { title: "", body: "", category: CATEGORIES[0] };

export default function NoteForm({ note, onSave, onCancel }) {
  const [form, setForm] = useState(empty);

  // Fill the form when a note is picked for editing, reset otherwise
  useEffect(() => {
    setForm(
      note ? { title: note.title, body: note.body, category: note.category } : empty
    );
  }, [note]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() && !form.body.trim()) return;
    onSave(form);
    setForm(empty);
  };

  return (
    <form className="note-form" onSubmit={submit}>
      <input
        name="title"
        value={form.title}
        onChange={update}
        placeholder="Title"
        aria-label="Title"
      />
      <textarea
        name="body"
        value={form.body}
        onChange={update}
        rows={4}
        placeholder="Write something…"
        aria-label="Note body"
      />
      <div className="note-form__row">
        <select
          name="category"
          value={form.category}
          onChange={update}
          aria-label="Category"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button type="submit">{note ? "Update note" : "Save note"}</button>
        {note && (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
