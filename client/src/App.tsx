import Container from "./components/layout/Container.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./store/images_store";
import {useEffect} from "react";
import {fetchImages} from "./store/images_store/imagesSlice.ts";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(
            fetchImages('http://localhost:5000/api/pixabay/images')
        )
    }, []);

    return (
        <Router>
            <Routes>
                <Route index path="/" element={<Container/>}/>
            </Routes>
        </Router>
    )
}

export default App
