import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { IPagina } from '../pagina/pagina';
import { Conversa, IConversa } from './conversa';

@Injectable({ providedIn: 'root' })
export class ConversaService {
    urlPublica = configuracao.rotaBackendPublico + '/conversa';
    urlPrivada = configuracao.rotaBackendPrivado + '/conversa';
    private httpHeader = new HttpHeaders();

    constructor(
        private httpCliente: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public listaParaChat(
        numeroPagina?: number,
        tamanhoPagina?: number
    ): Observable<IPagina<IConversa, Conversa>> {
        let httpParams = new HttpParams();

        if (numeroPagina) {
            httpParams = httpParams.append(configuracao.parametroNumeroPagina, numeroPagina.toString());
        }

        if (tamanhoPagina) {
            httpParams = httpParams.append(configuracao.parametroTamanhoPagina, tamanhoPagina.toString());
        }

        return this.httpCliente.get<IPagina<IConversa, Conversa>>(this.urlPrivada + '/listaParaChat', { params: httpParams })
            .pipe(map((pagina => this.obtemPagina(pagina))));
    }

    private obtemPagina(pagina: IPagina<IConversa, Conversa>): IPagina<IConversa, Conversa> {
        pagina.conteudo = Conversa.listaDoBackend(pagina.content);
        return pagina;
    }

    public cria(conversa: Conversa): Observable<Conversa> {
        return this.httpCliente.post<Conversa>(this.urlPrivada + '/cria',
            conversa.paraBackend(), { headers: this.httpHeader })
            .pipe(map(conversaCriada => Conversa.doBackend(conversaCriada)));

    }
}