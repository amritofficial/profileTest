import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDevfinderActivityComponent } from './guest-devfinder-activity.component';

describe('GuestDevfinderActivityComponent', () => {
  let component: GuestDevfinderActivityComponent;
  let fixture: ComponentFixture<GuestDevfinderActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestDevfinderActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestDevfinderActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
