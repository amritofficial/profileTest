import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerUserCardComponent } from './messenger-user-card.component';

describe('MessengerUserCardComponent', () => {
  let component: MessengerUserCardComponent;
  let fixture: ComponentFixture<MessengerUserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerUserCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
