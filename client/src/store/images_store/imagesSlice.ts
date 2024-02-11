import {ImageT} from "../../types/ImageT.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export interface ImagesState {
    searchCategory: string,
    images: ImageT[],
    currentImage: ImageT | undefined,
    currentPage: number,
    totalHits: number,
    hitsPerPage: number,
    isLoading: boolean,
    isError: boolean,
    error: string | undefined
}

const initialState: ImagesState = {
    searchCategory: "",
    images: [],
    currentImage: undefined,
    currentPage: 1,
    totalHits: 0,
    hitsPerPage: 9,
    isLoading: false,
    isError: false,
    error: undefined
}

const imagesSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        getCurrentImage: (state, action: PayloadAction<string>) => {
            state.currentImage = state.images.find(image => image.id === +action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchImages.pending,
                (state: ImagesState) => {
                    state.isLoading = true
                })
            .addCase(
                fetchImages.fulfilled,
                (
                    state: ImagesState, action: PayloadAction<{
                        data: {searchCategory: string, hits: ImageT[], currentPage: number, hitsPerPage: number, totalHits: number }
                        message: string
                    }>
                ) => {
                    const {data} = action.payload
                    const {searchCategory,currentPage, totalHits, hitsPerPage, hits} = data
                    state.images = hits
                    state.currentPage = currentPage
                    state.totalHits = totalHits
                    state.hitsPerPage = hitsPerPage
                    state.searchCategory = searchCategory
                    state.isLoading = false
                    state.isError = false
                    state.error = undefined
                })
            .addCase(
                fetchImages.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.error = action.error.message
                }
            )
    }
})

export const fetchImages = createAsyncThunk(
    "images/fetchImages",
    async (url: string) => {
        try {
            const response = await axios.get(url)
            return response.data
        } catch (e: Error | any) {
            throw new Error(e.message)
        }
    }
)

export const {getCurrentImage} = imagesSlice.actions
export default imagesSlice.reducer