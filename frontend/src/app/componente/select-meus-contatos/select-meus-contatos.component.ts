import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { Usuario } from './../../servico/usuario/usuario';
import { UsuarioService } from './../../servico/usuario/usuario.service';

@Component({
  selector: 'app-select-meus-contatos',
  templateUrl: './select-meus-contatos.component.html',
  styleUrls: ['./select-meus-contatos.component.css']
})
export class SelectMeusContatosComponent implements OnInit {

  @Input() controladorFormulario: FormControl;
  @Input() obrigatorio = false;
  @Input() multiplo = false;
  @Input() reservadorEspaco: string;
  @Input() exibeErro: ErrorStateMatcher;
  @Input() idSelect: string;

  public lista: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private erroService: ErroService,
    private toaster: Toaster) { }

  get possuiReservadorEspaco(): boolean {
    return this.reservadorEspaco && this.reservadorEspaco !== '';
  }

  ngOnInit(): void {
    this.usuarioService.lista(
      true,
      null,
      null,
      null,
      null
    ).subscribe(page => {
      this.lista = page.conteudo;
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    });
  }

  calculaPlaceholder(): string {
    if (this.reservadorEspaco) {
      return this.reservadorEspaco;
    }
    return 'Meus contatos';
  }

  compara(usuario1: Usuario, usuario2: Usuario): boolean {
    return usuario1 && usuario2 && usuario1.id === usuario2.id;
  }

}
