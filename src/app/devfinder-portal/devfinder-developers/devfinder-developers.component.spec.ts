import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevfinderDevelopersComponent } from './devfinder-developers.component';

describe('DevfinderDevelopersComponent', () => {
  let component: DevfinderDevelopersComponent;
  let fixture: ComponentFixture<DevfinderDevelopersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevfinderDevelopersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevfinderDevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
