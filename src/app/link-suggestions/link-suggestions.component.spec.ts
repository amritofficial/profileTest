import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSuggestionsComponent } from './link-suggestions.component';

describe('LinkSuggestionsComponent', () => {
  let component: LinkSuggestionsComponent;
  let fixture: ComponentFixture<LinkSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
