export default function Tabs({ activeTab, onTabChange }) {
  return (
    <div className="tabs">
      <button
        className={activeTab === "items" ? "tab active" : "tab"}
        onClick={() => onTabChange("items")}
      >
        Položky
      </button>
      <button
        className={activeTab === "members" ? "tab active" : "tab"}
        onClick={() => onTabChange("members")}
      >
        Členové
      </button>
    </div>
  );
}
