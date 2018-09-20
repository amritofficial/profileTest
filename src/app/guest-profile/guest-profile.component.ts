import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class GuestProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log("navigated");
      console.log(params);
    })
  }

}
