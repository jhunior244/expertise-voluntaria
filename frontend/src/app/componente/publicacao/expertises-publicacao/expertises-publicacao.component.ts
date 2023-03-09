import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaAtuacao } from 'src/app/servico/area-atuacao/area-atuacao';

@Component({
  selector: 'app-expertises-publicacao',
  templateUrl: './expertises-publicacao.component.html',
  styleUrls: ['./expertises-publicacao.component.css']
})
export class ExpertisesPublicacaoComponent implements OnInit {
  public lista: AreaAtuacao[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: AreaAtuacao[]) {
    this.lista = data;
   }

  ngOnInit(): void {
  }

}
