import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {Down} from './../assets/Icons'

const SliderElem = ({
    className,
    id,
    url,
    title,
    body,
    name,
    onlyPhoto
    }) => {

    return(

        <Link href={'/'+name+'/'+id}><a>
            <div className={'w-full h-full '+className}>
                {(title && !onlyPhoto) ? <h3 className='mb-5'>{title}</h3> : null}
                {url && <img className='w-full top-0 left-0' src={url}/>}
                {(body && !onlyPhoto) ? <div className='text-black text-lg'>{body}</div> : null}
            </div>
        </a></Link>

    )

}

const SliderContainer = ({objects, name, period, afterClickPeriod, onlyPhoto, className}) => {

    let [currEl, setCurrEl] = useState(0)

    let [isTouched, setIsTouched] = useState(false)

    let [intervalId, setIntervalId] = useState()

    let periodRef = useRef();

    periodRef.current = [period, afterClickPeriod]

    useEffect(()=>{
        if(!isTouched){
            setIntervalId(setInterval(() => {
                setNext()
            }, periodRef.current[0] * 1000))
        }else{
            clearInterval(intervalId)
            setTimeout(()=>{
                setIsTouched(false)
            }, periodRef.current[1] * 1000)
        }
    }, [isTouched])

    const setPrev = () => {
        setCurrEl(currEl => {
            if(currEl === 0){
                return objects.length - 1
            }else{
                return currEl - 1
            }
        })
    }

    const setNext = () => {
        setCurrEl(currEl => {
            if(currEl === objects.length - 1){
                return 0
            }else{
                return currEl + 1
            }
        })
    }

    const handleLeftButton = () => {
        setIsTouched(true)
        clearInterval(intervalId)
        setPrev()
    }

    const handleRightButton = () => {
        setIsTouched(true)
        clearInterval(intervalId)
        setNext()
    }

    return (
        <div className={'relative w-full my-8 border-2 border-secondary rounded-md'}>
            <button 
                className='absolute w-24 h-full -left-0 opacity-0 hover:opacity-75'
                onClick={handleLeftButton}>
                <Down className='w-24 y-24 transform rotate-90 text-black'/>
            </button>
            <button 
                className='absolute w-24 h-full -right-0 opacity-0 hover:opacity-100'
                onClick={handleRightButton}>
                <Down className='w-24 y-24 transform -rotate-90 text-black'/>
            </button>
            <div className='w-min absolute flex space-x-1.5 inset-x-1/2 bottom-4 transform -translate-x-1/2'>
                {objects.map((_, index)=>{
                    return(
                        <button
                            key={index}
                            onClick={()=>{
                                setCurrEl(index)
                                setIsTouched(true)
                            }} 
                            className={'focus:outline-none p-2 border-2 rounded-sm ' + 
                                (currEl===index ? 'border-accent' : 'border-secondary')}
                        ></button>
                    )
                })}
            </div>
            <SliderElem onlyPhoto={onlyPhoto} {...objects[currEl]} name={name} className={className}/>
        </div>
    )

}

export default SliderContainer