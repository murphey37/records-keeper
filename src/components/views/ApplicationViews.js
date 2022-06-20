

import { Outlet, Route, Routes } from "react-router-dom"
import { AlbumCollectionForm } from "../albums/AlbumCollectionForm"
import { AlbumContainer } from "../albums/AlbumContainer"
import { AlbumList } from "../albums/AlbumList"
import { EditAlbum } from "../albums/EditAlbum"
import { EditWishListAlbum } from "../albums/EditWishListAlbum"
import { Gallery } from "../albums/Gallery"
import { WishList } from "../albums/Wishlist"
import { WishListContainer } from "../albums/WishlistContainer"
import { WishListForm } from "../albums/WishListForm"
import { WishListGallery } from "../albums/WishListGallery"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Record's Keeper</h1>
                    <div></div>

                    <Outlet />
                </>
            }>

                <Route path="albums" element={ <AlbumList /> } />
				<Route path="albums/create" element={ <AlbumCollectionForm /> } />
				<Route path="albums/:id/edit" element={ <EditAlbum/> } />
				<Route path="albums/gallery" element={ <Gallery /> } />
				<Route path="findAlbum" element={ <AlbumContainer />} />
				<Route path="wishlist" element={ <WishList /> } />
				<Route path="wishlist/create" element={ <WishListForm /> } />
				<Route path="wishlist/:id/edit" element={ <EditWishListAlbum/> } />
				<Route path="wishlist/gallery" element={ <WishListGallery /> } />
				<Route path="wishlist/findAlbum" element={ <WishListContainer />} />
            </Route>
        </Routes>
    )
}