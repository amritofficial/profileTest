import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestProfileIntroComponent } from './guest-profile-intro.component';

describe('GuestProfileIntroComponent', () => {
  let component: GuestProfileIntroComponent;
  let fixture: ComponentFixture<GuestProfileIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestProfileIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestProfileIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
