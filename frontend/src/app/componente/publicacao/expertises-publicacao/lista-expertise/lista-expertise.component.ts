import { AreaAtuacao } from 'src/app/servico/area-atuacao/area-atuacao';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-expertise',
  templateUrl: './lista-expertise.component.html',
  styleUrls: ['./lista-expertise.component.css']
})
export class ListaExpertiseComponent implements OnInit {
  @Input() lista: AreaAtuacao[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
