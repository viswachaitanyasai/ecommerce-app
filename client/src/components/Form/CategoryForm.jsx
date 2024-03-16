import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
            <div>
                <input type='text' placeholder='Enter new Category' value={value} onChange={(e) => setValue(e.target.value)}/>
            </div>
            <button type='submit'>Submit</button>
        </form>
    </>
  )
}

export default CategoryForm