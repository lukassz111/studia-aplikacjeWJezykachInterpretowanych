import { BehaviorSubject } from 'rxjs'
import { RequestService } from './RequestService'

class _MovieService {
  baseUrl = './wikipedia-movie-data/'
  movies = []
  filteredMovies = []
  movieToDisplay = []
  movieToDisplayObservable = new BehaviorSubject()
  page = 0
  perPage = 10

  getLastPageNumber () {
    let m = this.filteredMovies.length % this.perPage
    return (this.filteredMovies.length - m) / this.perPage
  }

  listUpdate () {
    if (this.page < 0) {
      this.page = 0
    } else if (this.page > this.getLastPageNumber()) {
      this.page = this.getLastPageNumber()
    }

    this.movieToDisplay = []
    let begin = this.page * this.perPage
    let end = begin + this.perPage
    for (let i = begin; i < end; i++) {
      this.movieToDisplay.push(this.filteredMovies[i])
    }
    this.movieToDisplayObservable.next()
  }

  loadMovies () {
    let url = this.baseUrl + 'movies.json'
    RequestService.get(url).then((response) => {
      this.movies = JSON.parse(response)
      this.page = 0
      this.setFilter("","","","")
    })
  }

  setFilter(title,cast,genre,year) {
    console.log({"title":title,"cast":cast,"genre":genre,"year":year})
    this.filteredMovies = this.movies;
    this.listUpdate();
  }
}
const MovieService = new _MovieService()
export { MovieService }
