import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPublicacaoComponent } from './lista-publicacao.component';

describe('ListaPublicacaoComponent', () => {
  let component: ListaPublicacaoComponent;
  let fixture: ComponentFixture<ListaPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPublicacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
