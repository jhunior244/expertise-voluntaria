import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { ITipoUsuario, TipoUsuario } from './tipo-usuario';

@Injectable({ providedIn: 'root' })
export class TipoUsuarioService {
    private url = configuracao.rotaBackendPublico + '/tipoUsuario';
    private httpHeader = new HttpHeaders();

    constructor(
        private httpClient: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public lista(): Observable<TipoUsuario[]> {
        return this.httpClient.get<ITipoUsuario[]>(this.url + '/lista').pipe(map((lista => TipoUsuario.listaDoBackend(lista))));

    }
}

