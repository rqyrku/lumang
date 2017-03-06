import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { +loginComponent } from './+login.component';

describe('+loginComponent', () => {
  let component: +loginComponent;
  let fixture: ComponentFixture<+loginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ +loginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(+loginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
