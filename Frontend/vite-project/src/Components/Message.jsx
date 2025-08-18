import React from 'react'
import { useEffect } from 'react'

const Message = ({UserInfo , CurrentId, Join}) => {



    return (
        <div className="h-[85vh] bg-slate-50 px-5 py-3 overflow-y-scroll">
            <div className='w-full flex items-center justify-center text-gray-950 text-xs'>{Join}</div>
            {UserInfo.message.slice(1).map((msg, index) => (
                <div key={index} className={`p-1 border-b flex items-center gap-2 `}>
                    {
                        msg.id == CurrentId ?
                        <>
                            <div className='flex items-center justify-end  w-full gap-2'>
                                <div className="text-sm flex flex-col">
                                    <span>{msg.text}</span>
                                </div>
                                <div className={`bg-red-200  text-end size-10 rounded-full `}></div>
                            </div>
                        </>
                        :
                        <>
                            <div className='flex items-center justify-start  w-full gap-2'>
                                <div className={`bg-green-200  text-end size-10 rounded-full `}></div>

                                <div className="text-sm flex flex-col">
                                    <span>{msg.text}</span>
                                </div>
                            </div>
                        </>
                    }
                </div>
                ))}
        </div>  
    )
}

export default Message