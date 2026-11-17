import { CATEGORIES } from "../app";

export default function SearchBar({ query, onQuery, category, onCategory }) {
  return (
    <div className="search">
      <input
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Search notes"
        aria-label="Search notes"
      />
      <div className="chips">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            className={c === category ? "chip active" : "chip"}
            onClick={() => onCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
