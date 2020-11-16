import Movie from '../model/Movie'
import { BehaviorSubject, Observable } from 'rxjs'
import { RequestService } from './RequestService'
import { clone,cloneDeep,filter,slice } from 'lodash';

class _MovieService {
  //private moviesLoaded: boolean = false;
  private baseUrl: string = './wikipedia-movie-data/'
  private movies: Array<Movie> = []
  private filteredMovies: Array<Movie> = []
  public movieToDisplay: Array<Movie> = []
  private update: BehaviorSubject<any> = new BehaviorSubject<any>(0)
  public get Update(): Observable<any> {
    return this.update;
  }
  public get Movies(): Array<Movie> {
    return cloneDeep(this.movies)
  }
  private _page: number = 0

  public get Page(): number {
    if (this._page < 0) {
      this._page = 0
    } else if (this._page > this.getLastPageNumber()) {
      this._page = this.getLastPageNumber()
    }
    return this._page;
  }
  public set Page(value: number) {
    this._page = value;
    if (this._page < 0) {
      this._page = 0
    } else if (this._page > this.getLastPageNumber()) {
      this._page = this.getLastPageNumber()
    }
  }

  private _perPage: number = 10
  public get PerPage(): number {
    return this._perPage;
  }
  public set PerPage(value: number) {
    this._perPage = value;
    if(this._perPage < 10) {
      this._perPage = 10
    }
    let temp = this.Page;
    this.Page = temp;
  }

  public getLastPageNumber (): number {
    let m = this.filteredMovies.length % this.PerPage
    return (this.filteredMovies.length - m) / this.PerPage
  }

  public listUpdate (): void {
    let begin: number = this.Page * this.PerPage
    let end: number = begin + this.PerPage
    this.movieToDisplay = slice(this.filteredMovies,begin,end);
    this.update.next(0)
  }

  public loadMovies (): void {
    //console.log({"load":this.moviesLoaded})
    //if(this.moviesLoaded) {
    //  this.listUpdate()
    //  return
    //}
    let url = this.baseUrl + 'movies.json'
    RequestService.get(url).then((response) => {
      let jsonMovies: Array<any> = JSON.parse(response as string)
      this.movies = jsonMovies.map<Movie>((v: any, i:number)=>{
        return new Movie(v['title'],v['cast'],v['genres'],parseInt(v['year']))
      });
      console.log({loaded:this.movies})
      this.Page = 0
      this.PerPage = 10
      this.setFilter("","","","")
    })
    //this.moviesLoaded = true;
  }

  public setFilter(title: string,cast: string,genre: string,year: string): void {
    console.log("old: "+this.getLastPageNumber().toString());
    let regexCreator = (str:string): RegExp => {
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
      this.filteredMovies = clone(this.movies);
    } else {
      //Initialize filter
      this.filteredMovies = this.movies;
      let filtered: Array<Movie> = [];
      //Title filter
      if(title != '') {
        let titleRegEx = regexCreator(title)
        this.filteredMovies = filter<Movie>(this.filteredMovies,(value:Movie) => {
          return value.title.match(titleRegEx) != null
        })
      }
      //Year filter
      if(year != '') {
        let yearRegEx = regexCreator(year)
        this.filteredMovies = filter<Movie>(this.filteredMovies,(value: Movie) => {
          return value.year.toString().match(yearRegEx) != null
        })
      }
      //Genre filter
      if(genre != '') {
        let genreFilters: Array<string> = genre.split('/');
        let genresRegEx = genreFilters.map((v:string,i:number)=>{
          return regexCreator(v.trim());
        });
        genresRegEx.forEach((genreRegEx: RegExp) => {
          this.filteredMovies = filter<Movie>(this.filteredMovies,(value:Movie) => {
            for(let genre of value.genres) {
              if(genre.match(genreRegEx) != null) {
                return true;
              }
            }
            return false;
          })
        })
      }
      //Cast filter
      if(cast != '') {
        let castFilters: Array<string> = cast.split('/');
        let castsRegEx = castFilters.map((v:string,i:number)=>{
          return regexCreator(v.trim());
        });
        castsRegEx.forEach((castRegEx: RegExp) => {
          this.filteredMovies = filter<Movie>(this.filteredMovies,(value:Movie) => {
            for(let cast of value.cast) {
              if(cast.match(castRegEx) != null) {
                return true;
              }
            }
            return false;
          })
        })
      }
      //TODO add more 
    }
    this.listUpdate();
    console.log("new: "+this.getLastPageNumber().toString());
  }
}
const MovieService = new _MovieService()
export { MovieService }
