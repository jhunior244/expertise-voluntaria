import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadArquivoService {
    private httpHeader = new HttpHeaders();

    constructor(
        private httpClient: HttpClient
    ) {
    }

    upload(files: Set<File>, url: string){

        const formData = new FormData();
        files.forEach(file => formData.append('files', file, file.name));

        const request = new HttpRequest('POST', url, formData);

        return this.httpClient.request(request);
    }
}