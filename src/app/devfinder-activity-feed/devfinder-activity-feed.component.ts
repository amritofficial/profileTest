import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'app/shared/services/activity.service';
import { QuestionThread } from 'app/shared/view-models/question-thread';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/shared/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'devfinder-activity-feed',
  templateUrl: './devfinder-activity-feed.component.html',
  styleUrls: ['./devfinder-activity-feed.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class DevfinderActivityFeedComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  issues: QuestionThread[] = [];
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private activityService: ActivityService,
    private userService: UserService) { }

  ngOnInit() {
    this.activityService.getIssues().pipe(takeUntil(this.ngUnsubscribe)).subscribe((issues) => {
      if (issues['results'].length > 0) {
        this.issues = issues['results'];
        this.userService.getAllUsersFromFirebase().pipe(takeUntil(this.ngUnsubscribe)).subscribe((users: User[]) => {
          this.users = users;
          // console.log(this.issues);
          // console.log(this.users);
          this.issues.forEach(issue => {
            let questionUser = this.users.find(u => { return u.userId == issue.userId });
            if (questionUser != undefined) {
              this.filteredUsers.push(questionUser);
            }
            issue.answers.forEach(answer => {
              let answerUser = this.users.find(u => u.userId == answer.user.userId);
              if (answerUser != undefined) {
                if (this.filteredUsers.includes(answerUser) == false) {
                  this.filteredUsers.push(answerUser);
                }
              }
            });
          });
          console.log(this.filteredUsers);
        });
      }
    });
  }

  getAvatar(userId: any) {
    let user = this.filteredUsers.find(u => { return u.userId == userId});
    let avatar = "";
    if (user != undefined) {
      avatar = user.avatar;
    }
    return avatar;
  }

  getUsername(userId: any) {
    let user = this.filteredUsers.find(u => { return u.userId == userId});
    let username = "";
    if (user != undefined) {
      username = user.username;
    }
    return username;
  }

  getAnswers(issue: QuestionThread) {
    return issue.answers;
  }

}
