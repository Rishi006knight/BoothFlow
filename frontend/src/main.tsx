import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Voters from "./pages/Voters";
import Elections from "./pages/Elections";
import Candidates from "./pages/Candidates";
import Results from "./pages/Results";
import States from "./pages/States";
import Vote from "./pages/Vote";
import Admin from "./pages/Admin";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/voters" element={<Voters />} />
            <Route path="/elections" element={<Elections />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/results" element={<Results />} />
            <Route path="/states" element={<States />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/admin" element={<Admin />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
