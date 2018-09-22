import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLocationModalComponent } from './profile-location-modal.component';

describe('ProfileLocationModalComponent', () => {
  let component: ProfileLocationModalComponent;
  let fixture: ComponentFixture<ProfileLocationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLocationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
