import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverTimeDialogComponent } from './over-time-dialog.component';

describe('OverTimeDialogComponent', () => {
  let component: OverTimeDialogComponent;
  let fixture: ComponentFixture<OverTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverTimeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
