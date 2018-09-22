import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderTagsComponent } from './finder-tags.component';

describe('FinderTagsComponent', () => {
  let component: FinderTagsComponent;
  let fixture: ComponentFixture<FinderTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinderTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinderTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
