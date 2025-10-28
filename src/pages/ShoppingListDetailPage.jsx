import { useMemo, useState } from "react";
import ListHeader from "../components/ListHeader";
import Tabs from "../components/Tabs";
import ItemList from "../components/ItemList";
import MemberList from "../components/MemberList";
import Footer from "../components/Footer";

// Simulace přihlášeného uživatele 
const currentUser = "Jana";

// "Initial data v konstantě"
const initialList = {
  id: 1,
  name: "Víkendový nákup",
  owner: "Jana",
  members: ["Jana", "Petr", "Emma"],
  items: [
    { id: 1, name: "Mléko", resolved: true },
    { id: 2, name: "Máslo", resolved: false }
  ]
};

export default function ShoppingListDetailPage() {
  const [list, setList] = useState(initialList);
  const [activeTab, setActiveTab] = useState("items"); // "items" | "members"
  const [filter, setFilter] = useState("active");      // "active" | "bought" | "all"

  const isOwner = useMemo(() => currentUser === list.owner, [list.owner]);

  // ====== business logika ======

  // 1) přejmenování seznamu (jen vlastník)
  const handleRename = (newName) => {
    if (!isOwner) return;
    if (!newName?.trim()) return;
    setList(prev => ({ ...prev, name: newName.trim() }));
  };

  // 2) položky: přidat / smazat / přepnout "hotovo"
  const addItem = (name) => {
    const value = (name ?? "").trim();
    if (!value) return;
    const id = Date.now();
    setList(prev => ({ ...prev, items: [...prev.items, { id, name: value, resolved: false }] }));
  };

  const deleteItem = (id) => {
    setList(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }));
  };

  const toggleResolved = (id) => {
    setList(prev => ({
      ...prev,
      items: prev.items.map(i => (i.id === id ? { ...i, resolved: !i.resolved } : i))
    }));
  };

  // 3) filtrace položek
  const filteredItems = useMemo(() => {
    if (filter === "active") return list.items.filter(i => !i.resolved);
    if (filter === "bought") return list.items.filter(i => i.resolved);
    return list.items;
  }, [list.items, filter]);

  // 4) členové: přidat / odebrat (jen vlastník)
  const addMember = (name) => {
    if (!isOwner) return;
    const value = (name ?? "").trim();
    if (!value || list.members.includes(value)) return;
    setList(prev => ({ ...prev, members: [...prev.members, value] }));
  };

  const removeMember = (name) => {
    if (!isOwner) return;
    if (name === list.owner) return; // vlastníka nelze odebrat
    setList(prev => ({ ...prev, members: prev.members.filter(m => m !== name) }));
  };

  // 5) "odejít ze seznamu" (člen)
  const leaveList = () => {
    if (isOwner) return; // vlastník neodchází 
    if (!list.members.includes(currentUser)) return;
    setList(prev => ({ ...prev, members: prev.members.filter(m => m !== currentUser) }));
    alert("Odešel(a) jsi ze seznamu.");
  };

  return (
    <div className="container">
      <ListHeader
        name={list.name}
        owner={list.owner}
        canRename={isOwner}
        onRename={handleRename}
      />

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "items" ? (
        <ItemList
          items={filteredItems}
          rawItems={list.items}           // kvůli počtům 
          filter={filter}
          onFilterChange={setFilter}
          onAddItem={addItem}
          onDeleteItem={deleteItem}
          onToggleResolved={toggleResolved}
        />
      ) : (
        <MemberList
          members={list.members}
          owner={list.owner}
          canManage={isOwner}
          onRemoveMember={removeMember}
          onAddMember={addMember}
        />
      )}

      <Footer onLeaveList={!isOwner ? leaveList : undefined} />
    </div>
  );
}
