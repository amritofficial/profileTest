import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Feed } from '../models/feed';

@Injectable()
export class PostService {

  constructor(private firebaseService: FirebaseService) { }

  storeFeed(feed: Feed, userId: any) {
    return this.firebaseService.storeFeed(feed, userId);
  }
}
