import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CidadeService } from '../usuario/cidade.service';

@Injectable({ providedIn: 'root' })
export class EnderecoPorCepService {
    private httpHeader = new HttpHeaders();

    constructor(
        private httpClient: HttpClient,
        private cidadeService: CidadeService
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public obtemEndereco(cep: string): Observable<any> {
        const url = 'http://viacep.com.br/ws/' + cep + '/json/';
        return this.httpClient.get<any>(url);

    }
}