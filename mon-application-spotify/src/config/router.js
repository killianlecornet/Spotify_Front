import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import DetailPlaylist from "../pages/DetailPlaylist/DetailPlaylist";
import DetailAlbum from "../pages/DetailAlbum/DetailAlbum";
import DetailArtist from "../pages/DetailArtist/DetailArtist";
import DetailFavorite from "../pages/DetailFavorite/DetailFavorite";

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
]);

export default router;  