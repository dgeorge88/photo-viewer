import React, { useState, useContext } from 'react'
import PropTypes from "prop-types"
import { Context } from "../context/AppContext"
import useHover from "../hooks/useHover"

const Image = (props) => {

    Image.propTypes = {
        className: PropTypes.string,
        img: PropTypes.shape({
            id: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            tag: PropTypes.string.isRequired,
            isfavorite: PropTypes.bool
        })
    }

    const [hover, ref] = useHover()
    const context = useContext(Context)

    const displayFavorite = props.img.isfavorite === true ? "ri-heart-fill" : "ri-heart-add-line"

    const displayFav = hover &&
        <i
            className={`${displayFavorite} favorite`}
            onClick={() => context.toggleFavorite(props.img.id)}
        >
        </i>

const [trash, setTrash] = useState("ri-delete-bin-line")

    const displayBin = hover && 
    <i className={`${trash} trash`}
        onClick={() => {setTrash("ri-delete-bin-fill"); context.deletePhoto(props.img.id)} }
    ></i>

    return (
        <div className={`${props.className} image-container`} ref={ref}>
            <img src={props.img.url} alt={props.img.description} className="image-grid" tag={props.img.tag}/>
            {displayFav}
            {displayBin}
        </div>
    )
}

export default Image
