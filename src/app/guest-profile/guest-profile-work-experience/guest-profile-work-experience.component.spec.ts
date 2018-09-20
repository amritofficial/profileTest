import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestProfileWorkExperienceComponent } from './guest-profile-work-experience.component';

describe('GuestProfileWorkExperienceComponent', () => {
  let component: GuestProfileWorkExperienceComponent;
  let fixture: ComponentFixture<GuestProfileWorkExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestProfileWorkExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestProfileWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
