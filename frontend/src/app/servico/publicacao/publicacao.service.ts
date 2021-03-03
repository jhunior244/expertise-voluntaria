import { AreaAtuacao } from './../area-atuacao/area-atuacao';
import { Cidade } from './../usuario/cidade';
import { Estado } from './../usuario/estado';
import { Publicacao, IPublicacao } from './publicacao';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    public lista(
        listaEstado: Estado[],
        listaCidade: Cidade[],
        listaAreaAtuacao: AreaAtuacao[]
    ): Observable<IPagina<IPublicacao, Publicacao>> {
        let httpParams = new HttpParams();

        const listaIdEstado = new Array<string>();
        if (listaEstado) {
            for (const estado of listaEstado) {
                listaIdEstado.push(estado.id.toString());
            }
        }
        for (const idEstado of listaIdEstado) {
            httpParams = httpParams.append('listaIdEstado', idEstado);
        }

        const listaIdCidade = new Array<string>();
        if (listaCidade) {
            for (const cidade of listaCidade) {
                listaIdCidade.push(cidade.id.toString());
            }
        }
        for (const idCidade of listaIdCidade) {
            httpParams = httpParams.append('listaIdCidade', idCidade);
        }

        const listaIdAreaAtuacao = new Array<string>();
        if (listaAreaAtuacao) {
            for (const area of listaAreaAtuacao) {
                listaIdAreaAtuacao.push(area.id.toString());
            }
        }
        for (const idArea of listaIdAreaAtuacao) {
            httpParams = httpParams.append('listaIdAreaAtuacao', idArea);
        }

        return this.httpCliente.get<IPagina<IPublicacao, Publicacao>>(this.url + '/lista', { params: httpParams })
            .pipe(map((pagina => this.obtemPagina(pagina))));
    }

    private obtemPagina(pagina: IPagina<IPublicacao, Publicacao>): IPagina<IPublicacao, Publicacao> {
        pagina.conteudo = Publicacao.listaDoBackend(pagina.content);
        return pagina;
    }
}
