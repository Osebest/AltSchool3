import React from 'react'

export const Pagination = ({postsPerPage, totalPosts, paginate, data, setContent}) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
    pageNumbers.push(i);
  }

  return (
    <nav className='container d-flex justify-content-center mt-2'>
      <ul className="pagination">
        {pageNumbers.map(number=>(
          <li key={number} className="page-item">
            <button 
            onClick={(e)=> paginate(number, data, setContent)}
            className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
