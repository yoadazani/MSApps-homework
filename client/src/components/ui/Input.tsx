import {ComponentProps} from 'react';
import {cn} from "../../utils/merge_classes.ts";

const Input = (props: ComponentProps<"input">) => {
    return <input {...props} className={cn("", props.className)}/>
};

export default Input;