import React, { useState, useEffect } from 'react'
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import axios from 'axios'


function App() {
  // store our list of pokemon
  const [pokemon, setPokemon] = useState([])

  // store our current Page and initialize it to the first page of the pokemon API
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")

  // store next and current pages, initialized to nothing... we'll grab them soon
  const [nextPageUrl, setNextPageUrl] = useState()
  const [previousPageUrl, setPreviousPageUrl] = useState()

  // store a boolean to display something while awaiting the axios response.
  // by default, our application is always loading
  const [loading, setLoading] = useState(true)
 
  // useEffect lets us run the effect every time we re-render the page, or just sometimes based on the props we pass it
  useEffect(() => {
    // every time we make a request, we want loading to be true
    setLoading(true)

    // axios lets us pass a second argument which is the options we want to pass to .get()
    // has a CancelToken that takes an object (new axious.CancelToken)
    // CancelToken takes a function and returns the cancel token that we need to cancel request
    // every time axios makes this request, it will set our cancel variable to the new cancel token
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(result => {
      // now we know we have all of our data and we're no longer loading anything, set it to false
      setLoading(false)

      // result.data has next and previous properties
      setNextPageUrl(result.data.next)
      setPreviousPageUrl(result.data.previous)

      // mapping over result.data to pull out the name (it has name and url to the specific pokemon)
      setPokemon(result.data.results.map(p => p.name))
    })

    // useEffect allows us to return a function that gets called every time useEffect gets called again
    // we set our cancel variable to the cancelToken function, so we can call cancel as a function
    // makes sure that the application never loads old data in the event that an old request finishes
    // before a new request
    return () => cancel()

  }, [currentPageUrl]) // every time currentPageUrl changes, it re-runs our effect (get request to currentPageUrl)

  // changing the currentPageUrl, triggering useEffect
  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPreviousPage() {
    setCurrentPageUrl(previousPageUrl)
  }

  // check if loading is true, and display something on the page.
  if (loading) return "Loading..."

  

  return (
    <div>
    
    <PokemonList pokemon={pokemon}/>
    {/* ternary operator to determine whether to pass a gotoNext/PreviousPage prop
          check Pagination.jsx for why this is important */}
    <Pagination 
      goToNextPage={nextPageUrl ? goToNextPage : null} 
      goToPreviousPage={previousPageUrl ? goToPreviousPage : null}
    />
    </div>
  )
}

export default App
