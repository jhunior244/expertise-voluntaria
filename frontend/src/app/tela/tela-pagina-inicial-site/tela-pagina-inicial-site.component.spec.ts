import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPaginaInicialSiteComponent } from './tela-pagina-inicial-site.component';

describe('TelaPaginaInicialSiteComponent', () => {
  let component: TelaPaginaInicialSiteComponent;
  let fixture: ComponentFixture<TelaPaginaInicialSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaPaginaInicialSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPaginaInicialSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
