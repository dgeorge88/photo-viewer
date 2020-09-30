import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Context = React.createContext()

const ContextProvider = (props) => {

    const [getImages, setImages] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/photos/", config)
            const data = await res.data
            setImages(data.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const toggleFavorite = async (id) => {

        try {
            const updatedPhotos = getImages.map(photo => {
                if (photo.id === id) {
                    return {
                        ...photo,
                        isfavorite: !photo.isfavorite
                    }
                }
                return photo
            })
            setImages(updatedPhotos)
            await axios.put(`/api/photo/update/${id}`, config)

        } catch (error) {
            console.log(error)
        }

    }

    // Delete Photo
    const deletePhoto = async (id) => {

        try {
            setImages(prevImages => prevImages.filter(image => image.id !== id))
            await axios.delete(`/api/photo/delete/${id}`)

        } catch (error) {
            console.log(error)
        }
    }

    const addPhoto = async (photo) => {
        try {
            
            await axios.post(`/api/photos/add`, photo, config)
            await fetchData()  
            
        } catch (error) {
            console.log(error.message)
        }
    }



    return (
        <Context.Provider value={{ getImages, toggleFavorite, deletePhoto, addPhoto }}>
            {props.children}
        </Context.Provider >
    )

}

export { ContextProvider, Context }