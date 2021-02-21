import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { IPagina } from '../pagina/pagina';
import { ISetorEmpresa, SetorEmpresa } from './setor-empresa';

@Injectable({ providedIn: 'root' })
export class SetorEmpresaService {
    private url = configuracao.rotaBackendPublico + '/setorEmpresa';
    httpHeader = new HttpHeaders();

    constructor(
        private httpClient: HttpClient
    ) { }

    public lista(): Observable<IPagina<ISetorEmpresa, SetorEmpresa>> {
        let httpParams = new HttpParams();

        return this.httpClient.get<IPagina<ISetorEmpresa, SetorEmpresa>>(this.url + '/lista', { params: httpParams })
            .pipe(map((pagina => this.obtemPagina(pagina))));
    }

    private obtemPagina(pagina: IPagina<ISetorEmpresa, SetorEmpresa>): IPagina<ISetorEmpresa, SetorEmpresa> {
        pagina.conteudo = SetorEmpresa.listaDoBackend(pagina.content);
        return pagina;
    }
}