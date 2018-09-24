import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Feed } from '../models/feed';
import { Like } from '../models/like';

@Injectable()
export class PostService {

  constructor(private firebaseService: FirebaseService) { }

  storeFeed(feed: Feed, userId: any) {
    return this.firebaseService.storeFeed(feed, userId);
  }

  getFeed(userId: any) {
    return this.firebaseService.getFeed(userId);
  }

  likeFeed(userId: any, feedId: any, likeArray: Like[]) {
    return this.firebaseService.likeFeed(userId, feedId, likeArray);
  }

  dislikeFeed(userId: any, feedId: any, likeArray: Like[]) {
    return this.firebaseService.dislikeFeed(userId, feedId, likeArray);
  }

}
