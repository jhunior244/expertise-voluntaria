import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaChatMinimizadoComponent } from './lista-chat-minimizado.component';

describe('ListaChatMinimizadoComponent', () => {
  let component: ListaChatMinimizadoComponent;
  let fixture: ComponentFixture<ListaChatMinimizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaChatMinimizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaChatMinimizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
