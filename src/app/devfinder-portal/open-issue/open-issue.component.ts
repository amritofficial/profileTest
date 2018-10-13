import { Component, OnInit } from '@angular/core';
import { DevFinderTag } from 'app/shared/models/devfinder-tag';
import { PortalService } from 'app/shared/services/portal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OpenIssue } from 'app/shared/models/open-issue';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/shared/models/user';

@Component({
  selector: 'open-issue',
  templateUrl: './open-issue.component.html',
  styleUrls: ['./open-issue.component.css']
})
export class OpenIssueComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  devfinderTags: DevFinderTag[] = [
    {
      description: '',
      objectId: null,
      tagName: 'java'
    },
    {
      description: '',
      objectId: null,
      tagName: 'javascript'
    }
  ]
  codeActivated: boolean = false;
  issueTextDescription: string = '';
  issueCodeDescription: string = '';
  parentTag: string = '';
  parentTagObjectId: any;
  issueTitle: string = '';
  dummyCode: string = `
  public static void main(String[] args) {
    String username;
    String city;
    String postalCode;
    
    @Override
    public void findLocation() {

    }

    public void storeLocation() {
      
    }
  }
  `;
  childTags: string[] = new Array();
  currentUser: User;

  constructor(private portalService: PortalService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserDataFromFirebase().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((user: User) => {
        this.currentUser = user;
      }); 
    this.portalService.getAllDevFinderTags().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(devfinderTags => {
        this.devfinderTags = devfinderTags['results'];
      });
  }

  activateCodeMode() {
    if (this.codeActivated === true) {
      this.codeActivated = false;
    }
    else {
      this.codeActivated = true;
      // this.codeTextArea.nativeElement.focus();
    }
  }

  onTagAdded(event) {
    this.childTags.push(event.value);
    console.log(this.childTags);
  }

  onTagRemoved(event) {
    this.childTags.splice(this.childTags.indexOf(event.value), 1);
    console.log(this.childTags);
  }

  selectedParentTag(selectedTag: DevFinderTag) {
    console.log(selectedTag);
    console.log(selectedTag.objectId);
    this.parentTag = selectedTag.tagName;
    this.parentTagObjectId = selectedTag.objectId;
  }

  openIssue() {
    let openIssueData: OpenIssue = {
      childrenTags: this.childTags,
      issueCodeDescription: this.issueCodeDescription,
      issueTextDescription: this.issueTextDescription,
      title: this.issueTitle,
      answers: [],
      objectId: null,
      parentTag: this.parentTag,
      parentTagObjectId: this.parentTagObjectId,
      timestamp: new Date().getTime(),
      userId: this.currentUser.userId,
      username: this.currentUser.username
    }
    console.log("Opened Issue")
    console.log(openIssueData);
    this.portalService.saveIssue(openIssueData).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        console.log("Issue Opened");
        console.log(data);
      });
  }

}