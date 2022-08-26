import { useEffect, useState } from "react"
import "./Albums.css"


export const FindWishListAlbum = ({ searchTermState }) => {
    const [albums, setAlbums] = useState([])
    const [filteredAlbums, setFiltered] = useState([])

    useEffect(
        () => {
            const searchedAlbums = albums.filter(album => album.artistName.toLowerCase().startsWith(searchTermState.toLowerCase()) ||
                album.albumName.toLowerCase().startsWith(searchTermState.toLowerCase()))
            setFiltered(searchedAlbums)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            fetch(`https://vast-eyrie-36954.herokuapp.com/albums?collectionAlbum=false`)
                .then(response => response.json())
                .then((albumsArray) => {
                    setAlbums(albumsArray)
                })
        },
        [], // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            setFiltered(albums)
        }, [albums]
    )

    return <>
        <h2>Albums</h2>

        <article className="albums">
            {
                filteredAlbums.map(
                    (filteredAlbum) => {
                        return <section className="album" key={filteredAlbum.id}>
                            <div>{filteredAlbum.artistName}</div>
                            <div>Album: {filteredAlbum.albumName}</div>
                            <img src={filteredAlbum.albumArt} alt={filteredAlbum.albumName}></img><br />
                        </section>
                    })
            }
        </article>
    </>
}