interface IPageRead<T> {
    getLastPage(): number|null
    getPageAsync(numberOfPage: number): Promise<Array<T>>
}
export { IPageRead }