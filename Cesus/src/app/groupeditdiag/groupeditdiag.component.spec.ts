import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeditdiagComponent } from './groupeditdiag.component';

describe('GroupeditdiagComponent', () => {
  let component: GroupeditdiagComponent;
  let fixture: ComponentFixture<GroupeditdiagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupeditdiagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeditdiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
