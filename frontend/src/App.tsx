// Hooks
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// CSS
import "./assets/css/App.css";

import { Route, Routes } from "react-router-dom";
import { Home, Game } from "./pages";
import { AuthContext } from "./../context/AuthContext";
import { useEffect, useState } from "react";
import { User } from "./types/User";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      setUser(JSON.parse(existingUser));
    } else {
      setUser(null);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <SpeedInsights />
      <Analytics />
      <Toaster />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/signin" Component={Login} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/:roomId" Component={Game} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
