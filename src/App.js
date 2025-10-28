import { Routes, Route, Navigate } from "react-router-dom";
import ShoppingListDetailPage from "./pages/ShoppingListDetailPage";

export default function App() {
  return (
    <Routes>
      {/* detail seznamu */}
      <Route path="/lists/:id" element={<ShoppingListDetailPage />} />
      {/* /lists/1 */}
      <Route path="*" element={<Navigate to="/lists/1" replace />} />
    </Routes>
  );
}
