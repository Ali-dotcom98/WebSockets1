import React from 'react'

const SideBar = ({Users , CurrentId}) => {
  return (
    <div className='flex flex-col px-5 py-3 space-y-3'>
        
        {
            Users.map((item)=>{
                return <div className={`border p-2 ${CurrentId == item  ? "bg-gray-200" : ''}`}>{item}</div>
            })
        }
    </div>
  )
}

export default SideBar