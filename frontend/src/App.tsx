import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRouter from "./routes/UserRouter";
import AdminRouter from "./routes/AdminRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
