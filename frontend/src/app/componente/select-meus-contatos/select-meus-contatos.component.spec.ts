import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMeusContatosComponent } from './select-meus-contatos.component';

describe('SelectMeusContatosComponent', () => {
  let component: SelectMeusContatosComponent;
  let fixture: ComponentFixture<SelectMeusContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMeusContatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMeusContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
