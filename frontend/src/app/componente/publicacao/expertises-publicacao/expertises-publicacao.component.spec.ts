import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertisesPublicacaoComponent } from './expertises-publicacao.component';

describe('ExpertisesPublicacaoComponent', () => {
  let component: ExpertisesPublicacaoComponent;
  let fixture: ComponentFixture<ExpertisesPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertisesPublicacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertisesPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
