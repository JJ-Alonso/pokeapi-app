import "./PokemonCard.css";

function PokemonCard({ pokemon }) {
  if (!pokemon.image) return null;

  const mainType = pokemon.types[0]; // el color base según el primer tipo

  return (
    <div className={`pokemon-card type-${mainType}`}>
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name.toUpperCase()}</h2>
      <div className="types">
        {pokemon.types.map((type) => (
          <span key={type} className={`type ${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;