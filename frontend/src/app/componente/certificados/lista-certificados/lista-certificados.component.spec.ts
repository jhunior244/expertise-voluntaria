import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCertificadosComponent } from './lista-certificados.component';

describe('ListaCertificadosComponent', () => {
  let component: ListaCertificadosComponent;
  let fixture: ComponentFixture<ListaCertificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCertificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
