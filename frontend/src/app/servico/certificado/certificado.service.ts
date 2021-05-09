import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AreaAtuacao } from '../area-atuacao/area-atuacao';
import { IPagina } from '../pagina/pagina';
import { TipoUsuario } from '../usuario/tipo-usuario';
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
        listaAreaAtuacao: AreaAtuacao[],
        listaTipoUsuario: TipoUsuario[]
    ): Observable<IPagina<ICertificado, Certificado>> {
        let httpParams = new HttpParams();

        const listaIdAreaAtuacao = new Array<string>();
        if (listaAreaAtuacao?.length) {
            for (const area of listaAreaAtuacao) {
                listaIdAreaAtuacao.push(area.id.toString());
            }
        }
        for (const idArea of listaIdAreaAtuacao) {
            httpParams = httpParams.append(configuracao.parametroListaIdAreaAtuacao, idArea);
        }

        const listaIdTipoUsuario = new Array<string>();
        if (listaTipoUsuario?.length) {
            for (const tipo of listaTipoUsuario) {
                listaIdTipoUsuario.push(tipo.id.toString());
            }
        }
        for (const idTipo of listaIdTipoUsuario) {
            httpParams = httpParams.append(configuracao.parametroListaIdTipoUsuario, idTipo);
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
