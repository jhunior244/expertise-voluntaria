import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaListaPublicacaoComponent } from './tela-lista-publicacao.component';

describe('TelaListaPublicacaoComponent', () => {
  let component: TelaListaPublicacaoComponent;
  let fixture: ComponentFixture<TelaListaPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaListaPublicacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaListaPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
