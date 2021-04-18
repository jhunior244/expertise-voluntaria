import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPagina } from '../pagina/pagina';
import { configuracao } from './../../configuracao';
import { Certificado, ICertificado } from './certificado';

@Injectable({ providedIn: 'root' })
export class CertificadoService {
    private url = configuracao.rotaBackendPrivado + '/certificado';
    private httpHeader = new HttpHeaders();

    constructor(
        private httpCliente: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public cria(certificado: Certificado): Observable<Certificado> {
        return this.httpCliente.post<Certificado>(this.url + '/cria',
            certificado.paraBackend(), { headers: this.httpHeader })
            .pipe(map(certificadoCriada => Certificado.doBackend(certificadoCriada)));

    }

    public lista(
        usuarioCriador: string
    ): Observable<IPagina<ICertificado, Certificado>> {
        let httpParams = new HttpParams();
        
        if (usuarioCriador != null){
            httpParams = httpParams.append(configuracao.parametroUsuarioCriador, usuarioCriador);
        }

        return this.httpCliente.get<IPagina<ICertificado, Certificado>>(this.url + '/lista', { params: httpParams })
            .pipe(map((pagina => this.obtemPagina(pagina))));
    }

    private obtemPagina(pagina: IPagina<ICertificado, Certificado>): IPagina<ICertificado, Certificado> {
        pagina.conteudo = Certificado.listaDoBackend(pagina.content);
        return pagina;
    }
}
