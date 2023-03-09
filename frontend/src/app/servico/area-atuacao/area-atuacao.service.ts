import { AreaAtuacao, IAreaAtuacao } from './area-atuacao';
import { Observable } from 'rxjs';
import { configuracao } from 'src/app/configuracao';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IPagina } from '../pagina/pagina';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AreaAtuacaoService {
    private url = configuracao.rotaBackendPublico + '/areaAtuacao';
    httpHeader = new HttpHeaders();

    constructor(
        private httpClient: HttpClient
    ) { }

    public lista(): Observable<IPagina<IAreaAtuacao, AreaAtuacao>> {
        let httpParams = new HttpParams();

        return this.httpClient.get<IPagina<IAreaAtuacao, AreaAtuacao>>(this.url + '/lista', { params: httpParams })
            .pipe(map((pagina => this.obtemPagina(pagina))));
    }

    private obtemPagina(pagina: IPagina<IAreaAtuacao, AreaAtuacao>): IPagina<IAreaAtuacao, AreaAtuacao> {
        pagina.conteudo = AreaAtuacao.listaDoBackend(pagina.content);
        return pagina;
    }
}