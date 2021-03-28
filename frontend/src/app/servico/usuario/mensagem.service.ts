import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { IPagina } from '../pagina/pagina';
import { IMensagem, Mensagem } from './mensagem';

@Injectable({ providedIn: 'root' })
export class MensagemService {
    urlPublica = configuracao.rotaBackendPublico + '/mensagem';
    urlPrivada = configuracao.rotaBackendPrivado + '/mensagem';
    private httpHeader = new HttpHeaders();

    constructor(
        private httpCliente: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
    }

    public listaParaChat(
        idConversa: string,
        numeroPagina?: number,
        tamanhoPagina?: number
    ): Observable<IPagina<IMensagem, Mensagem>> {
        let httpParams = new HttpParams();

        if (idConversa) {
            httpParams = httpParams.append(configuracao.parametroIdConversa, idConversa);
        }

        if (numeroPagina) {
            httpParams = httpParams.append(configuracao.parametroNumeroPagina, numeroPagina.toString());
        }

        if (tamanhoPagina) {
            httpParams = httpParams.append(configuracao.parametroTamanhoPagina, tamanhoPagina.toString());
        }

        return this.httpCliente.get<IPagina<IMensagem, Mensagem>>(this.urlPrivada + '/listaParaChat', { params: httpParams })
            .pipe(map((pagina => this.obtemPagina(pagina))));
    }

    public atualizaMensagem(
        idConversa: string,
        idUltimaMensagem?: string,
    ): Observable<Mensagem[]> {
        let httpParams = new HttpParams();

        if (idConversa) {
            httpParams = httpParams.append(configuracao.parametroIdConversa, idConversa);
        }

        if (idUltimaMensagem) {
            httpParams = httpParams.append(configuracao.parametroIdMensagem, idUltimaMensagem);
        }

        return this.httpCliente.get<Mensagem[]>(this.urlPrivada + '/atualizaMensagem', { params: httpParams })
            .pipe(map((lista => Mensagem.listaDoBackend(lista))));
    }

    public enviaMensagem(mensagem: Mensagem): Observable<Mensagem> {
        return this.httpCliente.post<Mensagem>(this.urlPrivada + '/enviaMensagem',
        mensagem.paraBackend(), { headers: this.httpHeader })
            .pipe(map(mensagemCriada => Mensagem.doBackend(mensagemCriada)));

    }

    private obtemPagina(pagina: IPagina<IMensagem, Mensagem>): IPagina<IMensagem, Mensagem> {
        pagina.conteudo = Mensagem.listaDoBackend(pagina.content);
        return pagina;
    }
}