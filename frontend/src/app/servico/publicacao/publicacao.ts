import { AreaAtuacao, IAreaAtuacao } from './../area-atuacao/area-atuacao';
import { IImagem, Imagem } from '../imagem/imagem';
import { IUsuario, Usuario } from '../usuario/usuario';
import { ITipoPublicacao, TipoPublicacao } from './tipo-publicacao';
import * as moment from 'moment';

export class IPublicacao {
    id: string;
    titulo: string;
    descricao: string;
    raioAlcance: number;
    data: moment.Moment;
    usuario: IUsuario;
    listaImagem: IImagem[];
    tipoPublicacao: ITipoPublicacao;
    listaAreaAtuacao: IAreaAtuacao[];
}

export class Publicacao {
    id: string;
    titulo: string;
    descricao: string;
    raioAlcance: number;
    data: moment.Moment;
    usuario: Usuario;
    listaImagem: Imagem[];
    tipoPublicacao: TipoPublicacao;
    listaAreaAtuacao: AreaAtuacao[];

    static listaDoBackend(response: IPublicacao[]): Publicacao[] {
        const lista: Publicacao[] = [];

        for (const json of response) {
            lista.push(this.doBackend(json));
        }
        return lista;
    }

    static doBackend(response: IPublicacao): Publicacao | null {
        let usuario = Object.create(Publicacao.prototype);
        if (response == null) {
            return null;
        }

        usuario = Object.assign(usuario, response, {
            data: (response.data) ? moment(response.data) : null,
            usuario: (response.usuario) ? Usuario.doBackend(response.usuario) : null,
            listaImagem: (response.listaImagem) ? Imagem.listaDoBackend(response.listaImagem) : null,
            tipoPublicacao: (response.tipoPublicacao) ? TipoPublicacao.doBackend(response.tipoPublicacao) : null,
            listaAreaAtuacao: (response.listaAreaAtuacao) ? AreaAtuacao.listaDoBackend(response.listaAreaAtuacao) : null,
        });
        return usuario;
    }

    paraBackend(): IPublicacao {
        const publicacao = Object.assign(Object.create(Publicacao.prototype), this, {
            data: (this.data) ? moment(this.data).toDate().toISOString() : null,
            usuario: (this.usuario) ? this.usuario.paraBackend() : null,
            listaImagem: (this.listaImagem) ? Imagem.listaParaBackend(this.listaImagem) : null,
            tipoPublicacao: (this.tipoPublicacao) ? this.tipoPublicacao.paraBackend() : null,
            listaAreaAtuacao: (this.listaAreaAtuacao) ? AreaAtuacao.listaParaBackend(this.listaAreaAtuacao) : null,
        });
        return publicacao;
    }
}