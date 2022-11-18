import React from 'react'

// destructuring props to pass to PokemonList
export default function PokemonList({ pokemon }) {

  return (
    // map over pokemon array, return a div that contains the name with a unique key 
    <div>
        {pokemon.map(p => (
            <div key={p}>{p}</div>
        ))}
    </div>
  )
}
