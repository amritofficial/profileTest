import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFeedComponent } from './profile-feed.component';

describe('ProfileFeedComponent', () => {
  let component: ProfileFeedComponent;
  let fixture: ComponentFixture<ProfileFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
