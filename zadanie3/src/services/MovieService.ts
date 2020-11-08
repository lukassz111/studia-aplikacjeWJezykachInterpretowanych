import { BehaviorSubject } from 'rxjs'
import { RequestService } from './RequestService'

class _MovieService {
  baseUrl = './wikipedia-movie-data/'
  movies: Array<Map<string,string>> = []
  filteredMovies: Array<Map<string,string>> = []
  movieToDisplay: Array<Map<string,string>> = []
  movieToDisplayObservable: BehaviorSubject<any> = new BehaviorSubject<any>(0)
  page: number = 0
  perPage: number = 10

  getLastPageNumber (): number {
    let m = this.filteredMovies.length % this.perPage
    return (this.filteredMovies.length - m) / this.perPage
  }

  listUpdate (): void {
    if (this.page < 0) {
      this.page = 0
    } else if (this.page > this.getLastPageNumber()) {
      this.page = this.getLastPageNumber()
    }

    this.movieToDisplay = []
    let begin: number = this.page * this.perPage
    let end: number = begin + this.perPage
    for (let i = begin; i < end; i++) {
      this.movieToDisplay.push(this.filteredMovies[i])
    }
    this.movieToDisplayObservable.next(0)
  }

  loadMovies (): void {
    let url = this.baseUrl + 'movies.json'
    RequestService.get(url).then((response) => {
      this.movies = JSON.parse(response as string)
      this.page = 0
      this.setFilter("","","","")
    })
  }

  setFilter(title: string,cast: string,genre: string,year: string): void {
    console.log({"title":title,"cast":cast,"genre":genre,"year":year})
    title = title.trim();
    cast = cast.trim();
    genre = genre.trim();
    year = year.trim();
    if(title === '' && cast === '' && genre === '' && year === '') {
      this.filteredMovies = this.movies;
    } else {
      this.filteredMovies = [];
    }
    this.listUpdate();
  }
}
const MovieService = new _MovieService()
export { MovieService }
