import {useEffect, useRef} from "react";
import {cn} from "../../utils/merge_classes.ts";
import {ModalProps} from "../../types/props/ModalProps.ts";


const Modal = (props: ModalProps) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (props.isOpen && modalRef.current) {
            modalRef.current.showModal();
        } else if (!props.isOpen && modalRef.current) {
            modalRef.current.close();
        }
    }, [props.isOpen]);

    return (
        <dialog
            ref={modalRef}
            className={cn("w-full max-w-[500px] md:max-w-[800px] p-4 rounded-lg backdrop:bg-black/70 backdrop:opacity-100", props.className)}
        >
            {props.children}
        </dialog>
    );
};

export default Modal;