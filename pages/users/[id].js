import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
 
const User = ({user, posts, albums, photos}) => {
    let router = useRouter()
    let {id} = router.query

    const handleRedirect = (e) => {
        e.preventDefault()
        router.push({
            pathname: '/users'
        })
    }

    return (
        <div className='w-4/5 mx-auto'>
            <div className='mt-10'>
                <a className='cursor-pointer' onClick={handleRedirect}>users</a><span>{' / '+id}</span>
            </div>
            <section className='border-b-2 border-secondary pb-5 mt-10'>
                <div className='flex justify-between items-end'>
                    <h4 className='font-semibold'>{user.name}</h4>
                    <h5>{user.email}</h5>
                </div>
                <a href='#'><h6 className='text-right text-lg'>{user.website}</h6></a>
                <h5><span>username:</span> {user.username}</h5>
                <h5><span>phone:</span> {user.phone}</h5>
            </section>
            <section className='border-b-2 border-secondary grid grid-cols-2 gap-10 py-10'>
                <div style={{height: 'fit-content'}}>
                    <h5>Address</h5>
                    <div className='text-lg'>
                        {user.address.city}, {user.address.zipcode}, {user.address.street}, {user.address.suite}
                    </div>
                </div>
                <div style={{height: 'fit-content'}}>
                    <h5>Works At</h5>
                    <h6 className='text-2xl font-semibold'>{user.company.name}</h6>
                    <div>"{user.company.bs}"</div>
                    <div className='text-lg'>{user.company.catchPhrase}</div>
                </div>
            </section>
            {posts.length &&
                <section className='border-b-2 border-secondary py-10'>
                    <h5 className='mb-5'>Posts</h5>
                    <div className='grid grid-cols-2 gap-5'>
                    {posts.map((el)=>{
                        return (
                            <div key={el.id} className='shadow-md w-full h-26 overflow-hidden rounded-md p-6'>
                                <Link href={'/posts/'+ el.id}><a className='font-semibold'>{el.title}</a></Link>
                                <div className='whitespace-nowrap overflow-hidden overflow-ellipsis'>{el.body}</div>
                            </div>
                        )
                    })}
                    </div>
                </section>
            }
            {albums.length && 
                <section className='border-b-2 border-secondary py-10'>
                    <h5>Albums</h5>
                    <div className='grid grid-cols-2 gap-10'>
                    {albums.map((album, index)=>{
                        return(
                            <div>
                                <div className='my-5 text-xl font-semibold'>{album.title}</div>
                                <div className='grid grid-cols-10 gap-5'>
                                {photos &&
                                    photos.filter((photo)=>photo.albumId===album.id).map((el)=>{
                                        return(
                                            <div style={{width: '40px', height: '40px'}}>
                                                <Link href={'/photos/'+el.id}><a>
                                                    <img className='h-full w-full' src={el.url} />
                                                </a></Link>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </section>
            }
        </div>
    )

}

User.getInitialProps = async ({query}) => {

    let user = await fetch('https://jsonplaceholder.typicode.com/users/'+query.id)
    user = await user.json()

    let posts = await fetch('https://jsonplaceholder.typicode.com/posts?userId='+query.id)
    posts = await posts.json()

    let albums = await fetch('https://jsonplaceholder.typicode.com/albums?userId='+query.id)
    albums = await albums.json()

    let photoQuery = '?'

    for(let i = 0; i<albums.length; i++){
        photoQuery += 'albumId=' + albums[i].id
        if(i+1!==albums.length){
            photoQuery += '&'
        }
       
    }

    let photos = await fetch('https://jsonplaceholder.typicode.com/photos'+photoQuery)
    photos = await photos.json()

    return{
        user,
        posts,
        albums,
        photos
    }

}

export default User