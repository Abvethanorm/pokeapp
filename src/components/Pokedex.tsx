import { useState, useEffect } from "react";
import axios from "axios";

interface Move {
  name: string;
  url: string;
}

interface PokemonData {
  name: string;
  moves: Move[];
}

function Pokedex() {
  const [pokemon, setPokemon] = useState<PokemonData>({
    name: "",
    moves: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshCountdown, setRefreshCountdown] = useState(5);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      if (!response.data) {
        setLoading(false);
        setError("Sorry Buddy No Pokemon Found");
        startRefreshCountdown();
      } else {
        setPokemon({ name: response.data.name, moves: response.data.moves });
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      startRefreshCountdown();
    }
  };

  useEffect(() => {
    if (refreshCountdown > 0) {
      const timer = setInterval(() => {
        setRefreshCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else {
      setPokemon({ name: "", moves: [] }); 
      setError(""); 
    }
  }, [refreshCountdown]);

  const startRefreshCountdown = () => {
    setRefreshCountdown(5);
  };

  if (loading) return <div>Loading...</div>;
  else if (error)
    return (
      <div>
        <h1>{error}</h1>
        <h2>Refreshing in {refreshCountdown} seconds...</h2>
      </div>
    );
  else
    return (
      <div>
        <h1>This is your Pokedex</h1>
        <h3>What Pokemon are you looking for?</h3>
        <input
          type="text"
          value={pokemon.name}
          onChange={(e) => setPokemon({ ...pokemon, name: e.target.value })}
        />
        <button onClick={fetchPokemon}>Search</button>

        <h1>{pokemon.name ? pokemon.name : "Waiting for Pokemon"}</h1>

        <h3>Moves</h3>
        <ul>
          {pokemon.moves.map((move) => (
            <li key={move.name}>{move.name}</li>
          ))}
        </ul>
      </div>
        
)
}

export default Pokedex