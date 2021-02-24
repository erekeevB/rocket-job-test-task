import React from 'react'
import { Arrow } from '../assets/Icons'

const Paginator = ({currentPage, pages, onPageClick}) => {
    debugger
    let s = ''
    let tempPage;

    if(currentPage<3){
        tempPage = 1
    }else if(currentPage>pages-3){
        tempPage = pages-4
    }else{
        tempPage = currentPage-2
    }

    return (
        <div className='flex space-x-5'>
            <button
                onClick={()=>onPageClick(currentPage-1)}
                className='paginator-arrow w-10 h-10 bg-button flex items-center justify-center rounded-md disabled:bg-transparent'
                disabled={currentPage===1}
            ><Arrow className='text-secondary'/></button>
            <div className='flex space-x-0.5'>
            {pages < 5 ? 
                [...Array(pages)].map((_, index)=>{
                    return(
                        <button
                            key={index}
                            className={'w-10 h-10 rounded-md border-2 flex items-center justify-center ' + 
                                (currentPage === index+1 ? 
                                    'border-accent text-accent' : 
                                    'border-button text-secondary hover:bg-button hover:text-accent ')}
                            disabled={currentPage === index+1}
                            onClick={()=>onPageClick(index+1)}
                        >
                            {index+1}
                        </button>
                    )
                })
            :
                [...Array(5)].map((_, index)=>{
                    return(
                        <button
                            key={index}
                            className={'w-10 h-10 rounded-md border-2 flex items-center justify-center ' + 
                                (currentPage === index+1 ? 
                                    'border-accent text-accent' : 
                                    'border-button text-secondary hover:bg-button hover:text-accent')}
                            disabled={currentPage === index + tempPage}
                            onClick={()=>onPageClick(index + tempPage)}
                        >
                            {index + tempPage}
                        </button>
                    )
                })
            }
            </div>
            <button 
                onClick={()=>onPageClick(currentPage+1)} 
                className='paginator-arrow w-10 h-10 bg-button flex items-center justify-center rounded-md disabled:bg-transparent'
                disabled={currentPage===pages}
            ><Arrow className='transform rotate-180 text-secondary' /></button>
        </div>
    )
}

export default Paginator