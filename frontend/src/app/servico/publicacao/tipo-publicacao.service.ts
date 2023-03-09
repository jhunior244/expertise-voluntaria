import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { ITipoPublicacao, TipoPublicacao } from './tipo-publicacao';

@Injectable({ providedIn: 'root' })
export class TipoPublicacaoService {
    private url = configuracao.rotaBackendPrivado + '/tipoPublicacao';
    private httpHeader = new HttpHeaders();

    constructor(
        private httpClient: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public lista(): Observable<TipoPublicacao[]> {
        return this.httpClient.get<ITipoPublicacao[]>(this.url + '/lista').pipe(map((lista => TipoPublicacao.listaDoBackend(lista))));

    }
}