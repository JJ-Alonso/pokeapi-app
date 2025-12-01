import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonById } from "../services/pokemonApi";
import { motion } from "framer-motion";

export default function PokemonPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonById(id);
      setPokemon(data);
    };
    fetchData();
  }, [id]);

  if (!pokemon) return <h2>Cargando...</h2>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <h1 style={styles.title}>{pokemon.name}</h1>

      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        style={{ width: "200px" }}
      />

      <h3>Tipos:</h3>
      <ul>
        {pokemon.types.map((t) => (
          <li key={t.type.name}>{t.type.name}</li>
        ))}
      </ul>

      <Link to="/" style={styles.back}>
        Volver
      </Link>
    </motion.div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    fontFamily: "Poppins",
  },
  title: {
    textTransform: "capitalize",
  },
  back: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    background: "#ff5959",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
  },
};