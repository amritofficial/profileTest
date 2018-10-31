import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfinderTagsComponent } from './devfinder-tags.component';

describe('DevfinderTagsComponent', () => {
  let component: DevfinderTagsComponent;
  let fixture: ComponentFixture<DevfinderTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfinderTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfinderTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
