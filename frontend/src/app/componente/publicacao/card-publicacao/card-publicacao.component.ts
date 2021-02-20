import { Publicacao } from './../../../servico/publicacao/publicacao';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-publicacao',
  templateUrl: './card-publicacao.component.html',
  styleUrls: ['./card-publicacao.component.css']
})
export class CardPublicacaoComponent implements OnInit, OnChanges {

  @Input() publicacao: Publicacao;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }

}
