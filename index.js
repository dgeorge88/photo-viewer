const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./creds")
const path = require("path")
const PORT = process.env.PORT || 8000

//Middleware:
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === "production"){
    //serve static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")))
}else{
    app.use(express.static(path.join(__dirname, "client/build")))
}


//Routes:
//GET photos FROM /photos
app.get("/api/photos", async (req, res) => {

    const client = await pool.connect()

    try {

        const allPhotos = await client.query("SELECT * FROM photos")

        res.status(200)
        .json(res.body={
            success: true,
            data: allPhotos.rows
        })

    } catch (error) {

        res.status(500)
        .json(
            res.body={
                success: false,
                message: error.toString()
            }
        )

    } finally {
        client.release();
    }
})

//GET photo FROM /photo/:id
app.get("/api/photo/:id", async (req, res) => {
    const client = await pool.connect()
    try {

        const { id } = req.params; 
        const photo = await client.query("SELECT * from photos WHERE id = $1", [id])

        if (photo.rowCount < 1) {

            res.status(400).json(
                res.body = {
                    success: false,
                    message: `No Photo with the ID of ${id} found.`
                }
            )


        } else {

            res.status(200)
            .json(res.body={
                success: true,
                data: photo.rows[0]
            })
        }
    } catch (error) {

        res.status(500).json(
            res.body = {
                success: false,
                message: error.toString(),
            }
        )

    } finally {
        client.release();
    }
})

//POST photo to /photos
app.post("/api/photos/add", async (req, res) => {
    const client = await pool.connect()

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).json(
            res.body = {
                success: false,
                message: "Sorry. No Data."
            }
        )

    } else {

        try {

            const { url, isfavorite, description, tag } = req.body

            const newPhoto = await pool.query(
                "INSERT INTO photos(url,isfavorite,description,tag)VALUES($1,$2,$3,$4)",
                [url, isfavorite === false, description, tag]
            )

            res.status(201).json(res.body = {
                success: true,
                data: req.body
            })
        } catch (error) {

            res.status(500).json(
                (res.body = {
                    success: false,
                    message: error.toString(),
                })
            )

        } finally {

            client.release()

        }
    }
})

//UPDATE Photo PUT /photo/:id
app.put("/api/photo/update/:id", async (req, res) => {
    const client = await pool.connect()

    try {

        const { id } = req.params;
        const photo = await client.query(
            "UPDATE photos SET isfavorite = NOT isfavorite WHERE id=$1", [id])

        if(photo.rowCount === 0){
            res.status(404).json(res.body = {
                success: false,
                message: `No Photo with the ID: ${id}.`
            })
    
        }else{

        res.status(201).json(
            res.body = {
                sucess: true,
                data: "Updated Favorite."
            }
        )
        }

    } catch (error) {

        res.status(500).json(
            res.body = {
                success: false,
                message: error.toString()
            }
        )

    } finally {
        client.release();
    }
})

//DELETE Photo /photo/:id

app.delete("/api/photo/delete/:id", async (req, res) => {

    const client = await pool.connect()

    try {
      const { id } = req.params
      const deletePhoto = await pool.query("DELETE FROM photos where id=$1", [id])

      if(deletePhoto.rowCount === 0){
        res.status(404).json(res.body = {
            success: false,
            message: `No Photo with the ID: ${id}.`
        })

    }else{
        res.status(200).json(res.body ={
            success: true,
            message:`Deleted Photo with the ID: ${id}.`
        })
    }

    } catch (error) {

        res.status(500).json(
            res.body = {
                success: false,
                message: error.toString()
            }
        )

    } finally{
        client.release()
    }

  })

  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client/build/index.html"))
      res.redirect('/');
  })

//Server:
app.listen(PORT, () => {
    console.log(`Server running...`)
});
