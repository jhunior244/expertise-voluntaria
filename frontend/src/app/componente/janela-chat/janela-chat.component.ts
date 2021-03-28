import { TelaInicioService } from 'src/app/tela/tela-inicio/tela-inicio.service';
import { UsuarioService } from 'src/app/servico/usuario/usuario.service';
import { SessaoService } from './../../core/sessao/sessao.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { Conversa } from 'src/app/servico/usuario/conversa';
import { Mensagem } from './../../servico/usuario/mensagem';
import { MensagemService } from './../../servico/usuario/mensagem.service';
import * as moment from 'moment';

@Component({
  selector: 'app-janela-chat',
  templateUrl: './janela-chat.component.html',
  styleUrls: ['./janela-chat.component.css']
})
export class JanelaChatComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  public mensagem = new FormControl(null);
  public minimizado = false;
  @Input() conversa: Conversa;
  public listaMensagem: Mensagem[] = [];
  public emaillUsuarioLogado = '';
  private intervalAtualizaMensagem: any;

  public close = false;

  @ViewChild('historicoMensagem') historicoMensagem: ElementRef;
  constructor(
    public dialog: MatDialog,
    private mensagemService: MensagemService,
    private erroService: ErroService,
    private toaster: Toaster,
    private telaInicioService: TelaInicioService,
    private usuarioService: UsuarioService
  ) {
    this.emaillUsuarioLogado = this.usuarioService.getEmail();
  }

  get habilitaBotaoEnviar(): boolean { return !(this.mensagem.value === '' || this.mensagem.value === null); }

  ngOnInit(): void {
    this.intervalAtualizaMensagem = setInterval(() => {
      if (this.listaMensagem?.length > 0) {
        this.atualizaListaMensagem(this.listaMensagem[this.listaMensagem.length - 1].id);
      } else {
        this.atualizaListaMensagem(null);
      }
    }, 5000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.conversa.currentValue != null) {
      this.mensagemService.listaParaChat(this.conversa.id).subscribe(page => {
        this.listaMensagem = page.conteudo;
        setTimeout(() => {
          this.scrolParaUltimaMensagem();
        }, 1000);
      }, (erro: HttpErrorResponse) => {
        console.log(erro);
        this.dialog.closeAll();
        this.erroService.exibeMensagemErro(erro.error.erro, this.toaster);
      });
    }
  }

  ngAfterViewInit(): void {
    this.scrolParaUltimaMensagem();
  }

  atualizaListaMensagem(idUltimaMensagem: string): void {
    this.mensagemService.atualizaMensagem(this.conversa.id, idUltimaMensagem).subscribe(lista => {
      this.listaMensagem = this.listaMensagem.concat(lista);
      setTimeout(() => {
        this.scrolParaUltimaMensagem();
      }, 1000);
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.dialog.closeAll();
      this.erroService.exibeMensagemErro(erro.error.erro, this.toaster);
    });
  }

  minimizaMaximinizaChat(): void {
    this.telaInicioService.minimizaJanelaChat(this.conversa);

  }

  fecha(conversa: Conversa): void {
    this.telaInicioService.fechaJanelaChat(conversa);
  }

  enviarMensagem(): void {
    const mensagem = new Mensagem();
    mensagem.texto = this.mensagem.value.trim();
    this.mensagem.setValue('');
    mensagem.conversa = this.conversa;
    mensagem.data = moment();
    this.mensagemService.enviaMensagem(mensagem).subscribe(mensagemCriada => {
      this.listaMensagem.push(mensagemCriada);
      setTimeout(() => {
        this.scrolParaUltimaMensagem();
      }, 1000);
    });
  }

  scrolParaUltimaMensagem(): void {
    if (this.historicoMensagem) {
      this.historicoMensagem.nativeElement.scrollTop = this.historicoMensagem.nativeElement.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    if (this.intervalAtualizaMensagem) {
      clearInterval(this.intervalAtualizaMensagem);
    }
  }
}
