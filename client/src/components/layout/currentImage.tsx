import {AppDispatch, rootState} from "../../store/images_store";
import {useDispatch, useSelector} from "react-redux";
import {Link, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getCurrentImage} from "../../store/images_store/imagesSlice.ts";
import Modal from "../ui/Modal.tsx";
import Button from "../ui/Button.tsx";
import {ChevronRight, X} from "lucide-react";

const CurrentImage = () => {
    const imagesStore = useSelector((state: rootState) => state.images)
    const dispatch = useDispatch<AppDispatch>()
    const [searchParams, setSearchParams] = useSearchParams()
    const imageId = searchParams.get("imageId") as string

    useEffect(() => {
        dispatch(getCurrentImage(imageId!))
    }, [imageId])

    return (
        <div>
            <Modal isOpen={imageId !== null}>
                {/* modal header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold"> Image {imagesStore.currentImage?.id} details </h1>
                    <Button
                        className="bg-transparent border border-zinc-700 p-1 rounded-lg"
                        onClick={() => {
                            // remove imageId from search params for closing modal
                            searchParams.delete("imageId")
                            setSearchParams(searchParams)
                        }}
                    >
                        <X className="w-5 h-5"/>
                    </Button>
                </div>

                {/* modal body */}
                <div className="flex justify-between mt-4 w-full items-start gap-4">
                    <div className="ring-1 ring-zinc-500 rounded-lg overflow-hidden object-contain w-5/12">
                        <img
                            src={imagesStore.currentImage?.webformatURL}
                            alt={imagesStore.currentImage?.tags}
                            className="w-full h-[400px] object-cover"
                        />
                    </div>

                    {/* image details */}
                    <div className="w-7/12">
                        <Link
                            download
                            to={imagesStore.currentImage?.pageURL as string}
                            className="flex items-center gap-2 w-full font-semibold underline underline-offset-8 text-blue-500 hover:text-blue-600"
                        >
                            <p className="pb-1"> Go to image page on pixabay </p>
                            <ChevronRight className="w-5 h-5"/>
                        </Link>

                        <div className="flex items-center gap-4 my-2">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img src={imagesStore.currentImage?.userImageURL} alt={imagesStore.currentImage?.user} className="object-cover"/>
                            </div>
                            <p className="font-semibold">{imagesStore.currentImage?.user}</p>
                        </div>

                        <table className="w-full flex gap-4 mt-4">
                            <thead>
                            <tr className="flex flex-col text-left space-y-1.5">
                                <th className="underline underline-offset-4">Collections :</th>
                                <th className="underline underline-offset-4">Tags :</th>
                                <th className="underline underline-offset-4">Downloads :</th>
                                <th className="underline underline-offset-4">Likes :</th>
                                <th className="underline underline-offset-4">Views :</th>
                                <th className="underline underline-offset-4">Comments :</th>
                                <th className="underline underline-offset-4">Image Size :</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="flex flex-col text-left space-y-1.5">
                                <td><p>{imagesStore.currentImage?.collections}</p></td>
                                <td><p>{imagesStore.currentImage?.tags}</p></td>
                                <td><p>{imagesStore.currentImage?.downloads}</p></td>
                                <td><p>{imagesStore.currentImage?.likes}</p></td>
                                <td><p>{imagesStore.currentImage?.views}</p></td>
                                <td><p>{imagesStore.currentImage?.comments}</p></td>
                                <td><p>{(imagesStore.currentImage?.imageSize! / 1024 / 1024).toFixed(2)} MB</p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CurrentImage;