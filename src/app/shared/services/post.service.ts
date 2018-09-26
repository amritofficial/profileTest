import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Feed } from '../models/feed';
import { Like } from '../models/like';
import { Comment } from '../models/comment';

@Injectable()
export class PostService {

  constructor(private firebaseService: FirebaseService) { }

  storeFeed(feed: Feed, userId: any) {
    return this.firebaseService.storeFeed(feed, userId);
  }

  deleteFeed(userId: any, feedId: any) {
    return this.firebaseService.deleteFeed(userId, feedId);
  }

  getFeed(userId: any) {
    return this.firebaseService.getFeed(userId);
  }

  likeFeed(feedUserId: any, feedId: any, likeArray: Like[]) {
    return this.firebaseService.likeFeed(feedUserId, feedId, likeArray);
  }

  dislikeFeed(feedUserId: any, feedId: any, likeArray: Like[]) {
    return this.firebaseService.dislikeFeed(feedUserId, feedId, likeArray);
  }

  commentFeed(feedUserId: any, feedId: any, commentArray: Comment[]) {
    return this.firebaseService.commentFeed(feedUserId, feedId, commentArray);
  }

  deleteCommentFeed(feedUserId: any, feedId: any, commentArray: Comment[]) {
    return this.firebaseService.deleteCommentFeed(feedUserId, feedId, commentArray);
  }

}
