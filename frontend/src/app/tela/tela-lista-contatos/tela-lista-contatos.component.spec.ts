import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaListaContatosComponent } from './tela-lista-contatos.component';

describe('TelaListaContatosComponent', () => {
  let component: TelaListaContatosComponent;
  let fixture: ComponentFixture<TelaListaContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaListaContatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaListaContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
