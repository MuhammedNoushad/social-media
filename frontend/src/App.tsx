import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRouter from "./routes/UserRouter";
import AdminRouter from "./routes/AdminRouter";
import HandleInvalidTokenComponent from "./components/common/HandleInvalidTokenComponent";

function App() {
  return (
    <Router>
      <HandleInvalidTokenComponent />
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
