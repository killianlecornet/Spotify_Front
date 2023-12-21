import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import DetailPlaylist from "../pages/DetailPlaylist/DetailPlaylist";
import DetailAlbum from "../pages/DetailAlbum/DetailAlbum";
import DetailArtist from "../pages/DetailArtist/DetailArtist";
import DetailFavorite from "../pages/DetailFavorite/DetailFavorite";
import SearchPage from "../pages/SearchPage/SearchPage";
import CreatePlaylist from "../pages/CreatePlaylist/CreatePlaylist";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/album/:id", // c'est ce que il y aura afficher sur l'url 
        element: <DetailAlbum /> // c'est le chemin de la page que l'on veut afficher 
    },
    {
        path: "/playlist/:id", 
        element: <DetailPlaylist />
    },
    {
        path: "/artist/:id", 
        element: <DetailArtist />
    },
    {
        path: "/favorite", 
        element: <DetailFavorite />
    },
    {
        path: "/search", 
        element: <SearchPage />
    },
    {
        path: "/createPlaylist", 
        element: <CreatePlaylist />
    },
]);

export default router;  