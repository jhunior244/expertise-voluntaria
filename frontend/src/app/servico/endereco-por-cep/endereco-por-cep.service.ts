import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endereco } from './../usuario/endereco';
import { EstadoService } from './../usuario/estado.service';

@Injectable({ providedIn: 'root' })
export class EnderecoPorCepService {
    private httpHeader = new HttpHeaders();

    constructor(
        private httpClient: HttpClient,
        private estadoService: EstadoService
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public obtemEndereco(cep: string): Observable<Endereco> {
        const url = 'http://viacep.com.br/ws/' + cep + '/json/';
        return this.httpClient.get<any>(url).pipe(map(
            (endereco => Endereco.integracaoParaEndereco(endereco, this.estadoService))
        ));

    }
}