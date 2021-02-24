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

            <main className='w-4/5 mx-auto mt-10'>
                <h5 className='my-2'>Posts</h5>
                <SliderContainer objects={posts} name='posts' period={1} afterClickPeriod={5}/>
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
