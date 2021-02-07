import { Publicacao, IPublicacao } from './publicacao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { configuracao } from './../../configuracao';
import { map } from 'rxjs/operators';
import { IPagina } from '../pagina/pagina';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PublicacaoService {
    private url = configuracao.rotaBackendPrivado + '/publicacao';
    private httpHeader = new HttpHeaders();

    constructor(
        private httpCliente: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public cria(publicacao: Publicacao): Observable<Publicacao> {
        return this.httpCliente.post<Publicacao>(this.url + '/cria',
            publicacao.paraBackend(), { headers: this.httpHeader })
            .pipe(map(pagina => Publicacao.doBackend(pagina)));

    }

    private obtemPagina(pagina: IPagina<IPublicacao, Publicacao>): IPagina<IPublicacao, Publicacao> {
        pagina.conteudo = Publicacao.listaDoBackend(pagina.content);
        return pagina;
    }
}