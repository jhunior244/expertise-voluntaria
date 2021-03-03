import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { Estado, IEstado } from './estado';

@Injectable({ providedIn: 'root' })
export class EstadoService {
    private url = configuracao.rotaBackendPublico + '/estado';
    private httpHeader = new HttpHeaders();

    constructor(
        private httpClient: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public lista(uf: string): Observable<Estado[]> {

        let httpParams = new HttpParams();

        if (uf) {
            httpParams = httpParams.append(configuracao.parametroUf, uf);
        }

        return this.httpClient.get<IEstado[]>(this.url + '/lista', {params: httpParams}).pipe(map((lista => Estado.listaDoBackend(lista))));
    }

    public obtem(uf: string): Observable<Estado> {

        let httpParams = new HttpParams();

        if (uf) {
            httpParams = httpParams.append(configuracao.parametroUf, uf);
        }

        return this.httpClient.get<Estado>(this.url + '/obtem', { params: httpParams })
            .pipe(map((estado => Estado.doBackend(estado))));
    }
}

