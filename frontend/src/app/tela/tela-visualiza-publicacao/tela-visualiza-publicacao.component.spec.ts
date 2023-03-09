import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaVisualizaPublicacaoComponent } from './tela-visualiza-publicacao.component';

describe('TelaVisualizaPublicacaoComponent', () => {
  let component: TelaVisualizaPublicacaoComponent;
  let fixture: ComponentFixture<TelaVisualizaPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaVisualizaPublicacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaVisualizaPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
