import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSetorEmpresaComponent } from './select-setor-empresa.component';

describe('SelectSetorEmpresaComponent', () => {
  let component: SelectSetorEmpresaComponent;
  let fixture: ComponentFixture<SelectSetorEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSetorEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSetorEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
