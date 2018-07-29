import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIntroEditComponent } from './profile-intro-edit.component';

describe('ProfileIntroEditComponent', () => {
  let component: ProfileIntroEditComponent;
  let fixture: ComponentFixture<ProfileIntroEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileIntroEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileIntroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
