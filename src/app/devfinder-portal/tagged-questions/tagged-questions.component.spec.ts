import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedQuestionsComponent } from './tagged-questions.component';

describe('TaggedQuestionsComponent', () => {
  let component: TaggedQuestionsComponent;
  let fixture: ComponentFixture<TaggedQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
