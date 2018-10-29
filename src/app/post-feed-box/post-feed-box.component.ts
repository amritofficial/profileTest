import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/shared/models/user';
import { PostService } from 'app/shared/services/post.service';
import { Feed } from 'app/shared/models/feed';

@Component({
  selector: 'post-feed-box',
  templateUrl: './post-feed-box.component.html',
  styleUrls: ['./post-feed-box.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class PostFeedBoxComponent implements OnInit {
  @Input() currentUser: User;
  feedImageSrc: any = null;
  onErrorImage: string = "https://www.cambridgesuitestoronto.com/resourcefiles/attractionsmallimages/cn-tower-toronto-ontario-th.jpg";
  feedBody: string = '';

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  fileChangeListener($event) {
    // this.imageChangeEvent = $event;
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    var tempImage;
    myReader.onloadend =  (loadEvent: any) => {
      image.src = loadEvent.target.result;
      tempImage = loadEvent.target.result;
      this.feedImageSrc = tempImage;
      // that.cropper.setImage(image);
    };
    // this.imageSelected = true;
    myReader.readAsDataURL(file);
    // this.croppedImage = data2.image;
  }

  postFeed() {
    let feed: Feed = {
      comment: [],
      feedBody: this.feedBody,
      feedId: null,
      feedImage: this.feedImageSrc,
      like: [],
      timeStamp: new Date().getTime(),
      user: this.currentUser
    }
    if(feed.feedImage === null) {
      this.postService.storeFeed(feed, this.currentUser.userId).then((data)=> {
        console.log("Feed Stored")
      });
    } else if(feed.feedImage !== null) {
      this.postService.saveFeedWithImage(feed, this.currentUser.userId);
    }
    
    this.feedImageSrc = null;
    this.feedBody = "";
  }
}
