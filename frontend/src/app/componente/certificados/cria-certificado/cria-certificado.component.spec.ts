import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriaCertificadoComponent } from './cria-certificado.component';

describe('CriaCertificadoComponent', () => {
  let component: CriaCertificadoComponent;
  let fixture: ComponentFixture<CriaCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriaCertificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriaCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
