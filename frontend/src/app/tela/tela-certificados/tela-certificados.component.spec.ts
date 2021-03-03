import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCertificadosComponent } from './tela-certificados.component';

describe('TelaCertificadosComponent', () => {
  let component: TelaCertificadosComponent;
  let fixture: ComponentFixture<TelaCertificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaCertificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
