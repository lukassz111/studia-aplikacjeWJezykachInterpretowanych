import Movie from '../model/Movie'
import { BehaviorSubject } from 'rxjs'
import { RequestService } from './RequestService'

class _MovieService {
  baseUrl = './wikipedia-movie-data/'
  movies: Array<Movie> = []
  filteredMovies: Array<Movie> = []
  movieToDisplay: Array<Movie> = []
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
      let jsonMovies: Array<any> = JSON.parse(response as string)
      this.movies = jsonMovies.map<Movie>((v: any, i:number)=>{
        return new Movie(v['title'],v['cast'],v['genres'],parseInt(v['year']))
      });
      this.page = 0
      this.setFilter("","","","")
    })
  }

  setFilter(title: string,cast: string,genre: string,year: string): void {

    let regexCreator = (str:string) => {
      let t: string = str.trim();
      while(t.match(RegExp(' {2}')) != null) {
        t = t.replace('  ',' ');
      }
      while(t.match(RegExp(' {1}')) != null) {
        t = t.replace(' ','\\s{1,}')
      }
      while(t.match(RegExp('\\*')) != null) {
        t = t.replace('*','[\\w\\d\\s]{0,}')
      }
      while(t.match(RegExp('\\?')) != null) {
        t = t.replace('?','[\\w\\d\\s]{1}')
      }
      console.log(t);
      return RegExp(t,'i');
    };

    //console.log({"title":title,"cast":cast,"genre":genre,"year":year})
    title = title.trim();
    cast = cast.trim();
    genre = genre.trim();
    year = year.trim();
    if(title === '' && cast === '' && genre === '' && year === '') {
      this.filteredMovies = this.movies;
    } else {
      //Initialize filter
      this.filteredMovies = this.movies;
      let filtered: Array<Movie> = [];
      //Title filter
      if(title != '') {
        let titleRegEx = regexCreator(title)
        this.filteredMovies.forEach((movie: Movie,index: number) => {
          if(movie.title.match(titleRegEx) != null) {
            filtered.push(movie);
          }
        })
        this.filteredMovies = filtered;
        filtered = []
      }
      //Year filter
      if(year != '') {
        let yearRegEx = regexCreator(year)
        this.filteredMovies.forEach((movie: Movie,index: number) => {
          if(movie.year.toString().match(yearRegEx) != null) {
            filtered.push(movie);
          }
        })
        this.filteredMovies = filtered;
        filtered = []
      }
      //Genre filter
      if(genre != '') {
        let genreFilters: Array<string> = genre.split('/');
        genreFilters = genreFilters.map((v:string,i:number)=>{
          return v.trim();
        });
        this.filteredMovies.forEach((movie:Movie,index:number)=>{
          let matched: Boolean = false;
          for(let genreFilter of genreFilters) {
            let genreRegEx = regexCreator(genreFilter);
            for(let genre of movie.genres) {
              if(genre.match(genreRegEx) != null) {
                matched = true;
                break;
              }
            }
            if(matched){
              break
            }
          }
          if(matched) {
            filtered.push(movie);
          }
        });
        this.filteredMovies = filtered;
        filtered = [];
      }
      //Cast filter
      if(cast != '') {
        let castFilters: Array<string> = cast.split('/');
        castFilters = castFilters.map((v:string,i:number)=>{
          return v.trim();
        });
        this.filteredMovies.forEach((movie:Movie,index:number)=>{
          let matched: Boolean = false;
          for(let castFilter of castFilters) {
            let castRegEx = regexCreator(castFilter);
            for(let cast of movie.cast) {
              if(cast.match(castRegEx) != null) {
                matched = true;
                break;
              }
            }
            if(matched){
              break
            }
          }
          if(matched) {
            filtered.push(movie);
          }
        });
        this.filteredMovies = filtered;
        filtered = [];
      }
      //TODO add more 
    }
    this.listUpdate();
  }
}
const MovieService = new _MovieService()
export { MovieService }
