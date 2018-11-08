import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/services/user.service';
import { TagService } from 'app/shared/services/tag.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FinderTags } from 'app/shared/models/finder-tags';
import { User } from 'app/shared/models/user';
import { GuestProfileService } from 'app/shared/services/guest-profile.service';
import { WorkExperience } from 'app/shared/models/work-experience';
import { LinkSuggestion } from 'app/shared/view-models/link-suggestion';
import { LinkService } from 'app/shared/services/link.service';

var stringSimilarity = require('string-similarity');

@Component({
  selector: 'link-suggestions',
  templateUrl: './link-suggestions.component.html',
  styleUrls: ['./link-suggestions.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class LinkSuggestionsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  developersFinderTags: FinderTags[] = [];
  currentUserFinderTags: FinderTags;
  developers: User[] = [];
  currentUserId: any;
  linkSuggestions: LinkSuggestion[] = [];
  currentUserLinks: User[] = [];

  constructor(private userService: UserService,
    private tagService: TagService,
    private guestProfileService: GuestProfileService,
    private linkService: LinkService) { }

  ngOnInit() {
    this.currentUserId = this.userService.getCurrentUserId();
    this.getCurrentUserLinks();
    this.getAllDevelopers();
    this.getAllTags();
  }

  getAllTags() {
    this.tagService.getAllUsersFinderTags().pipe(takeUntil(this.ngUnsubscribe)).subscribe((tags) => {
      this.developersFinderTags = tags['results'];
      console.log("Link Suggestions")
      console.log(this.developersFinderTags);
      this.currentUserFinderTags = this.developersFinderTags.find(tags => { return tags.userId === this.currentUserId });
      console.log(this.currentUserFinderTags);
      this.developersFinderTags.splice(this.developersFinderTags.indexOf(this.currentUserFinderTags), 1);
      if (this.currentUserFinderTags !== undefined) {
        this.createLinkSuggestions();
      }
    });
  }

  getAllDevelopers() {
    this.userService.getAllUsersFromFirebase().pipe(takeUntil(this.ngUnsubscribe)).subscribe((developers: User[]) => {
      this.developers = developers
      console.log("Developers: ")
      let currentUser = this.developers.find(d => { return d.userId == this.currentUserId });
      this.developers.splice(this.developers.indexOf(currentUser), 1);
      this.linkService.linkList(this.currentUserId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((links: User[]) => {
        developers.forEach((developer, i) => {
          links.forEach(link => {
            if (developer.userId == link.userId) {
              console.log("Already there")
              console.log(developer)
              this.developers.splice(this.developers.indexOf(developer), 1);
            }
          });
        });
      });
      console.log(developers);
    });
  }

  getCurrentUserLinks() {
    // Remove developers who are already linked TODO
    this.linkService.linkList(this.currentUserId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((links: User[]) => {
      this.currentUserLinks = links;
      console.log(this.currentUserLinks)
      // links.forEach(link => {
      //   console.log("To Splice" + this.developers.indexOf(link));
      //   console.log(link);
      //   this.developers.splice(this.developers.indexOf(link), 1);
      // });
    });
  }

  createLinkSuggestions() {
    let currentUserFinderTags = this.currentUserFinderTags.tags.join();
    let currentUserSearchTags = this.createSearchStringWithSpace(currentUserFinderTags);
    this.developersFinderTags.forEach(finderTags => {
      let finderTagArray = finderTags.tags.join();
      let finderTagSearch = this.createSearchStringWithSpace(finderTagArray);
      let similarity = stringSimilarity.compareTwoStrings(currentUserSearchTags, finderTagSearch);
      let similarityPercentage = Math.round(similarity * 10000) / 100;
      let developer: User = this.developers.find(developer => { return developer.userId == finderTags.userId });
      console.log(similarityPercentage);
      let developerWorkExperience: WorkExperience[] = [];
      if (developer != undefined) {
        this.guestProfileService.getGuestProfileWorkExperience(developer.userId).then((data) => {
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              var object = data[i];
              developerWorkExperience.push(object.attributes);
            }
          }
          if (similarityPercentage > 20) {
            if (developer != undefined) {
              let jobTitle;
              if (developerWorkExperience.length > 0) {
                jobTitle = developerWorkExperience[developerWorkExperience.length - 1].jobTitle;
              }
              else {
                jobTitle = "Looking for job";
              }
              let linkSuggestion: LinkSuggestion = {
                jobTitle: jobTitle,
                user: developer
              }
              this.linkSuggestions.push(linkSuggestion);
            }
          }
          console.log(developerWorkExperience);
        });
      }


      // if (developer != undefined) {
      //   let profile: Profile = this.developersProfile.find(profile => { return finderTags.userId == profile.userId });
      //   let resultCard: ResultCard = {
      //     avatar: developer.avatar,
      //     distance: 0,
      //     jobTitle: "Full-Stack Developer",
      //     percentMatch: Math.round(similarityPercentage),
      //     username: developer.username,
      //     userId: developer.userId
      //   }
      // }
    });
    console.log("link suggestions Developers")
    console.log(this.linkSuggestions);
  }

  createSearchStringWithSpace(searchWithCommas: string) {
    let searchString = searchWithCommas.replace(/,/g, ' ');
    return searchString;
  }
}
