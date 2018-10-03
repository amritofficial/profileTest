import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLinksComponent } from './profile-links.component';

describe('ProfileLinksComponent', () => {
  let component: ProfileLinksComponent;
  let fixture: ComponentFixture<ProfileLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
