import { useState, useEffect } from "react";
import NoteForm from "./components/noteform";
import SearchBar from "./components/searchbar";
import NoteCard from "./components/notecard";
import "./components/style/app.css";

export const CATEGORIES = ["Personal", "Work", "Ideas", "Study"];
const STORAGE_KEY = "notes-app-data";

const loadNotes = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

export default function App() {
  const [notes, setNotes] = useState(loadNotes);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const editingNote = notes.find((n) => n.id === editingId) ?? null;

  const saveNote = (data) => {
    if (editingNote) {
      setNotes(
        notes.map((n) =>
          n.id === editingId ? { ...n, ...data, updatedAt: Date.now() } : n
        )
      );
      setEditingId(null);
    } else {
      setNotes([{ id: Date.now(), ...data, updatedAt: Date.now() }, ...notes]);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (id === editingId) setEditingId(null);
  };

  const q = query.toLowerCase();
  const visible = notes.filter(
    ({ title, body, category: c }) =>
      (category === "All" || c === category) &&
      `${title} ${body}`.toLowerCase().includes(q)
  );

  return (
    <main className="app">
      <h1>Notes</h1>
      <NoteForm
        note={editingNote}
        onSave={saveNote}
        onCancel={() => setEditingId(null)}
      />
      <SearchBar
        query={query}
        onQuery={setQuery}
        category={category}
        onCategory={setCategory}
      />
      {visible.length === 0 ? (
        <p className="empty">
          {notes.length ? "No notes match your search." : "Write your first note above."}
        </p>
      ) : (
        <section className="grid">
          {visible.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={setEditingId}
              onDelete={deleteNote}
            />
          ))}
        </section>
      )}
    </main>
  );
}
