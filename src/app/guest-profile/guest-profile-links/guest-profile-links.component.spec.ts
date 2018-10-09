import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestProfileLinksComponent } from './guest-profile-links.component';

describe('GuestProfileLinksComponent', () => {
  let component: GuestProfileLinksComponent;
  let fixture: ComponentFixture<GuestProfileLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestProfileLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestProfileLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
