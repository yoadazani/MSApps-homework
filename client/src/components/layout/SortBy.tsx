import {ChangeEvent, ComponentProps} from "react";
import {cn} from "../../utils/merge_classes.ts";
import {AppDispatch} from "../../store/images_store";
import {useDispatch, useSelector} from "react-redux";
import {fetchImages} from "../../store/images_store/imagesSlice.ts";
import {rootState} from "../../store/images_store";

const SortBy = (props: ComponentProps<"div">) => {
    const imagesStore = useSelector((state: rootState) => state.images);
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        // get the value of the selected option to sort by
        const {value} = e.target;
        dispatch(fetchImages(`http://localhost:5000/api/pixabay/images?q=${imagesStore.searchCategory}&page=${imagesStore.currentPage}&per_page=${imagesStore.hitsPerPage}&sortBy=${value}`));
    }

    return (
        <div {...props}
             className={cn("flex items-center bg-blue-500 w-[150px] h-[40px] rounded text-white p-1", props.className)}>
            <select
                name="sortBy"
                className="bg-transparent w-full"
                onChange={handleChange}
            >
                <option value="id" className="text-zinc-900 w-[150px]">Id</option>
                <option value="date" className="text-zinc-900 w-[150px]">Date</option>
            </select>
        </div>
    );
};

export default SortBy;