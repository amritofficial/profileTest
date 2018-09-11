import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListBarComponent } from './user-list-bar.component';

describe('UserListBarComponent', () => {
  let component: UserListBarComponent;
  let fixture: ComponentFixture<UserListBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
