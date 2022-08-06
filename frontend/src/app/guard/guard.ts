import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class Guard implements CanActivate {

    constructor(private ruter: Router){}

    canActivate(
        route: ActivatedRouteSnapshot, state: RouterStateSnapshot
        ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        this.ruter.navigate[('')];  
        return false; // return true;
    }

}