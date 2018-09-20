import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestProfileRightSidebarComponent } from './guest-profile-right-sidebar.component';

describe('GuestProfileRightSidebarComponent', () => {
  let component: GuestProfileRightSidebarComponent;
  let fixture: ComponentFixture<GuestProfileRightSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestProfileRightSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestProfileRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
