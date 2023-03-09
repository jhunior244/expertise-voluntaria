import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from './../../configuracao';
import { Imagem } from './imagem';

@Injectable({ providedIn: 'root' })
export class ImagemService {
    private url = configuracao.rotaBackendPrivado + '/imagem';
    httpHeader = new HttpHeaders();

    constructor(
        private httpClient: HttpClient
    ) { }

    public uploadoImagem(imagem: File): Observable<Imagem> {

        const uploadImageData = new FormData();
        uploadImageData.append('imagem', imagem, imagem.name);

        return this.httpClient.post<Imagem>(this.url + '/upload', uploadImageData, { observe: 'response' })
            .pipe(map(response => Imagem.doBackend(response.body)));
    }
}
