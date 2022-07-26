import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AutoPopArtists } from "../Autopopulate/AutopopArtist"
import { AutoPopAlbum } from "../Autopopulate/AutopopAlbum"

export const WishListForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */

        const [selectedArtist, setSelectedArtist] = useState(null);
        const [selectedMaster, setSelectedMaster] = useState(null)

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

            //Create the object to be saved to the API

            const artist = selectedArtist
          const master = selectedMaster
        
        const albumToSendToAPI = {
            userId: recordsUserObject.id,
            collectionAlbum: false,
            artistName: artist.title,
            albumName: master.title.split('-')[1],
            yearReleased: master.year,
            albumArt: master.cover_image,
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
           
            <AutoPopArtists setSelectedArtist={setSelectedArtist}
                            selectedArtist={selectedArtist}/>
            <AutoPopAlbum artist={selectedArtist}
                            setSelectedMaster={setSelectedMaster}
                            selectedMaster={selectedMaster}/>
           
            {/* <fieldset>
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
            </fieldset> */}

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