import { Component, OnInit } from '@angular/core';
import { FinderTags } from '../../shared/models/finder-tags';
import { TagService } from '../../shared/services/tag.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'finder-tags',
  templateUrl: './finder-tags.component.html',
  styleUrls: ['./finder-tags.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class FinderTagsComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  finderTags: FinderTags = {
    userId: null,
    tags: []
  };

  addTag: boolean = false;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.getTags();
  }

  addTags() {
    this.addTag = true;
  }

  onTagAdded(event) {
    this.finderTags.tags.push(event.value);
    console.log(this.finderTags.tags);
  }

  onTagRemoved(event) {
    this.finderTags.tags.splice(this.finderTags.tags.indexOf(event.value), 1);
    console.log(this.finderTags.tags);
  }

  saveTags() {
    this.finderTags.userId = window.sessionStorage.getItem("current_user_id");
    this.tagService.saveFinderTags(this.finderTags)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((tags) => {
        console.log(tags);
        console.log("Success");
        this.addTag = false;
      });
  }

  getTags(){
    let userId = window.sessionStorage.getItem("current_user_id");
    this.tagService.getCurrentUserTags(userId).then(tags => {
      console.log("TAGS")
      console.log(tags);
      console.log(tags.attributes)
    })
  }

}
