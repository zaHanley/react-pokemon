import React from 'react'

export default function Pagination({ goToNextPage, goToPreviousPage }) {
  return (
    <div>
        {/* if there is no previous or next page (the prop is not passed in), 
            it will not evaluate the next condition. In this case, it will not render 
            a previous or next button... */}
        {goToPreviousPage && <button onClick={goToPreviousPage}>Previous</button> }
        {goToNextPage && <button onClick={goToNextPage}>Next</button> }
    </div>
  )
}
