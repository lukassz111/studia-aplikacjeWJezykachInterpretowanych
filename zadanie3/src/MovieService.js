import { BehaviorSubject } from 'rxjs'
import { RequestService } from './RequestService'

class _MovieService {
  baseUrl = './static/wikipedia-movie-data/'
  movies = []
  movieToDisplay = []
  movieToDisplayObservable = new BehaviorSubject()
  page = 0
  perPage = 10

  getLastPageNumber () {
    let m = this.movies.length % this.perPage
    return (this.movies.length - m) / this.perPage
  }

  listUpdate () {
    if (this.page < 0) {
      this.page = 0
    } else if (this.page > this.getLastPageNumber()) {
      this.page = this.getLastPageNumber()
    }
    console.log(this.getLastPageNumber())

    this.movieToDisplay = []
    let begin = this.page * this.perPage
    let end = begin + this.perPage
    for (let i = begin; i < end; i++) {
      this.movieToDisplay.push(this.movies[i])
    }
    this.movieToDisplayObservable.next()
  }

  loadMovies () {
    let url = this.baseUrl + 'movies.json'
    RequestService.get(url).then((response) => {
      this.movies = JSON.parse(response)
      this.page = 0
      this.listUpdate()
    })
  }
}
const MovieService = new _MovieService()
export { MovieService }
