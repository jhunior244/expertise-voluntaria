import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnderecoPorCepService {
    private httpHeader = new HttpHeaders();

    constructor(
        private httpClient: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public obtemEndereco(cep: string): Observable<any> {
        const url = 'http://viacep.com.br/ws/' + cep + '/json';
        return this.httpClient.get<any>(url);

    }
}