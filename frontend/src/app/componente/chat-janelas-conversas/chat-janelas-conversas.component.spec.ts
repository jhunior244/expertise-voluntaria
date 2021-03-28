import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatJanelasConversasComponent } from './chat-janelas-conversas.component';

describe('ChatJanelasConversasComponent', () => {
  let component: ChatJanelasConversasComponent;
  let fixture: ComponentFixture<ChatJanelasConversasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatJanelasConversasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatJanelasConversasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
