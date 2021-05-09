import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPublicacaoComponent } from './select-publicacao.component';

describe('SelectPublicacaoComponent', () => {
  let component: SelectPublicacaoComponent;
  let fixture: ComponentFixture<SelectPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPublicacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
