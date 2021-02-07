import { IImagem, Imagem } from '../imagem/imagem';
import { IUsuario, Usuario } from '../usuario/usuario';
import { ITipoPublicacao, TipoPublicacao } from './tipo-publicacao';

export class IPublicacao {
    id: string;
    titulo: string;
    descricao: string;
    raioAlcance: number;
    usuario: IUsuario;
    listaImagem: IImagem[];
    tipoPublicacao: ITipoPublicacao;
}

export class Publicacao {
    id: string;
    titulo: string;
    descricao: string;
    raioAlcance: number;
    usuario: Usuario;
    listaImagem: Imagem[];
    tipoPublicacao: TipoPublicacao;

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
            usuario: (response.usuario) ? Usuario.doBackend(response.usuario) : null,
            listaImagem: (response.listaImagem) ? Imagem.listaDoBackend(response.listaImagem) : null,
            tipoPublicacao: (response.tipoPublicacao) ? TipoPublicacao.doBackend(response.tipoPublicacao) : null,
        });
        return usuario;
    }

    paraBackend(): IPublicacao {
        const publicacao = Object.assign(Object.create(Publicacao.prototype), this, {
            usuario: (this.usuario) ? this.usuario.paraBackend() : null,
            listaImagem: (this.listaImagem) ? Imagem.listaParaBackend(this.listaImagem) : null,
            tipoPublicacao: (this.tipoPublicacao) ? this.tipoPublicacao.paraBackend() : null,
        });
        return publicacao;
    }
}