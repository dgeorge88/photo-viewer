import React, { useContext, useEffect, useState } from 'react'
import  Image  from '../components/Image'
import { Context } from "../context/AppContext"

const getClass = (i) => {
    if( i > 2){

        if (i % 3 === 0) {
            return 'big';
        }
        else if (i % 2 === 0) {
            return 'wide'
        }
         return "thumb"
    }
    return "big"
}



const Photos = () => {
    const {getImages} = useContext(Context)
    
    const [tag, setTag] = useState([])

    let clickedTag = ""
    
       useEffect(() => {
        const data = getImages.map(image => image)
        setTag(data)
    }, [getImages])

    const handleTagClick = (e) => {
        clickedTag = e.target.id
        if(clickedTag === "all"){ 
            setTag(getImages.map(image => image))
        }else {
            setTag(getImages.filter(image => image.tag === clickedTag))
        }
    }

    const TagHeader = (
            <div className="tag-header">
                <h1 id="all" onClick={handleTagClick}>#All</h1>
                <h1 id="other" onClick={handleTagClick}>#Other</h1>
                <h1 id="nature" onClick={handleTagClick}>#Nature</h1>
                <h1 id="city" onClick={handleTagClick}>#City</h1>
            </div>
        )

    return (
        <>
        {TagHeader}
        <main className="photos">
            {/* {
            getImages !== null ? getImages.map((img, i) => (
                < Image key={img.id} img={img} className={getClass(i)} />
                )) 
                : 
                (<h1>Loading...</h1>)
            } */}

            {tag !== null ? tag.map((img, i) => (< Image key={img.id} img={img} className={getClass(i)} />)) : (<h1>Loading...</h1>)}
        </main>
        </>
    )
}

export default Photos
