import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaVisualizaPerfilUsuarioComponent } from './tela-visualiza-perfil-usuario.component';

describe('TelaVisualizaPerfilUsuarioComponent', () => {
  let component: TelaVisualizaPerfilUsuarioComponent;
  let fixture: ComponentFixture<TelaVisualizaPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaVisualizaPerfilUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaVisualizaPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
