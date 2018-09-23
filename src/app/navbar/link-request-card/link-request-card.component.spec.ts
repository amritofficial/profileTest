import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkRequestCardComponent } from './link-request-card.component';

describe('LinkRequestCardComponent', () => {
  let component: LinkRequestCardComponent;
  let fixture: ComponentFixture<LinkRequestCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkRequestCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
