albums.map((album) => {
    
        return <section className="album">
            <img src={album.albumArt} alt={album.albumName}></img>
            {/* <header className="inventory__header">Name: {inventory.manufacturer} {inventory.name}</header> */}
        </section>
    }


    const deleteButton = () => {
        return <buton onClick={() => {
            fetch(`http://localhost:8088/albums?collectionAlbum=false/${album.id}`,{
                    method: "DELETE"
            })
            .then(response => response.json())
            .then((albumArray) => {
                setAlbums(albumArray)
            })

        }} className="album__delete">Delete Album</buton>
    }

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;

    export const KandySearch = ({ setterFunction}) => {
        return (
            <div>
                 <input 
                    onChange={
                        (changeEvent) => {
                            setterFunction(changeEvent.target.value)
                        }
                    }
                 type="text" placeholder="Enter search terms"/>
            </div>
            )
    }

/*
    example of search query for Discogs:
    curl "https://api.discogs.com/database/search?q=Wilco&type=artist&key=QOweiokWJRqHZcvyjksT&secret=dexKOwgmxPLTUVszUftstFAJHHOZvHHy"
    */