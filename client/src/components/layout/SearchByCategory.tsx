import React, {ComponentProps, FormEvent, useState} from 'react';
import Button from "../ui/Button.tsx";
import {AppDispatch} from "../../store/images_store";
import {useDispatch} from "react-redux";
import {fetchImages} from "../../store/images_store/imagesSlice.ts";
import {Check, X} from "lucide-react";
import Input from "../ui/Input.tsx";
import Modal from "../ui/Modal.tsx";
import {cn} from "../../utils/merge_classes.ts";

const SearchByCategory = (props: ComponentProps<"div">) => {
    const dispatch = useDispatch<AppDispatch>()
    // const modalRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault()

        // get form data by name attribute
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const data = Object.fromEntries(formData)

        // make new api request with new category
        dispatch(fetchImages(`http://localhost:5000/api/pixabay/images?q=${data.type}`))

        setIsOpen(false)
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLFormElement>, data: FormEvent): void => {
        // handle enter key event for submitting form
        const {key} = e
        if (key === 'Enter') {
            handleSubmit(data)
            setIsOpen(false)
        }
    }

    return <div className={cn("", props.className)}>
        <Button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Search By Category
        </Button>
        <Modal
            isOpen={isOpen}
            setIsOpen={() => setIsOpen(false)}
            className="w-[500px]"
        >
            {/* Select ImagesGallary Type Pagination */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">
                    Select images types
                </h1>
                <Button
                    className="bg-transparent border border-zinc-700 p-1 rounded-lg"
                    onClick={() => setIsOpen(false)}
                >
                    <X className="w-5 h-5"/>
                </Button>
            </div>

            {/* Select ImagesGallary Type Body */}
            <div className="mt-4 bg-zinc-100 p-4">
                <form
                    onSubmit={handleSubmit}
                    onKeyDown={
                        (event) => {
                            handlePressEnter(event as React.KeyboardEvent<HTMLFormElement>, event as FormEvent)
                        }
                    }
                >
                    <Input
                        name="type"
                        type="text"
                        placeholder="Animals"
                        className="p-2 w-full border-[0.5px] border-zinc-700 rounded-lg"
                    />

                    <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        <span>Search</span>
                        <Check className="w-5 h-5"/>
                    </Button>
                </form>
            </div>
        </Modal>
    </div>
}


export default SearchByCategory;
