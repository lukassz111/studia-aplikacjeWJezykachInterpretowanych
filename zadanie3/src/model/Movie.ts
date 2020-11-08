class Movie {
    constructor(title: string, cast: Array<string>, genres: Array<string>, year: number) {
        this.title = title;
        this.cast = cast;
        this.genres = genres;
        this.year = year;
    }
    public title: string
    public cast: Array<string>
    public genres: Array<string>
    public year: number
}
export default Movie;