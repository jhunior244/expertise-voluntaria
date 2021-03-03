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

    private botaoPesquisarSubject = new BehaviorSubject<boolean>(false);
    
    public listaEstadoAnunciado$ = this.listaEstadoSubject.asObservable();
    public listaCidadeAnunciada$ = this.listaEstadoSubject.asObservable();
    public listaAreaAtuacaoAnunciada$ = this.listaEstadoSubject.asObservable();
    public botaoPesquisarClicado$ = this.botaoPesquisarSubject.asObservable();

    public listaEstado: Estado[] = [];
    public listaCidade: Cidade[] = [];
    public listaAreaAtuacao: AreaAtuacao[] = [];

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

    public anunciaNovaPesquisa(novaPesquisa: boolean): void {
        this.botaoPesquisarSubject.next(novaPesquisa);
    }

}