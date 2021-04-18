import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPesquisaUsuariosComponent } from './tela-pesquisa-usuarios.component';

describe('TelaPesquisaUsuariosComponent', () => {
  let component: TelaPesquisaUsuariosComponent;
  let fixture: ComponentFixture<TelaPesquisaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaPesquisaUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPesquisaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
