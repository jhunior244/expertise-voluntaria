import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTipoPublicacaoComponent } from './select-tipo-publicacao.component';

describe('SelectTipoPublicacaoComponent', () => {
  let component: SelectTipoPublicacaoComponent;
  let fixture: ComponentFixture<SelectTipoPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTipoPublicacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTipoPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
