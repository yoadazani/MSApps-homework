import Button from "../ui/Button.tsx";
import {ChevronsLeft, ChevronsRight} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, rootState} from "../../store/images_store";
import {fetchImages} from "../../store/images_store/imagesSlice.ts";

const Pagination = () => {
    const imagesStore = useSelector((state: rootState) => state.images)

    const dispatch = useDispatch<AppDispatch>()

    const handlePrev = () => {
        const currPage = imagesStore.currentPage
        if (currPage > 1) {
            // make new api request with new category
            dispatch(fetchImages(`http://localhost:5000/api/pixabay/images?q=${imagesStore.searchCategory}&page=${currPage - 1}`))
        }
    }
    const handleNext = () => {
        const currPage = imagesStore.currentPage
        if (currPage <= imagesStore.totalHits / imagesStore.hitsPerPage) {
            // make new api request with new category
            dispatch(fetchImages(`http://localhost:5000/api/pixabay/images?q=${imagesStore.searchCategory}&page=${currPage + 1}`))
        }
    }

    return (
        <div className="flex items-center justify-between px-4">
            {/* Prev Button */}
            <Button
                disabled={imagesStore.currentPage === 1}
                onClick={handlePrev}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-row-reverse disabled:cursor-not-allowed disabled:opacity-50"
            >
                <span>Prev</span>
                <ChevronsLeft className="w-5 h-5"/>
            </Button>

            {/* Next Button */}
            <Button
                disabled={imagesStore.currentPage === Math.ceil(imagesStore.totalHits / imagesStore.hitsPerPage)}
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:opacity-50"
            >
                <span>Next</span>
                <ChevronsRight className="w-5 h-5"/>
            </Button>
        </div>
    );
};

export default Pagination;