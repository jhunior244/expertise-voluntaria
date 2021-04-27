import { configuracao } from './../../../configuracao';
import { Component, Input, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Certificado } from './../../../servico/certificado/certificado';

@Component({
  selector: 'app-card-certificado',
  templateUrl: './card-certificado.component.html',
  styleUrls: ['./card-certificado.component.css']
})
export class CardCertificadoComponent implements OnInit, OnChanges {

  @Input() certificado: Certificado;
  public url = configuracao.hostFrontend + '/' + configuracao.rotaVisualizaCertificado;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes.certificado.currentValue){
      this.url += '/' + this.certificado.id;
    }
  }

}
