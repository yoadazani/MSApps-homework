import Pagination from "./Pagination.tsx";
import ImagesGallery from "./ImagesGallery.tsx";
import SearchByCategory from "./SearchByCategory.tsx";
import SortBy from "./SortBy.tsx";

const Container = () => {
    return (
        <div className="w-full mx-auto py-4 px-4 md:px-[4rem] lg:px-[6rem]">
            <div className="flex w-[30%] items-center my-4 mx-auto">
                <SearchByCategory className="flex items-center justify-center w-full"/>
                <SortBy className="flex items-center "/>
            </div>
            <Pagination/>
            <ImagesGallery/>
        </div>
    );
};

export default Container;