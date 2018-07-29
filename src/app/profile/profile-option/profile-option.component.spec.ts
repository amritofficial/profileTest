import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOptionComponent } from './profile-option.component';

describe('ProfileOptionComponent', () => {
  let component: ProfileOptionComponent;
  let fixture: ComponentFixture<ProfileOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
