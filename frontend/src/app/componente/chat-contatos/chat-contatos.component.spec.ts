import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContatosComponent } from './chat-contatos.component';

describe('ChatContatosComponent', () => {
  let component: ChatContatosComponent;
  let fixture: ComponentFixture<ChatContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatContatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
