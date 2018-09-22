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

  displayFinderTags: FinderTags = {
    userId: null,
    tags: []
  };

  updatedFinderTags: FinderTags = {
    userId: null,
    tags: []
  }; 

  finderTags: FinderTags = {
    userId: null,
    tags: []
  };

  finderTagObjectId: any;

  loadingTags: boolean = false;
  addTag: boolean = false;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.loadingTags = true;
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

  onUpdateTagAdded(event) {
    this.updatedFinderTags.tags.push(event.value);
    console.log(this.updatedFinderTags.tags);
  }

  onUpdateTagRemoved(event) {
    console.log(event);
    this.updatedFinderTags.tags.splice(this.updatedFinderTags.tags.indexOf(event), 1);
    console.log(this.updatedFinderTags.tags);
  }

  saveTags() {
    this.finderTags.userId = window.sessionStorage.getItem("current_user_id");
    this.tagService.saveFinderTags(this.finderTags)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((tags) => {
        console.log(tags);
        console.log("Success");
        this.addTag = false;
        this.getTags();
      });
  }

  getTags() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.tagService.getCurrentUserTags(userId).then(tags => {
      if (tags.length !== 0) {
        console.log("TAGS")
        console.log(tags);
        this.finderTagObjectId = tags[0].id;
        this.displayFinderTags = tags[0].attributes;
        this.updatedFinderTags = JSON.parse(JSON.stringify(this.displayFinderTags));
        console.log(this.displayFinderTags);
        this.loadingTags = false;
      } else {
        console.log("nothing found")
        this.loadingTags = false;
      }
    });
  }

  closeAddTag() {
    this.addTag = false;
  }

  updateFinderTags() {
    this.loadingTags = true;
    this.tagService.updateCurrentFinderTags(this.finderTagObjectId).then((tags) => {
      tags.set("tags", this.updatedFinderTags.tags);
      tags.save();
      this.addTag = false;
      this.loadingTags = false;
      console.log("Saved");
      this.getTags();
    })
  }

}
