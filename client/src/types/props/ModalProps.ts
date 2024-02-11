import {ComponentProps, Dispatch, SetStateAction} from "react";

export type ModalProps = ComponentProps<"dialog"> & {
    isOpen: boolean,
    setIsOpen?: Dispatch<SetStateAction<boolean>>
}