import { Certificado } from './../../../servico/certificado/certificado';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-certificado',
  templateUrl: './card-certificado.component.html',
  styleUrls: ['./card-certificado.component.css']
})
export class CardCertificadoComponent implements OnInit {

  @Input() certificado: Certificado;
  
  constructor() { }

  ngOnInit(): void {
  }

}
