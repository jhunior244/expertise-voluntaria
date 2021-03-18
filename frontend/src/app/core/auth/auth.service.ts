import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { Usuario } from 'src/app/servico/usuario/usuario';
import { UsuarioService } from 'src/app/servico/usuario/usuario.service';
import { SessaoService } from '../sessao/sessao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = configuracao.rotaBackendPublico + '/auth';
  httpHeader = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private sessaoService: SessaoService
  ) {
    this.httpHeader = this.httpHeader.append('Content-Type', 'application/json');
  }

  autenticar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url + '/login',
      usuario.paraBackend(), { headers: this.httpHeader })
      .pipe(tap(usuarioRetornado => {
        this.sessaoService.setToken(usuarioRetornado.token);
        this.sessaoService.setUsuarioLogadoSistema(usuarioRetornado.nome);
        this.sessaoService.setUf(usuarioRetornado.uf);
        this.sessaoService.setCidade(usuarioRetornado.cidade);
        this.sessaoService.setEmail(usuarioRetornado.email);
      }));
  }

  autenticado(): Observable<boolean>{
    return this.http.get<boolean>(this.url + '/autenticado');
  }
}
