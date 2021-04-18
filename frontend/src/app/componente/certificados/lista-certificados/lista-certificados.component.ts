import { CertificadoService } from './../../../servico/certificado/certificado.service';
import { Component, OnInit } from '@angular/core';
import { Certificado } from 'src/app/servico/certificado/certificado';

@Component({
  selector: 'app-lista-certificados',
  templateUrl: './lista-certificados.component.html',
  styleUrls: ['./lista-certificados.component.css']
})
export class ListaCertificadosComponent implements OnInit {
  public listaCertificado: Certificado[];
  constructor(
    private certificadoService: CertificadoService
  ) { }

  ngOnInit(): void {
    this.certificadoService.lista(null).subscribe(retorno => {
      this.listaCertificado = retorno.conteudo;
    });
  }

}
