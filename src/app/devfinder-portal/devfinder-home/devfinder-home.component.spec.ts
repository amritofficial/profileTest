import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfinderHomeComponent } from './devfinder-home.component';

describe('DevfinderHomeComponent', () => {
  let component: DevfinderHomeComponent;
  let fixture: ComponentFixture<DevfinderHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfinderHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfinderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
