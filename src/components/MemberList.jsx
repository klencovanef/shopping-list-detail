import { useState } from "react";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";

export default function MemberList({
  members,
  owner,
  canManage,
  onRemoveMember,
  onAddMember
}) {
  const [value, setValue] = useState("");

  const ownerFirst = [owner, ...members.filter((m) => m !== owner)];

  const submit = (e) => {
    e.preventDefault();
    if (!canManage) return;
    onAddMember(value);
    setValue("");
  };

  return (
    <section className="card">
      <ul className="list">
        {ownerFirst.map((m) => (
          <li key={m} className="list-row">
            <span>
              {m} {m === owner ? "(vlastník)" : "(člen)"}
            </span>
            {canManage && m !== owner && (
              <button
                className="danger"
                onClick={() => onRemoveMember(m)}
                title="Odebrat člena"
              >
                <FiUserMinus
                  style={{ marginRight: 4, verticalAlign: "middle" }}
                />
                Odebrat
              </button>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="row">
        <input
          placeholder="Jméno nebo e-mail člena…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!canManage}
        />
        <button type="submit" disabled={!canManage} title="Přidat nového člena">
          <FiUserPlus
            style={{ marginRight: 4, verticalAlign: "middle" }}
          />
          Přidat člena
        </button>
      </form>

      {!canManage && (
        <div className="muted">Členové nemohou spravovat ostatní členy.</div>
      )}
    </section>
  );
}
