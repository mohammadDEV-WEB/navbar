import React from "react";
import Index from "./layout/admin/Index";
import AuthLogin from "./layout/auth/AuthLogin";
import { useLocation } from "react-router";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname.includes("/auth") ? <AuthLogin /> : <Index />}
    </div>
  );
}

export default App;
