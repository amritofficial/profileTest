import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWorkExperienceComponent } from './profile-work-experience.component';

describe('ProfileWorkExperienceComponent', () => {
  let component: ProfileWorkExperienceComponent;
  let fixture: ComponentFixture<ProfileWorkExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileWorkExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
