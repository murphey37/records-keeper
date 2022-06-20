import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DeleteButton } from "./DeleteButton"
import "./Albums.css"

export const WishList = () => {
    const [albums, setAlbums] = useState([])
    const navigate = useNavigate()
    
    const getAlbums = 
        () => {
            fetch(`http://localhost:8088/albums?collectionAlbum=false`)
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

    <button onClick={() => navigate("/wishlist/create")}>Add Album</button>
    <button onClick={() => navigate("/wishlist/gallery")}>View Gallery</button>
    <button onClick={() => navigate("/wishlist/findAlbum")}>Find Album</button>
    <h2>Your Wishlist, Sire!</h2>

    <article className="albums">
        {
          albums.map(
                (album) => {
                    return <section key={album.id} className="album">
                        <Link to={`/wishlist/${album.id}/edit`}> {album.albumName}</Link>
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