import axios from "axios";

export const getPokemonList = async (url = "https://pokeapi.co/api/v2/pokemon?limit=20") => {
  const response = await axios.get(url);
  return response.data;
};

export const getPokemonDetails = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const getPokemonById = async (id) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.data;
};
