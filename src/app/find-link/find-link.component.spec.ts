import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLinkComponent } from './find-link.component';

describe('FindLinkComponent', () => {
  let component: FindLinkComponent;
  let fixture: ComponentFixture<FindLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
