import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async () => {
    if (!nextUrl) return;
    setLoading(true);
    const res = await fetch(nextUrl);
    const data = await res.json();

    // Guardar la siguiente URL (para la siguiente página)
    setNextUrl(data.next);

    // Obtener los detalles de cada Pokémon
    const detailedData = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          types: details.types.map((t) => t.type.name),
        };
      })
    );

    // Añadirlos a los anteriores
    setPokemons((prev) => [...prev, ...detailedData]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <h1>Pokédex</h1>
      <p className="subtitle">“Explora el mundo Pokémon con estilo neón”</p>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {nextUrl && (
        <button onClick={fetchPokemons} disabled={loading}>
          {loading ? "Cargando..." : "Cargar más"}
        </button>
      )}
    </div>
  );
}

export default App;
