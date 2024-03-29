import { Conversa } from 'src/app/servico/usuario/conversa';
import { TipoUsuario } from './../../servico/usuario/tipo-usuario';
import { Usuario } from './../../servico/usuario/usuario';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { AreaAtuacao } from './../../servico/area-atuacao/area-atuacao';
import { Cidade } from './../../servico/usuario/cidade';
import { Estado } from './../../servico/usuario/estado';

@Injectable({ providedIn: 'root' })
export class TelaInicioService {

    private listaEstadoSubject = new BehaviorSubject<Estado[]>(new Array());
    private listaCidadeSubject = new BehaviorSubject<Cidade[]>(new Array());
    private listaAreaAtuacaoSubject = new BehaviorSubject<AreaAtuacao[]>(new Array());
    private listaTipoPessoaSubject = new BehaviorSubject<TipoUsuario[]>(new Array());
    private listaConversaChatSubject = new BehaviorSubject<Conversa[]>(new Array());
    private listaConversaAbertaSubject = new BehaviorSubject<Conversa[]>(new Array());
    private listaConversaMinimizadaSubject = new BehaviorSubject<Conversa[]>(new Array());

    private botaoPesquisarSubject = new BehaviorSubject<boolean>(false);
    private exibeFiltroSubject = new BehaviorSubject<boolean>(true);
    private todasPublicacoesSubject = new BehaviorSubject<boolean>(true);
    private exibeFiltroTodasPublicacoesSubject = new BehaviorSubject<boolean>(false);
    private exibeFiltroTodasEstadoSubject = new BehaviorSubject<boolean>(false);
    private exibeFiltroTodasCidadeSubject = new BehaviorSubject<boolean>(false);
    private exibeFiltroTipoUsuarioSubject = new BehaviorSubject<boolean>(false);


    public listaEstadoAnunciado$ = this.listaEstadoSubject.asObservable();
    public listaCidadeAnunciada$ = this.listaCidadeSubject.asObservable();
    public listaAreaAtuacaoAnunciada$ = this.listaAreaAtuacaoSubject.asObservable();
    public botaoPesquisarClicado$ = this.botaoPesquisarSubject.asObservable();
    public exibeFiltroAnunciado$ = this.exibeFiltroSubject.asObservable();
    public listaTipoPessoaAnuncioado$ = this.listaTipoPessoaSubject.asObservable();

    public listaConversaChatAnuncioado$ = this.listaConversaChatSubject.asObservable();
    public listaConversaAbertaAnuncioado$ = this.listaConversaAbertaSubject.asObservable();
    public listaConversaMinimizadaAnuncioado$ = this.listaConversaMinimizadaSubject.asObservable();

    public todasPublicacoesAnunciado$ = this.todasPublicacoesSubject.asObservable();
    public exibeFiltroTodasPublicacoes$ = this.exibeFiltroTodasPublicacoesSubject.asObservable();
    public exibeFiltroTodasEstado$ = this.exibeFiltroTodasEstadoSubject.asObservable();
    public exibeFiltroTodasCidade$ = this.exibeFiltroTodasCidadeSubject.asObservable();
    public exibeFiltroTipoUsuario$ = this.exibeFiltroTipoUsuarioSubject.asObservable();

    public listaEstado: Estado[] = [];
    public listaCidade: Cidade[] = [];
    public listaAreaAtuacao: AreaAtuacao[] = [];
    public listaTipoPessoa: TipoUsuario[] = [];
    public listaConversaChat: Conversa[] = [];
    public listaConversaAberta: Conversa[] = [];
    public listaConversaMinimizada: Conversa[] = [];
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

    public anunciaExibeFiltroEstado(exibe: boolean): void {
        this.exibeFiltroTodasEstadoSubject.next(exibe);
    }

    public anunciaExibeFiltroTipoUsuario(exibe: boolean): void {
        this.exibeFiltroTipoUsuarioSubject.next(exibe);
    }

    public anunciaExibeFiltroCidade(exibe: boolean): void {
        this.exibeFiltroTodasCidadeSubject.next(exibe);
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

    public alteraListarApenasMinhasPublicacoes(listar: number): void {
        this.listarApenasMinhasPublicacoes = listar;
    }

    public anunciaListaConversaChat(lista: Conversa[]): void {
        this.listaConversaChat = lista;
        this.listaConversaChatSubject.next(lista);
    }

    public atualizaConversaListaConversaChat(conversa: Conversa): void {
        const index = this.listaConversaChat.findIndex(c => c?.id === conversa?.id);

        if (index !== -1) {
            this.listaConversaChat[index] = conversa;
            this.anunciaListaConversaChat(this.listaConversaChat);
        }
    }

    public anunciaListaConversaAberta(lista: Conversa[]): void {
        this.listaConversaAberta = lista;
        this.listaConversaAbertaSubject.next(lista);
    }

    public anunciaListaConversaMinimizada(lista: Conversa[]): void {
        this.listaConversaMinimizada = lista;
        this.listaConversaMinimizadaSubject.next(lista);
    }

    public abreNovaJanelaChat(conversa: Conversa): void {
        const indexConversaAberta = this.listaConversaAberta.findIndex(conversaLista => conversaLista.id === conversa.id);
        if (indexConversaAberta !== -1) {
            return;
        }

        const indexConversaMinimizada = this.listaConversaMinimizada.findIndex(conversaLista => conversaLista.id === conversa.id);
        if (indexConversaMinimizada !== -1) {
            this.listaConversaMinimizada.splice(indexConversaMinimizada, 1);
        }

        if (this.listaConversaAberta?.length === 3) {
            this.listaConversaAberta.pop();
        }

        this.listaConversaAberta.unshift(conversa);
        this.anunciaListaConversaAberta(this.listaConversaAberta);
    }

    public minimizaJanelaChat(conversa: Conversa): void {
        this.fechaJanelaChat(conversa);
        this.listaConversaMinimizada.unshift(conversa);
        this.anunciaListaConversaMinimizada(this.listaConversaMinimizada);
    }

    public maximinizaJanelaChat(conversa: Conversa): void {
        this.retiraJanelaMinimizada(conversa);
        this.listaConversaAberta.unshift(conversa);
        this.anunciaListaConversaAberta(this.listaConversaAberta);
    }

    public fechaJanelaChat(conversa: Conversa): void {
        const posicao = this.listaConversaAberta.findIndex(conversaAberta => conversaAberta?.id === conversa?.id);

        if (posicao !== -1) {
            this.listaConversaAberta.splice(posicao, 1);
            this.anunciaListaConversaAberta(this.listaConversaAberta);
        }
    }

    public retiraJanelaMinimizada(conversa: Conversa): void {
        const posicao = this.listaConversaMinimizada.findIndex(conversaMinimizada => conversaMinimizada?.id === conversa?.id);

        if (posicao !== -1) {
            this.listaConversaMinimizada.splice(posicao, 1);
            this.anunciaListaConversaMinimizada(this.listaConversaMinimizada);
        }
    }

}