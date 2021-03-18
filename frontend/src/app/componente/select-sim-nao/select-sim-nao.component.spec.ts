import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSimNaoComponent } from './select-sim-nao.component';

describe('SelectSimNaoComponent', () => {
  let component: SelectSimNaoComponent;
  let fixture: ComponentFixture<SelectSimNaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSimNaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSimNaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
