import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  currentUrl: string;
  showUserList: boolean = true;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      // console.log(event);
      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
        if(this.currentUrl === '/home/(form-outlet:login)') {
          this.showUserList = false;
        } 
        else if(this.currentUrl === '/home/(form-outlet:register)') {
          this.showUserList = false;
        }
        else {
          this.showUserList = true;
        }
        console.log(this.currentUrl)
      }
    })
  }
}
