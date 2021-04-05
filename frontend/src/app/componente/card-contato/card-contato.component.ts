import { TelaInicioService } from 'src/app/tela/tela-inicio/tela-inicio.service';
import { ConversaService } from './../../servico/usuario/conversa.service';
import { UsuarioService } from './../../servico/usuario/usuario.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Usuario } from 'src/app/servico/usuario/usuario';
import { MatDialog } from '@angular/material/dialog';
import { DialogoAguardeComponent } from '../dialogo-aguarde/dialogo-aguarde.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErroService } from 'src/app/core/erro/erro.service';
import { Toaster } from 'ngx-toast-notifications';
import { Conversa } from 'src/app/servico/usuario/conversa';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent implements OnInit, OnChanges {

  @Input() usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private erroService: ErroService,
    private toaster: Toaster,
    private conversaService: ConversaService,
    private telaInicioService: TelaInicioService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }


  adicionaContato() {
    this.dialog.open(DialogoAguardeComponent, DialogoAguardeComponent.configProgressSpinner);
    this.usuarioService.adicionaContato(this.usuario).subscribe(usuarioAtualizado => {
      this.usuario = usuarioAtualizado;
      this.dialog.closeAll();
      this.erroService.exibeMensagemSucesso('Contato adicionado com sucesso!', this.toaster);
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.dialog.closeAll();
      this.erroService.exibeMensagemErro(erro.error.erro, this.toaster);
    });
  }

  enviarMensagem(usuario: Usuario): void{
    const conversa = new Conversa();
    conversa.contato = usuario;
    this.conversaService.cria(conversa).subscribe(conversaRetornada => {
      this.telaInicioService.abreNovaJanelaChat(conversaRetornada);
    });
  }

}
