import Head from 'next/head'
import SliderContainer from '../components/Slider'

export default function Home({posts, photos}) {
    debugger
    return (
        <div>
            <Head>
                <title>Rocket Test App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main style={{height: 'fit-content'}} className='w-4/5 mx-auto mt-10 grid grid-cols-2 gap-10'>
                <div>
                    <h5 className='my-2'>Posts</h5>
                    <SliderContainer objects={posts} className='p-10' onlyPhoto={false} name='posts' period={3} afterClickPeriod={5}/>
                </div>
                <div className=''>
                    <h5 className='my-2'>Photos</h5>
                    <SliderContainer objects={photos} className='' onlyPhoto={true} name='photos' period={3} afterClickPeriod={5}/>
                </div>
            </main>

        </div>
    )
}

Home.getInitialProps = async () => {

    let data = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    let posts = await data.json()

    data = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=5')
    let photos = await data.json()

    return {
        posts,
        photos
    }

}
