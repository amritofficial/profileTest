import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFeedBoxComponent } from './post-feed-box.component';

describe('PostFeedBoxComponent', () => {
  let component: PostFeedBoxComponent;
  let fixture: ComponentFixture<PostFeedBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFeedBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFeedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
