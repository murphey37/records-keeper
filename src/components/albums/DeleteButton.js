import { useNavigate } from "react-router-dom"

/* props = {
    album: {
        id: 1,
        albumName: "The Wall",
        ...etc
    },
    get: getAlbums
}
*/
// export const DeleteButton = ({album, get }) => {  >>> this is call DESTRUCTURING, it is the SHORTHAND of doing this:
// export const DeleteButton = (props) => { >>>> props.album.id and props.get
export const DeleteButton = ({album, get }) => {
    const navigate = useNavigate()

    return <button onClick={() => {
        fetch(`http://vast-eyrie-36954.herokuapp.com/albums/${album.id}`, {
            method: "DELETE"
        })
     
        .then(() => {
            get()
        })
    }} className="album__delete">Delete</button>
}


