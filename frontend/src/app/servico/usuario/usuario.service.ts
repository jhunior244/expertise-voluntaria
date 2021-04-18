import { Estado } from './estado';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { TokenService } from 'src/app/core/token/token.service';
import { AreaAtuacao } from '../area-atuacao/area-atuacao';
import { IPagina } from '../pagina/pagina';
import { IUsuario, Usuario } from './usuario';
import { Cidade } from './cidade';

const usuarioLogadoSistema = 'usuarioLogadoSistema';
const idCarrinhoUsuarioLogado = 'idCarrinhoUsuarioLogado';
const ufChave = 'uf_user';
const cidadeChave = 'city_user';
const emailChave = 'email_user';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

    private usuarioSubject = new BehaviorSubject<Usuario>(null);
    urlPublica = configuracao.rotaBackendPublico + '/usuario';
    urlPrivada = configuracao.rotaBackendPrivado + '/usuario';
    httpHeader = new HttpHeaders();

    constructor(
        private tokenService: TokenService,
        private httpCliente: HttpClient
    ) {
        this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');

        this.tokenService.hasToken() && this.decodeAndNotify();
    }

    setToken(token: string): void {
        this.tokenService.setToken(token);
    }

    setUf(uf: string): void {
        window.localStorage.setItem(ufChave, uf);
    }

    setCidade(cidade: string): void {
        window.localStorage.setItem(cidadeChave, cidade);
    }

    setEmail(email: string): void {
        window.localStorage.setItem(emailChave, email);
    }

    getUf(): string {
        return window.localStorage.getItem(ufChave);
    }

    getCidade(): string {
        return window.localStorage.getItem(cidadeChave);
    }

    getEmail(): string {
        return window.localStorage.getItem(emailChave);
    }

    setUsuarioLogadoSistema(nome: string): void {
        window.localStorage.setItem(usuarioLogadoSistema, nome);
        this.decodeAndNotify();
    }

    setIdCarrinhoUsuarioLogadoSistema(id: number): void {
        window.localStorage.setItem(idCarrinhoUsuarioLogado, id.toString());
        this.decodeAndNotify();
    }

    private getNomeUsuarioLogado(): string {
        return window.localStorage.getItem(usuarioLogadoSistema);
    }

    estaLogado(): boolean {
        return this.getNomeUsuarioLogado() != null ? true : false;
    }

    getUsuario(): Observable<Usuario> {
        this.decodeAndNotify();
        return this.usuarioSubject.asObservable();
    }

    removeNomeUsuarioLogado(): void {
        window.localStorage.removeItem(usuarioLogadoSistema);
        this.decodeAndNotify();
    }

    private decodeAndNotify(): void {
        const usuario = new Usuario();
        if (this.getNomeUsuarioLogado()) {
            usuario.nome = this.getNomeUsuarioLogado();
            this.usuarioSubject.next(usuario);
        } else {
            this.usuarioSubject.next(null);
        }
    }

    public adicionaContato(usuario: Usuario): Observable<Usuario> {
        return this.httpCliente.patch<Usuario>(this.urlPrivada + '/adicionaContato', usuario.paraBackend(), { headers: this.httpHeader })
            .pipe(map(usuarioCriado => Usuario.doBackend(usuarioCriado) as Usuario));

    }

    public cria(usuario: Usuario): Observable<Usuario> {
        return this.httpCliente.post<Usuario>(this.urlPublica + '/cria', usuario.paraBackend(), { headers: this.httpHeader })
            .pipe(map(usuarioCriado => Usuario.doBackend(usuarioCriado) as Usuario));

    }

    public obtem(id: string): Observable<Usuario> {

        let httpParams = new HttpParams();

        httpParams = httpParams.append(configuracao.parametroId, id);

        return this.httpCliente.get<Usuario>(this.urlPrivada + '/obtem', { params: httpParams })
            .pipe(map((usuario => Usuario.doBackend(usuario))));
    }

    public lista(
        somenteMeusContatos: boolean,
        listaEstado: Estado[],
        listaCidade: Cidade[],
        listaAreaAtuacao: AreaAtuacao[],
        nomeUsuario: string
    ): Observable<IPagina<IUsuario, Usuario>> {
        let httpParams = new HttpParams();

        if (somenteMeusContatos != null){
            httpParams = httpParams.append(configuracao.parametroSomenteMeusContatos, somenteMeusContatos.toString());
        }

        const listaIdEstado = new Array<string>();
        if (listaEstado) {
            for (const estado of listaEstado) {
                listaIdEstado.push(estado.id.toString());
            }
        }
        for (const idEstado of listaIdEstado) {
            httpParams = httpParams.append(configuracao.parametroListaIdEstado, idEstado);
        }

        const listaIdCidade = new Array<string>();
        if (listaCidade) {
            for (const cidade of listaCidade) {
                listaIdCidade.push(cidade.id.toString());
            }
        }
        for (const idCidade of listaIdCidade) {
            httpParams = httpParams.append(configuracao.parametroListaIdCidade, idCidade);
        }

        const listaIdAreaAtuacao = new Array<string>();
        if (listaAreaAtuacao) {
            for (const area of listaAreaAtuacao) {
                listaIdAreaAtuacao.push(area.id.toString());
            }
        }
        for (const idArea of listaIdAreaAtuacao) {
            httpParams = httpParams.append(configuracao.parametroListaIdAreaAtuacao, idArea);
        }

        if (nomeUsuario) {
            httpParams = httpParams.append(configuracao.parametroNome, nomeUsuario);
        }

        return this.httpCliente.get<IPagina<IUsuario, Usuario>>(this.urlPrivada + '/lista', { params: httpParams })
            .pipe(map((pagina => this.obtemPagina(pagina))));
    }

    public listaParaChat(
        numeroPagina?: number,
        tamanhoPagina?: number
    ): Observable<IPagina<IUsuario, Usuario>> {
        let httpParams = new HttpParams();

        if (numeroPagina) {
            httpParams = httpParams.append(configuracao.parametroNumeroPagina, numeroPagina.toString());
        }

        if (tamanhoPagina) {
            httpParams = httpParams.append(configuracao.parametroTamanhoPagina, tamanhoPagina.toString());
        }

        return this.httpCliente.get<IPagina<IUsuario, Usuario>>(this.urlPrivada + '/listaParaChat', { params: httpParams })
            .pipe(map((pagina => this.obtemPagina(pagina))));
    }

    private obtemPagina(pagina: IPagina<IUsuario, Usuario>): IPagina<IUsuario, Usuario> {
        pagina.conteudo = Usuario.listaDoBackend(pagina.content);
        return pagina;
    }

    public existeUsuarioCadastradoComEmail(email: string): Observable<boolean> {

        let httpParams = new HttpParams();

        if (email) {
            httpParams = httpParams.append(configuracao.parametroEmail, email.toString());
        }

        return this.httpCliente.get<boolean>(this.urlPublica + '/existeUsuarioCadastradoComEmail', { params: httpParams });
    }

}

