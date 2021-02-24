import React from 'react'
import Link from 'next/link'
import { InputLabel, MenuItem, Select } from '@material-ui/core'
import Paginator from '../../components/Paginator'
 
const PostsList = ({users}) => {
    return (
        <div className='w-4/5 mx-auto my-16'>
            <h5>Users</h5>
            {users ?
                users.map((el)=>{
                    return(
                        <div key={el.id} className='shadow-md w-full h-26 overflow-hidden rounded-md p-8 my-5'>
                            <div className='flex justify-between items-end'>
                                <Link href={'/users/'+el.id}><a><h5>{el.username}</h5></a></Link>
                                <h6>{el.email}</h6>
                            </div>
                            <Link href={'/users/'+el.id}><a>
                                <div className='overflow-ellipsis overflow-hidden'>{el.name}</div>
                            </a></Link>
                        </div>
                    )
                })
            :
                <h4>No Result Found</h4>
            }
        </div>
    )

}

export async function getServerSideProps(){

    let users = await fetch('https://jsonplaceholder.typicode.com/users')
    users = await users.json()

    if(!users){
        return{
            notFound: true
        }
    }
    return{
        props: {
            users: users
        }
    }

}

export default PostsList