import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const WishListGallery = () => {
    const [albums, setAlbums] = useState([])
    const navigate = useNavigate()
    
    

    useEffect(
        () => {
            fetch(`https://vast-eyrie-36954.herokuapp.com/albums?collectionAlbum=false`)
                .then(response => response.json())
                .then((albumArray) => {
                    setAlbums(albumArray)
                                })
            
        },
        [] // When this array is empty, you are observing initial component state
    )

    

    return <>

       


    <h2>Your Wishlist Art Gallery, Sire!</h2>

    

    <article className="albums">
        {
            albums.map((album) => {
    
                return <section className="album">
                    <img src={album.albumArt} alt={album.albumName}></img>
                    {/* <footer className="album__delete" >{
                        deleteButton()
                    }</footer> */}
                </section>
            }
            )
        }


    </article>
    </>
}