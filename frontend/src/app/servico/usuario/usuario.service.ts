import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { TokenService } from 'src/app/core/token/token.service';
import { Usuario } from './usuario';

const usuarioLogadoSistema = 'usuarioLogadoSistema';
const idCarrinhoUsuarioLogado = 'idCarrinhoUsuarioLogado';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

    private usuarioSubject = new BehaviorSubject<Usuario>(null);
    url = configuracao.rotaBackend + '/usuario';
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

    public cria(usuario: Usuario): Observable<Usuario> {
        return this.httpCliente.post<Usuario>(this.url + '/cria', usuario.paraBackend(), { headers: this.httpHeader })
            .pipe(map(usuarioCriado => Usuario.doBackend(usuarioCriado) as Usuario));

    }

    public existeUsuarioCadastradoComEmail(email: string): Observable<boolean> {

        let httpParams = new HttpParams();

        if (email) {
            httpParams = httpParams.append(configuracao.parametroEmail, email.toString());
        }

        return this.httpCliente.get<boolean>(this.url + '/existeUsuarioCadastradoComEmail', { params: httpParams });
    }

}

