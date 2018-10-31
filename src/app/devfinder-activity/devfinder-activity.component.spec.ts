import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfinderActivityComponent } from './devfinder-activity.component';

describe('DevfinderActivityComponent', () => {
  let component: DevfinderActivityComponent;
  let fixture: ComponentFixture<DevfinderActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfinderActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfinderActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
