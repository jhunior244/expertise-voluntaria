import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configuracao } from './../../configuracao';

@Injectable({ providedIn: 'root' })
export class AvaliacaoService {
    private url = configuracao.rotaBackendPrivado + '/avaliacao';
    private httpHeader = new HttpHeaders();

    constructor(
        private httpCliente: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public cria(avaliacao: number, idCertificado: string): Observable<void> {
        let httpParams = new HttpParams();

        if (avaliacao != null) {
            httpParams = httpParams.append('avaliacao', avaliacao.toString());
        }

        if (idCertificado != null) {
            httpParams = httpParams.append('idCertificado', idCertificado);
        }

        return this.httpCliente.get<void>(this.url + '/cria', { params: httpParams });

    }
}
