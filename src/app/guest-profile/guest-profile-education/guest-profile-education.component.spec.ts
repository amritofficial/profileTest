import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestProfileEducationComponent } from './guest-profile-education.component';

describe('GuestProfileEducationComponent', () => {
  let component: GuestProfileEducationComponent;
  let fixture: ComponentFixture<GuestProfileEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestProfileEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestProfileEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
