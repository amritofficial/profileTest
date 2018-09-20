import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestProfileFeedComponent } from './guest-profile-feed.component';

describe('GuestProfileFeedComponent', () => {
  let component: GuestProfileFeedComponent;
  let fixture: ComponentFixture<GuestProfileFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestProfileFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestProfileFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
