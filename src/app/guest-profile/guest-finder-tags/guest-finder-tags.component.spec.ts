import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestFinderTagsComponent } from './guest-finder-tags.component';

describe('GuestFinderTagsComponent', () => {
  let component: GuestFinderTagsComponent;
  let fixture: ComponentFixture<GuestFinderTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestFinderTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestFinderTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
