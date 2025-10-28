import { FiLogOut } from "react-icons/fi";

export default function Footer({ onLeaveList }) {
  return (
    <footer className="footer">
      {onLeaveList && (
        <button className="secondary" onClick={onLeaveList} title="Odejít ze seznamu">
          <FiLogOut style={{ marginRight: 6, verticalAlign: "middle" }} />
          Odejít ze seznamu
        </button>
      )}
    </footer>
  );
}
