import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateListComponent } from './private-list.component';

describe('PrivateListComponent', () => {
  let component: PrivateListComponent;
  let fixture: ComponentFixture<PrivateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
