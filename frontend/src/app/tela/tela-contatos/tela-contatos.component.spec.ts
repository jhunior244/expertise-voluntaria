import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaContatosComponent } from './tela-contatos.component';

describe('TelaContatosComponent', () => {
  let component: TelaContatosComponent;
  let fixture: ComponentFixture<TelaContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaContatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
