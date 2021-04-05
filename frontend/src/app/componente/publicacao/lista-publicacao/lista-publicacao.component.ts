import { Component, Input, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { PublicacaoService } from 'src/app/servico/publicacao/publicacao.service';
import { Publicacao } from './../../../servico/publicacao/publicacao';

@Component({
  selector: 'app-lista-publicacao',
  templateUrl: './lista-publicacao.component.html',
  styleUrls: ['./lista-publicacao.component.css']
})
export class ListaPublicacaoComponent implements OnInit {

  @Input() listaPublicacao: Publicacao[] = [];

  constructor(
    private publicacaoService: PublicacaoService,
    private erroService: ErroService,
    private toaster: Toaster
  ) {
    
  }

  ngOnInit(): void {
  }

}
