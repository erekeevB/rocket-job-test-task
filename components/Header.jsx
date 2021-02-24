import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <header className='bg-white w-full border-b-2'>
            <div className='flex justify-between w-4/5 mx-auto py-5'>
                <h5 className='align-middle'><Link href='/'><a className='text-black'>Rocket Test</a></Link></h5>
                <div className='flex items-center space-x-10'>
                    <Link href='/users'>
                        <a className='align-middle text-black'>Users</a>
                    </Link>
                    <Link href='/posts'>
                        <a className='align-middle text-black'>Posts</a>
                    </Link>
                    <Link href='/albums'>
                        <a className='align-middle text-black'>Albums</a>
                    </Link>
                    <Link href='/albums'>
                        <a className='align-middle text-black'>Photos</a>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export const getServerSideProps = () => {



}

export default Header