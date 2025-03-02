import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/pages/login.jsx";
import Register from "./components/pages/Register.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import { Container } from "@mui/material";
import EmployeeForm from "./components/EmployeeForm.jsx";
import ViewEmployee from "./components/pages/ViewEmployee.jsx";
import UpdateEmployee from "./components/pages/UpdateEmployee.jsx";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/add-employee" element={user ? <EmployeeForm /> : <Navigate to="/login" />}></Route>
          <Route path="/employee/:id" element={user ? <ViewEmployee /> : <Navigate to="/login" />} />
          <Route path="/employee/update/:id" element={user ? <UpdateEmployee /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
