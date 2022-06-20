import { useState } from "react"
import { FindWishListAlbum } from "./FindWishListAlbum"
import { WishListSearch } from "./WishListSearch"


export const WishListContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    
    return <>
            <WishListSearch setterFunction={setSearchTerms} /> 
            <FindWishListAlbum searchTermState={searchTerms} />    
    </>
}