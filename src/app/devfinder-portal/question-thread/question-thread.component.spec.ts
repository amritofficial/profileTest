import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionThreadComponent } from './question-thread.component';

describe('QuestionThreadComponent', () => {
  let component: QuestionThreadComponent;
  let fixture: ComponentFixture<QuestionThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
