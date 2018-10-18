import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCardTaggedComponent } from './issue-card-tagged.component';

describe('IssueCardTaggedComponent', () => {
  let component: IssueCardTaggedComponent;
  let fixture: ComponentFixture<IssueCardTaggedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueCardTaggedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCardTaggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
