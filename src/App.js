import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Home from "./components/Home.jsx";
import PokemonPage from "./components/PokemonPage";

export default function App() {
  return (
    <>
      <header style={styles.header}>
        <Link to="/" style={styles.homeLink}>
          <FaHome size={24} />
        </Link>
        <h1 style={styles.title}>Pokédex Mejorada</h1>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
      </Routes>
    </>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    background: "linear-gradient(90deg, #ff5959, #ffcc00)",
    color: "white",
    fontFamily: "Poppins",
  },
  homeLink: {
    color: "white",
    textDecoration: "none",
  },
  title: {
    margin: 0,
  },
};