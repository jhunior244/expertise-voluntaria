import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAreaAtuacaoComponent } from './select-area-atuacao.component';

describe('SelectAreaAtuacaoComponent', () => {
  let component: SelectAreaAtuacaoComponent;
  let fixture: ComponentFixture<SelectAreaAtuacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAreaAtuacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAreaAtuacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
