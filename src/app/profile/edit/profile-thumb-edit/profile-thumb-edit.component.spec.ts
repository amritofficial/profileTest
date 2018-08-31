import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileThumbEditComponent } from './profile-thumb-edit.component';

describe('ProfileThumbEditComponent', () => {
  let component: ProfileThumbEditComponent;
  let fixture: ComponentFixture<ProfileThumbEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileThumbEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileThumbEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
