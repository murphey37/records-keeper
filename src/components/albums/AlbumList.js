import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DeleteButton } from "./DeleteButton"
import "./Albums.css"

export const AlbumList = () => {
    const [albums, setAlbums] = useState([])
    const navigate = useNavigate()
    const [filteredAlbums, setFiltered] = useState([])


    const getAlbums = () => {
        fetch(`http://localhost:8088/albums?collectionAlbum=true`)
        .then(response => response.json())
        .then((albumArray) => {
            setAlbums(albumArray)
                        })

    }
    useEffect(
        () => {
            getAlbums()
        },
        [] // When this array is empty, you are observing initial component state
    )

  
    return <>

        <button onClick={() => navigate("/albums/create")}>Add Album</button>
        <button onClick={() => navigate("/albums/gallery")}>View Album Art Gallery</button>
        <button onClick={() => navigate("/findAlbum")}>Find Album</button>
       
    <h2>Your Record Collection, Sire!</h2>

    

    <article className="albums">
        {
            albums.map(
                (album) => {
                    return <section key={album.id} className="album">
                        <Link to={`/albums/${album.id}/edit`}> {album.albumName}</Link>
                        <div>{album.artistName}</div>
                        <footer>{album.albumName}</footer>
                        <img src={album.albumArt} alt={album.albumName}></img>
                        <footer>
                        <DeleteButton album={album} get={getAlbums}/> 
                    </footer>
                    </section>
                }
            )
        }


    </article>
    </>
}
