import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form className='flex flex-row justify-center items-center' onSubmit={handleSubmit}>
        <input className='p-2 w-64 h-12 border-2 rounded-lg' type='text' placeholder='Enter new Category' value={value} onChange={(e) => setValue(e.target.value)} />
        <button className='py-2 px-3 m-3 rounded-lg border-2 bg-slate-500 text-slate-200' type='submit'>Submit</button>
      </form>
    </>
  )
}

export default CategoryForm