import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAguardeComponent } from './dialogo-aguarde.component';

describe('DialogoAguardeComponent', () => {
  let component: DialogoAguardeComponent;
  let fixture: ComponentFixture<DialogoAguardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoAguardeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoAguardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
