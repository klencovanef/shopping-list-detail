import { useState } from "react";
import { FiTrash2, FiPlusCircle } from "react-icons/fi";

export default function ItemList({
  items,
  rawItems,
  filter,
  onFilterChange,
  onAddItem,
  onDeleteItem,
  onToggleResolved
}) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAddItem(value);
    setValue("");
  };

  return (
    <section className="card">
      {/* === Horní panel s filtry === */}
      <div className="toolbar">
        <span>Filtr:</span>
        <button
          className={filter === "active" ? "chip active" : "chip"}
          onClick={() => onFilterChange("active")}
        >
          Aktivní
        </button>
        <button
          className={filter === "bought" ? "chip active" : "chip"}
          onClick={() => onFilterChange("bought")}
        >
          Nakoupené
        </button>
        <button
          className={filter === "all" ? "chip active" : "chip"}
          onClick={() => onFilterChange("all")}
        >
          Všechny
        </button>

        <span className="muted" style={{ marginLeft: "auto" }}>
          {items.length}/{rawItems.length} položek
        </span>
      </div>

      {/* === Seznam položek === */}
      <ul className="list">
        {items.map((item) => (
          <li key={item.id} className="list-row">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={item.resolved}
                onChange={() => onToggleResolved(item.id)}
              />
              <span className={item.resolved ? "done" : ""}>
                {item.name}
              </span>
            </label>
            <button
              className="danger"
              onClick={() => onDeleteItem(item.id)}
              title="Smazat položku"
            >
              <FiTrash2
                style={{ marginRight: 4, verticalAlign: "middle" }}
              />
              Smazat
            </button>
          </li>
        ))}
      </ul>

      {/* === Formulář pro přidání nové položky === */}
      <form onSubmit={submit} className="row">
        <input
          placeholder="Název položky…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" title="Přidat položku">
          <FiPlusCircle
            style={{ marginRight: 4, verticalAlign: "middle" }}
          />
          Přidat
        </button>
      </form>
    </section>
  );
}
