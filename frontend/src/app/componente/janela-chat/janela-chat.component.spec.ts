import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanelaChatComponent } from './janela-chat.component';

describe('JanelaChatComponent', () => {
  let component: JanelaChatComponent;
  let fixture: ComponentFixture<JanelaChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JanelaChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JanelaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
