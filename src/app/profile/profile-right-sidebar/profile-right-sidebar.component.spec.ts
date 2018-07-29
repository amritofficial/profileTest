import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRightSidebarComponent } from './profile-right-sidebar.component';

describe('ProfileRightSidebarComponent', () => {
  let component: ProfileRightSidebarComponent;
  let fixture: ComponentFixture<ProfileRightSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRightSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
