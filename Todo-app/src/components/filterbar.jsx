const FILTERS = ["all", "pending", "completed"];

export default function FilterBar({ current, onChange }) {
  return (
    <nav className="filters" aria-label="Filter tasks">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={f === current ? "active" : ""}
          onClick={() => onChange(f)}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </nav>
  );
}
