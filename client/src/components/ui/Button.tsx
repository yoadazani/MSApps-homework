import {ComponentProps} from "react";

import {cn} from "../../utils/merge_classes.ts";

const Button = (props: ComponentProps<"button">) => {
    return <button
        {...props}
        className={cn("flex items-center gap-2 cursor-pointer", props.className)}
    >
        {props.children}
    </button>;
}

export default Button;