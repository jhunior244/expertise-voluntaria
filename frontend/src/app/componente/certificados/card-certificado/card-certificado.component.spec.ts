import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCertificadoComponent } from './card-certificado.component';

describe('CardCertificadoComponent', () => {
  let component: CardCertificadoComponent;
  let fixture: ComponentFixture<CardCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCertificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
