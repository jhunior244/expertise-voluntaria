import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPagina } from '../pagina/pagina';
import { configuracao } from './../../configuracao';
import { Certificado, ICertificado } from './certificado';

@Injectable({ providedIn: 'root' })
export class CertificadoService {
    private urlPrivada = configuracao.rotaBackendPrivado + '/certificado';
    private urlPublica = configuracao.rotaBackendPublico + '/certificado';
    private httpHeader = new HttpHeaders();

    constructor(
        private httpCliente: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public cria(certificado: Certificado): Observable<Certificado> {
        return this.httpCliente.post<Certificado>(this.urlPrivada + '/cria',
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

        return this.httpCliente.get<IPagina<ICertificado, Certificado>>(this.urlPrivada + '/lista', { params: httpParams })
            .pipe(map((pagina => this.obtemPagina(pagina))));
    }

    public obtem(id: string): Observable<Certificado> {

        let httpParams = new HttpParams();

        httpParams = httpParams.append(configuracao.parametroId, id);

        return this.httpCliente.get<Certificado>(this.urlPublica + '/obtem', { params: httpParams })
            .pipe(map((certificado => Certificado.doBackend(certificado))));
    }

    private obtemPagina(pagina: IPagina<ICertificado, Certificado>): IPagina<ICertificado, Certificado> {
        pagina.conteudo = Certificado.listaDoBackend(pagina.content);
        return pagina;
    }
}
