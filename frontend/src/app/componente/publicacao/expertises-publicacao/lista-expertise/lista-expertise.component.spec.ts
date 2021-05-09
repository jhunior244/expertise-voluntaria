import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaExpertiseComponent } from './lista-expertise.component';

describe('ListaExpertiseComponent', () => {
  let component: ListaExpertiseComponent;
  let fixture: ComponentFixture<ListaExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaExpertiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
