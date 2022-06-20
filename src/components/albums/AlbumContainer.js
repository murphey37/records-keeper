import { useState } from "react"
import { AlbumSearch } from "./AlbumSearch"
import { FindAlbum } from "./FindAlbum"


export const AlbumContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    
    return <>
            <AlbumSearch setterFunction={setSearchTerms} /> 
            <FindAlbum searchTermState={searchTerms} /> 
            
            
    </>
}