import { HttpErrorResponse } from '@angular/common/http';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { SetorEmpresaService } from './../../servico/setor-atuacao/setor-empresa.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SetorEmpresa } from 'src/app/servico/setor-atuacao/setor-empresa';

@Component({
  selector: 'app-select-setor-empresa',
  templateUrl: './select-setor-empresa.component.html',
  styleUrls: ['./select-setor-empresa.component.css']
})
export class SelectSetorEmpresaComponent implements OnInit {

  @Input() controladorFormulario: FormControl;
  @Input() obrigatorio = false;
  @Input() multiplo = false;
  @Input() reservadorEspaco: string;
  @Input() exibeErro: ErrorStateMatcher;
  @Input() idSelect: string;

  public lista: SetorEmpresa[] = [];

  constructor(
    private setorEmpresaService: SetorEmpresaService,
    private erroService: ErroService,
    private toaster: Toaster
  ) { }

  get possuiReservadorEspaco(): boolean {
    return this.reservadorEspaco && this.reservadorEspaco !== '';
  }

  ngOnInit(): void {
    this.setorEmpresaService.lista().subscribe(pagina => {
      this.lista = pagina.conteudo;
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error?.message, this.toaster);
    });
  }

  compara(obj1: SetorEmpresa, obj2: SetorEmpresa): boolean {
    return obj1 && obj2 && obj1.id === obj2.id;
  }

}
