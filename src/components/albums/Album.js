import { Link } from "react-router-dom"

export const Album = ({ id, albumName, albumArt }) => {

    const deleteButton = () => {
            return <button onClick={() => {}} className="album__delete">Delete</button>
    }

    return <section className="album">
                    <div>
                        <Link to={`/albums/${id}`}>Name: {albumName}</Link>
                    </div>
                    <img src={albumArt}></img>
                    <footer>
                        {
                        deleteButton()
                    }
                    </footer>
                    </section> 
}