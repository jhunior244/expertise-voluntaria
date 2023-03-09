import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaVisualizaCertificadoComponent } from './tela-visualiza-certificado.component';

describe('TelaVisualizaCertificadoComponent', () => {
  let component: TelaVisualizaCertificadoComponent;
  let fixture: ComponentFixture<TelaVisualizaCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaVisualizaCertificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaVisualizaCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
