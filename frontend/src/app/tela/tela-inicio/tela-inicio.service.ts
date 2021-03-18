import { TipoUsuario } from './../../servico/usuario/tipo-usuario';
import { Usuario } from './../../servico/usuario/usuario';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { AreaAtuacao } from './../../servico/area-atuacao/area-atuacao';
import { Cidade } from './../../servico/usuario/cidade';
import { Estado } from './../../servico/usuario/estado';

@Injectable({providedIn: 'root'})
export class TelaInicioService {

    private listaEstadoSubject = new BehaviorSubject<Estado[]>(new Array());
    private listaCidadeSubject = new BehaviorSubject<Cidade[]>(new Array());
    private listaAreaAtuacaoSubject = new BehaviorSubject<AreaAtuacao[]>(new Array());
    private listaTipoPessoaSubject = new BehaviorSubject<TipoUsuario[]>(new Array());

    private botaoPesquisarSubject = new BehaviorSubject<boolean>(false);
    private exibeFiltroSubject = new BehaviorSubject<boolean>(true);
    private todasPublicacoesSubject = new BehaviorSubject<boolean>(true);
    private exibeFiltroTodasPublicacoesSubject = new BehaviorSubject<boolean>(false);

    
    public listaEstadoAnunciado$ = this.listaEstadoSubject.asObservable();
    public listaCidadeAnunciada$ = this.listaEstadoSubject.asObservable();
    public listaAreaAtuacaoAnunciada$ = this.listaEstadoSubject.asObservable();
    public botaoPesquisarClicado$ = this.botaoPesquisarSubject.asObservable();
    public exibeFiltroAnunciado$ = this.exibeFiltroSubject.asObservable();
    public listaTipoPessoaAnuncioado$ = this.listaTipoPessoaSubject.asObservable();
    public todasPublicacoesAnunciado$ = this.todasPublicacoesSubject.asObservable();
    public exibeFiltroTodasPublicacoes$ = this.exibeFiltroTodasPublicacoesSubject.asObservable();

    public listaEstado: Estado[] = [];
    public listaCidade: Cidade[] = [];
    public listaAreaAtuacao: AreaAtuacao[] = [];
    public listaTipoPessoa: TipoUsuario[] = [];
    public listarApenasMinhasPublicacoes = 0;

    public anunciaListaEstado(lista: Estado[]): void {
        this.listaEstado = lista;
        this.listaEstadoSubject.next(lista);
    }

    public anunciaListaCidade(lista: Cidade[]): void {
        this.listaCidade = lista;
        this.listaCidadeSubject.next(lista);
    }

    public anunciaListaAreaAtuacao(lista: AreaAtuacao[]): void {
        this.listaAreaAtuacao = lista;
        this.listaAreaAtuacaoSubject.next(lista);
    }

    public anunciaExibeFiltroTodasPublicacoes(exibe: boolean): void {
        this.exibeFiltroTodasPublicacoesSubject.next(exibe);
    }

    public anunciaNovaPesquisa(novaPesquisa: boolean): void {
        this.botaoPesquisarSubject.next(novaPesquisa);
    }

    public anunciaexibeFiltro(exibe: boolean): void {
        this.exibeFiltroSubject.next(exibe);
    }

    public anunciaListaTipoPessoa(lista: TipoUsuario[]): void {
        this.listaTipoPessoa = lista;
        this.listaTipoPessoaSubject.next(lista);
    }

    public alteraListarApenasMinhasPublicacoes(listar: number){
        this.listarApenasMinhasPublicacoes = listar;
    }

}