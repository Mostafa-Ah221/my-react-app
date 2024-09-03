import React from 'react'

function Search ({search,setSearch}) {


  return (<>
  <div className='flex justify-center items-center'>

            <input
            className='w-3/4 border mt-16 p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 '
        type="text"
        placeholder="Search products by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />
  </div>
     </>
    

  )
}

export default Search