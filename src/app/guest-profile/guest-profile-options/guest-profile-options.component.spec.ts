import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestProfileOptionsComponent } from './guest-profile-options.component';

describe('GuestProfileOptionsComponent', () => {
  let component: GuestProfileOptionsComponent;
  let fixture: ComponentFixture<GuestProfileOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestProfileOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestProfileOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
