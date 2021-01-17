import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { Cidade, ICidade } from './cidade';

@Injectable({ providedIn: 'root' })
export class CidadeService {
    private url = configuracao.rotaBackendPublico + '/cidade';
    private httpHeader = new HttpHeaders();

    constructor(
        private httpClient: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public obtem(nome: string, uf: string): Observable<Cidade> {

        let httpParams = new HttpParams();

        httpParams = httpParams.append(configuracao.parametroNome, nome);
        httpParams = httpParams.append(configuracao.parametroUf, uf);

        return this.httpClient.get<Cidade>(this.url + '/obtem', { params: httpParams })
            .pipe(map((cidade => Cidade.doBackend(cidade))));
    }
}

