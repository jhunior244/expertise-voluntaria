import { Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/servico/usuario/usuario.service';
import { TokenService } from '../token/token.service';

const rotaRedirecionarAposLogin = 'rotaRedirecionarAposLogin';

@Injectable({ providedIn: 'root' })
export class SessaoService {

    constructor(
        private usuarioService: UsuarioService,
        private tokenService: TokenService,
    ) {
    }

    setUf(uf: string): void {
        this.usuarioService.setUf(uf);
    }

    setCidade(cidade: string): void {
        this.usuarioService.setCidade(cidade);
    }

    setEmail(email: string): void {
        this.usuarioService.setEmail(email);
    }

    setTipoUsuario(id: number): void {
        this.usuarioService.setTipoUsuario(id);
    }

    getUf(): string {
        return this.usuarioService.getUf();
    }

    getCidade(): string {
        return this.usuarioService.getCidade();
    }

    getTipoUsuario(): string {
        return this.usuarioService.getTipoUsuario();
    }

    setToken(token: string): void {
        this.usuarioService.setToken(token);
    }

    setUsuarioLogadoSistema(nome: string): void {
        this.usuarioService.setUsuarioLogadoSistema(nome);
    }

    getRotaRedirecionarAposLogin(): string {
        return window.localStorage.getItem(rotaRedirecionarAposLogin);
    }

    hasToken(): boolean {
        return !!this.getToken();
    }

    getToken(): string {
        return this.tokenService.getToken();
    }

    getUsuarioLogado(): any {
        return this.usuarioService.getUsuario();
    }

    removeToken(): void {
        this.tokenService.removeToken();
    }

    deslogar(): void {
        this.tokenService.removeToken();
        this.usuarioService.removeNomeUsuarioLogado();
    }
}

