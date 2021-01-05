import { ApiService } from "./ApiService";
import Cookie from 'js-cookie';
import { AsyncSubject, BehaviorSubject } from "rxjs";
/*
const getCookie = (cname: string): string|null => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
  return null;
}
const isSetCookie = (name: string): boolean => {
    var cookie = getCookie(name);
    if (cookie != null) {
        return true
    } 
    return false
}
*/
export enum UserType {
    Admin = "admin",
    User = "user"
}

export interface User {
    userType: UserType
}
class _AuthService {
    private onUserStateChanged: BehaviorSubject<null> = new BehaviorSubject<null>(null);
    public get OnUserStateChanged(): BehaviorSubject<null> {
        return this.onUserStateChanged;
    }
    public async logInAsUser() {
        let response = await ApiService.post('/auth',{"userType":UserType.User})
        let user = response.data as User;
        localStorage.setItem('user',JSON.stringify(user));
        this.onUserStateChanged.next(null);
    }
    public async logInAsAdmin() {
        let response = await ApiService.post('/auth',{"userType":UserType.Admin})
        let user = response.data as User;
        localStorage.setItem('user',JSON.stringify(user));
        this.onUserStateChanged.next(null);
    }
    public async logout() {
        localStorage.removeItem('user');
        Cookie.remove('jwt-token');
        this.onUserStateChanged.next(null);
    }
    public user(): User|null {
        let item = localStorage.getItem('user');
        if(item == null) {
            return null;
        }
        else {
            return JSON.parse(item) as User;
        }
    }
    public isUserLoggedIn(): boolean {
        let jwtTokenExist = (Cookie.get('jwt-token') != undefined)
        if(!jwtTokenExist) {
            return false;
        }
        if(this.user == null) {
            Cookie.remove('jwt-token')
            return false;
        }
        return true;
    }
}
export const AuthService = new _AuthService()