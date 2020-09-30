import React, {useContext} from 'react'
import {useForm} from "react-hook-form"
import { Context } from "../context/AppContext"

export const AddPhoto = () => {

    const {addPhoto} = useContext(Context)

    const {register, handleSubmit, errors} = useForm()


    const onSubmit = (data, e) => {
        addPhoto(data)
        e.target.reset()
    }


    return (
        <div className="form-container">
            <h1>Add A Photo</h1>
            <p>Simply enter the URL of a Photo you would like to add to library and click Submit.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="url" name="url" placeholder="Enter Picture URL" ref={register({ required: true, minLength: 12 })}></input>
                <br/>
                {errors.url && <span style={{"color":"red"}}>You must enter a Photo URL.</span>}
                <br/>

                <input type="text" name="description" placeholder="Enter Picture Description" ref={register({ required: true, minLength: 4, maxLength: 24 })}></input>
                <br/>
                {errors.description && <span style={{"color":"red"}}>You must enter a Photo Description.</span>}
                <br/>

                <select name="tag" ref={register({required: true})}>
                    <option value="">-- Select a Category ---</option>
                    <option value="other">Other</option>
                    <option value="nature">Nature</option>
                    <option value="city">City</option>
                </select>
                <br/>
                {errors.tag && <span style={{"color":"red"}}>You must select a Photo Tag.</span>}
                <br/>

                <button>Submit</button>
            </form>
        </div>
    )
}
