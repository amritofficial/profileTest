import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerUserOptionsComponent } from './messenger-user-options.component';

describe('MessengerUserOptionsComponent', () => {
  let component: MessengerUserOptionsComponent;
  let fixture: ComponentFixture<MessengerUserOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerUserOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerUserOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
