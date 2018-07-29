import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfinderPortalComponent } from './devfinder-portal.component';

describe('DevfinderPortalComponent', () => {
  let component: DevfinderPortalComponent;
  let fixture: ComponentFixture<DevfinderPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfinderPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfinderPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
