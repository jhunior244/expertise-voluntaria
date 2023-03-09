import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversaChatComponent } from './conversa-chat.component';

describe('ConversaChatComponent', () => {
  let component: ConversaChatComponent;
  let fixture: ComponentFixture<ConversaChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversaChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
