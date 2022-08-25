import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DeleteButton } from "./DeleteButton"
import "./Albums.css"

export const AlbumList = () => {
    const [albums, setAlbums] = useState([])
    const navigate = useNavigate()
    const [filteredAlbums, setFiltered] = useState([])


    const getAlbums = () => {
        fetch(`http://vast-eyrie-36954.herokuapp.com/albums?collectionAlbum=true&_sort=artistName`)
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
<article className="buttons">
        <button className="btn" onClick={() => navigate("/albums/create")}>Add Album</button>
        <button className="btn" onClick={() => navigate("/albums/gallery")}>View Album Art Gallery</button>
        <button className="btn" onClick={() => navigate("/findAlbum")}>Find Album</button>
        </article>
    <h2></h2>

    

    <article className="albums">
        {
            albums.map(
                (album) => {
                    return <section key={album.id} className="album">
                        <div>{album.artistName}</div>
                        <Link to={`/albums/${album.id}/edit`}> {album.albumName}</Link>
                        <div></div>
                        {/* <footer>{album.albumName}</footer> */}
                        <img className="photos" src={album.albumArt} alt={album.albumName}></img>
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
