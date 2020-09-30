import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <header>
            <Link to="/"><h2 className="photo-header">Photo Viewer</h2></Link>
            <Link to="/add"><i className="ri-add-line"></i></Link>
        </header>
    )
}
