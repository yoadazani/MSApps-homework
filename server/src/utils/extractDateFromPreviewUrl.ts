export const extractDateFromPreviewUrl = (previewURL: string): number => {
    // extract date from previewURL because the return type of image from pixabay api is not containing the date

    const date = previewURL.split('/').slice(4, 7).join('-')

    // return date in YYYY-MM-DD format
    return new Date(date).getTime()
}