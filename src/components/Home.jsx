import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPokemonList, getPokemonDetails } from "../services/pokemonApi";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [display, setDisplay] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPokemons = async (url) => {
    setLoading(true);
    const data = await getPokemonList(url);
    setNextUrl(data.next);

    const detailed = await Promise.all(
      data.results.map(async (p) => {
        const full = await getPokemonDetails(p.url);
        return {
          id: full.id,
          name: full.name,
          sprite: full.sprites.front_default,
          types: full.types.map(t => t.type.name)
        };
      })
    );

    setPokemons((prev) => [...prev, ...detailed]);
    setDisplay((prev) => [...prev, ...detailed]);
    setLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  // Buscador
  useEffect(() => {
    setDisplay(
      pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, pokemons]);

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.grid}>
        {display.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.card}
          >
            <Link to={`/pokemon/${p.id}`} style={styles.link}>
              <img src={p.sprite} alt={p.name} />
              <h3 style={styles.name}>{p.name}</h3>
              <div style={styles.types}>
                {p.types.map(t => (
                  <span key={t} style={{ ...styles.type, background: typeColor(t) }}>
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {loading && <ClipLoader size={60} />}
      {!loading && nextUrl && (
        <button style={styles.loadBtn} onClick={() => loadPokemons(nextUrl)}>
          Cargar más
        </button>
      )}
    </div>
  );
}

function typeColor(type) {
  const colors = {
    fire: "#FD7D24",
    water: "#4592C4",
    grass: "#9BCC50",
    electric: "#EED535",
    normal: "#A8A77A",
    psychic: "#F95587",
    poison: "#A33EA1",
    ground: "#E2BF65",
    rock: "#B6A136",
    bug: "#A6B91A",
  };
  return colors[type] || "#777";
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Poppins",
  },
  search: {
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  name: {
    textTransform: "capitalize",
  },
  types: {
    display: "flex",
    justifyContent: "center",
    gap: "6px",
    marginTop: "8px",
  },
  type: {
    padding: "4px 8px",
    borderRadius: "8px",
    color: "white",
    fontSize: "12px",
  },
  loadBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#ff5959",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};