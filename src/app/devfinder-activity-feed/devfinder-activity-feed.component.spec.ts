import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfinderActivityFeedComponent } from './devfinder-activity-feed.component';

describe('DevfinderActivityFeedComponent', () => {
  let component: DevfinderActivityFeedComponent;
  let fixture: ComponentFixture<DevfinderActivityFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfinderActivityFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfinderActivityFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
