import React from 'react'
import Link from 'next/link'
import { InputLabel, MenuItem, Select } from '@material-ui/core'
import Paginator from '../../components/Paginator'
 
const PostsList = ({photos, currentPage, size}) => {
    return (
        <div className='w-4/5 mx-auto my-16'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <InputLabel id="label">Size</InputLabel>
                    <Select labelId="label" id="select" value={size ? size : 'All'}>
                        <MenuItem value='All'>All</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </div>
                {(currentPage && size) ?
                    <Paginator currentPage={parseInt(currentPage)} pages={Math.floor(100/size)} /> :
                    <Paginator currentPage={1} pages={1} />
                }
            </div>
            <section className='grid grid-cols-12 gap-10'>
            {photos ?
                photos.map((el)=>{
                    return(
                        <div key={el.id} className='shadow-md w-full h-26 overflow-hidden rounded-md p-8 my-5'>
                            <Link href={'/photos/'+el.id}><a><h4>{el.title}</h4></a></Link>
                            <Link href={'/photos/'+el.id}><a><img src={el.url} /></a></Link>
                        </div>
                    )
                })
            :
                <h4>No Result Found</h4>
            }
            </section>
            <div className='flex justify-between items-center mt-5'>
                <div>
                    <InputLabel id="label">Size</InputLabel>
                    <Select labelId="label" id="select" value={size ? size : 'All'}>
                        <MenuItem value='All'>All</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </div>
                {(currentPage && size) ?
                    <Paginator currentPage={parseInt(currentPage)} pages={Math.floor(100/size)} /> :
                    <Paginator currentPage={1} pages={1} />
                }
            </div>
        </div>
    )

}

export async function getServerSideProps({query}){
    let tempQuery = '';

    if(query.page){
        tempQuery+='?_page='+query.page
    }

    if(query.limit){
        tempQuery+='&_limit='+query.limit
    }

    let photos = await fetch('https://jsonplaceholder.typicode.com/photos'+tempQuery)
    photos = await photos.json()

    if(!photos){
        return{
            notFound: true
        }
    }
    return{
        props: {
            photos: photos,
            ...(query.page ? {currentPage: query.page} : {}),
            ...(query.limit ? {size: query.limit} : {}),
        }
    }

}

export default PostsList