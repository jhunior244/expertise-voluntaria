import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Toaster } from 'ngx-toast-notifications';
import { TipoUsuarioService } from 'src/app/servico/usuario/tipo-usuario.service';
import { ErroService } from './../../core/erro/erro.service';
import { TipoUsuario } from './../../servico/usuario/tipo-usuario';

@Component({
  selector: 'app-select-tipo-usuario',
  templateUrl: './select-tipo-usuario.component.html',
  styleUrls: ['./select-tipo-usuario.component.css']
})
export class SelectTipoUsuarioComponent implements OnInit {

  @Input() controladorFormulario: FormControl;
  @Input() obrigatorio = false;
  @Input() multiplo = false;
  @Input() reservadorEspaco: string;
  @Input() exibeErro: ErrorStateMatcher;
  @Input() idSelect: string;

  public lista: TipoUsuario[] = [];

  constructor(
    private tipoUsuarioService: TipoUsuarioService,
    private erroService: ErroService,
    private toaster: Toaster) { }

  get possuiReservadorEspaco(): boolean {
    return this.reservadorEspaco && this.reservadorEspaco !== '';
  }

  ngOnInit() {
    this.tipoUsuarioService.lista().subscribe(lista => {
      this.lista = lista;
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    });
  }



  compara(tipo1: TipoUsuario, tipo2: TipoUsuario): boolean {
    return tipo1 && tipo2 && tipo1.id === tipo2.id;
  }
}
