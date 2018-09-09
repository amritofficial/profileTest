import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerMessageBoxComponent } from './messenger-message-box.component';

describe('MessengerMessageBoxComponent', () => {
  let component: MessengerMessageBoxComponent;
  let fixture: ComponentFixture<MessengerMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
