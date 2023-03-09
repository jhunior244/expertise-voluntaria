import { TelaInicioService } from './../../tela/tela-inicio/tela-inicio.service';
import { Estado } from './../../servico/usuario/estado';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { EstadoService } from 'src/app/servico/usuario/estado.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { TipoUsuario } from 'src/app/servico/usuario/tipo-usuario';

@Component({
  selector: 'app-select-estado',
  templateUrl: './select-estado.component.html',
  styleUrls: ['./select-estado.component.css']
})
export class SelectEstadoComponent implements OnInit, OnChanges {

  @Input() controladorFormulario: FormControl;
  @Input() obrigatorio = false;
  @Input() multiplo = false;
  @Input() reservadorEspaco: string;
  @Input() exibeErro: ErrorStateMatcher;
  @Input() idSelect: string;
  @Input() exibeApenasUf = false;
  @Input() ufPrePreenchida: string;

  public lista: Estado[] = [];

  constructor(
    private estadoService: EstadoService,
    private erroService: ErroService,
    private toaster: Toaster,
    private telaInicioService: TelaInicioService) { }

  get possuiReservadorEspaco(): boolean {
    return this.reservadorEspaco && this.reservadorEspaco !== '';
  }

  ngOnInit(): void {
    this.estadoService.lista(null).subscribe(lista => {
      this.lista = lista;
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    });

    this.controladorFormulario.valueChanges.subscribe((cidade: Estado[]) => {
      this.telaInicioService.anunciaListaEstado(cidade);
    });
  }

  ngOnChanges(): void {
  }

  compara(obj1: Estado, obj2: Estado): boolean {
    return obj1 && obj2 && obj1.id === obj2.id;
  }

}
