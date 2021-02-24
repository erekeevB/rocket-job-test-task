import React from 'react'
import {useRouter} from 'next/router'
 
const User = ({post, comments}) => {
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
                <a onClick={handleRedirect}>posts</a><span>{' / '+id}</span>
            </div>
            <section className='border-b-2 border-accent pb-5'>
                <h2>{post.title}</h2>
                <p className='my-5'>{post.body}</p>
            </section>
            {comments.length &&
                <section className='my-10'>
                    <h5 className='mb-5'>Comments</h5>
                    <div className='grid grid-cols-2 gap-10'>
                    {comments.map((el)=>{
                        return (
                            <div key={el.id} className='p-5 border-black rounded-md border-2'>
                                <div className='mb-5 flex justify-between'>
                                    <div className='font-semibold'>{el.name}</div>
                                    <div>{el.email}</div>
                                </div>
                                <div>{el.body}</div>
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

    let post = await fetch('https://jsonplaceholder.typicode.com/users/'+query.id)
    post = await post.json()

    let comments = await fetch('https://jsonplaceholder.typicode.com/albums?postId='+query.id)
    comments = await comments.json()

    return{
        post,
        comments
    }

}

export default User