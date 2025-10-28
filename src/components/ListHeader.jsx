import { FiEdit3, FiShoppingBag } from "react-icons/fi";

export default function ListHeader({ name, owner, canRename, onRename }) {
  const handleClick = () => {
    if (!canRename) {
      alert("Pouze vlastník může upravit název seznamu.");
      return;
    }
    const newName = prompt("Zadej nový název seznamu:", name);
    if (newName && newName.trim() !== "") {
      onRename(newName.trim());
    }
  };

  return (
    <header className="header">
      <div className="list-title">
        <h1>
          <FiShoppingBag className="icon" />
          {name}
        </h1>
        <p className="muted">Vlastník: {owner}</p>
      </div>

      <button onClick={handleClick}>
        <FiEdit3 style={{ marginRight: 6, verticalAlign: "middle" }} />
        Upravit název
      </button>
    </header>
  );
}
