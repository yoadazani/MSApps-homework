import {ImageT} from "../../types/ImageT.ts";
import Mansory from "react-masonry-css";
import {useSelector} from "react-redux";
import {rootState} from "../../store/images_store";
import {useSearchParams} from "react-router-dom";
import CurrentImage from "./currentImage.tsx";

const ImagesGallery = () => {
    const imagesStore = useSelector((state: rootState) => state.images)
    const [searchParams, setSearchParams] = useSearchParams()

    if (imagesStore.isLoading) {
        return <div>Loading...</div>
    }
    if (imagesStore.isError) {
        return <div>Error: {imagesStore.error}</div>
    }

    return <>
        {imagesStore.images?.length > 0
            ? <Mansory
                breakpointCols={3}
                className="flex gap-4 p-4"
                columnClassName="mansory_column_class_name"
            >
                {
                    imagesStore.images?.map((image: ImageT) => (
                        <div
                            key={image.id}
                            className="w-full rounded-lg cursor-pointer overflow-hidden shadow-2xl ring-1 ring-zinc-700"
                            onClick={() => {
                                // add imageId to search params for showing image details on modal
                                searchParams.set('imageId', image.id.toString())
                                setSearchParams(searchParams)
                            }}
                        >
                            <img
                                src={image.webformatURL}
                                alt="img"
                                onClick={() => {
                                    console.log("click img");
                                }}
                            />
                        </div>
                    ))
                }
            </Mansory>
            : <div>
                <h1>
                    No images found !!!
                </h1>
            </div>}

        {/*current image modal is showing only if imageId set on searchParams*/}
        <CurrentImage/>
    </>
};

export default ImagesGallery;