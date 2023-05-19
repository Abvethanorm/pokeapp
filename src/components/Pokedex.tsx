import { useState, useEffect } from "react";
import axios from "axios";


function Pokedex(){
    const [data, setData] = useState([])
    const [abilities, setAbilities] = useState([])
    const [pokemonName, setPokemonName] = useState("")
    const [isLoading, setIsLoading]= useState(false)
   

    useEffect(() => {
        async function getPokemon() {
          if (pokemonName !== "") {
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
            );
            setData(response.data);
            setAbilities(response.data.moves.map(move => move.move.name));
          
          }
          
        }
        getPokemon();
      }, [pokemonName]);
const handleClick = ()=>{
    setData([]);
    setIsLoading(true)
    setPokemonName(pokemonName.toLocaleLowerCase());

}

return(
    <div>
        <h1>This is your Pokedex</h1>
        <h3>What Pokemon are you looking for?</h3>
    <input 
        type="text"
        value={pokemonName}
        onChange={e =>setPokemonName(e.target.value)}
        />
        <button onClick={handleClick}>Search</button>
    
    <h1>{data.name}</h1>

      <h3>Moves</h3>
      <ul>
        {abilities.map(moveName=>(<li key={moveName}>{moveName}</li>))}
        
       </ul>
        
    </div>
        
)
}

export default Pokedex