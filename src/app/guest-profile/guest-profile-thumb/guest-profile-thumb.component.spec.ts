import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestProfileThumbComponent } from './guest-profile-thumb.component';

describe('GuestProfileThumbComponent', () => {
  let component: GuestProfileThumbComponent;
  let fixture: ComponentFixture<GuestProfileThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestProfileThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestProfileThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
