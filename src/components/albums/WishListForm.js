import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const WishListForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [album, update] = useState({
        artistName: "",
        albumName: "",

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the album list
    */
        const [genres, setGenres] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/genres`)
                .then(response => response.json())
                .then((genreArray) => {
                    setGenres(genreArray)
                })
            
        },
        [] // When this array is empty, you are observing initial component state
    )

    const localRecordsUser = localStorage.getItem("records_user")
    const recordsUserObject = JSON.parse(localRecordsUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You done done it now")

        // TODO: Create the object to be saved to the API
        /*
        
        {
            "id": 4,
            "userId": 3,
            "collectionAlbum": false,
            "artistName": "The Mountain Goats",
            "albumName": "Goths",
            "yearReleased": 2017,
            "albumArt": "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/The_Mountain_Goats_-_Goths_-_2017.jpg/220px-The_Mountain_Goats_-_Goths_-_2017.jpg",
            "genre": 1
          }
        */
        const albumToSendToAPI = {
            userId: recordsUserObject.id,
            collectionAlbum: false,
            artistName: album.artistName,
            albumName: album.albumName,
            yearReleased: album.yearReleased,
            albumArt: album.albumArt,
            genreId: parseInt(album.genreId)

        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/albums`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(albumToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/wishlist")
            })

    }

    return (
        <form className="albumForm">
            <h2 className="albumForm__title">Add New Album to Wishlist</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Artist Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Adam Ant"
                        value={album.artistName}
                        onChange={
                            (event) => {
                                const copy = { ...album }
                                copy.artistName = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Album Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Art For Sale"
                        value={album.albumName}
                        onChange={
                            (event) => {
                                const copy = { ...album }
                                copy.albumName = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Release Year:</label>
                    <input
                        required autoFocus
                        type= "text"
                        className="form-control"
                        placeholder="1999"
                        value={album.yearReleased}
                        onChange={
                            (event) => {
                                const copy = { ...album }
                                copy.yearReleased = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="albumArt">Album Art:</label>
                    <input
                        required autoFocus
                        type= "text"
                        className="form-control"
                        placeholder="Add Link to Album Artwork"
                        value={album.albumArt}
                        onChange={
                            (event) => {
                                const copy = { ...album }
                                copy.albumArt = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="genre">Select Genres :</label>
                    <select value={album.genreId}
                        onChange={
                            (evt) => {
                                 const copy = {...album}
                                 copy.genreId = evt.target.value
                                    update(copy)
                                }
                        }>
                            {genres.map((genre) => {
                                return <option key={genre.id} value={genre.id}> {genre.name}</option>
                            })
                            }
                        </select>
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Album
            </button>
        </form>
    )
}