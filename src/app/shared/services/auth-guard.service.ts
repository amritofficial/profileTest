import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { ParseService } from './parse.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private parseService: ParseService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("auth guard")
    this.parseService.currentLoggedInUser().subscribe(data => {
    }); 
    return this.parseService.currentLoggedInUser().pipe(map(e => {
      console.log('Inside')
      console.log(e)
      if (e) {
        return true;
      } else {
        this.router.navigateByUrl('/home/(form-outlet:login)');
        return false;
      }
    }),
      catchError((err) => {
        console.log(err);
        this.router.navigateByUrl('/home/(form-outlet:login)');
        return of(false);
      })
    );
  }
}
