import { AreaAtuacao, IAreaAtuacao } from './../area-atuacao/area-atuacao';
import { ITipoUsuario, TipoUsuario } from './tipo-usuario';
import { Endereco, IEndereco } from './endereco';

export class IUsuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
    token: string;
    cidade: string;
    bairro: string;
    uf: string;
    estado: string;
    ehContatoAdicionado: boolean;
    endereco: IEndereco;
    tipoUsuario: ITipoUsuario;
    listaAreaAtuacao: IAreaAtuacao[];
    tipoUsuarioNome: string;
}

export class Usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
    token: string;
    cidade: string;
    bairro: string;
    uf: string;
    estado: string;
    ehContatoAdicionado: boolean;
    endereco: Endereco;
    tipoUsuario: TipoUsuario;
    listaAreaAtuacao: AreaAtuacao[];
    tipoUsuarioNome: string;

    static listaDoBackend(response: IUsuario[]): Usuario[] {
        const lista: Usuario[] = [];

        for (const json of response) {
            lista.push(this.doBackend(json));
        }
        return lista;
    }

    static doBackend(response: IUsuario): Usuario | null {
        let usuario = Object.create(Usuario.prototype);
        if (response == null) {
            return null;
        }

        usuario = Object.assign(usuario, response, {
            endereco: (response.endereco) ? Endereco.doBackend(response.endereco) : null,
            tipoUsuario: (response.tipoUsuario) ? TipoUsuario.doBackend(response.tipoUsuario) : null,
            listaAreaAtuacao: (response.listaAreaAtuacao) ? AreaAtuacao.listaDoBackend(response.listaAreaAtuacao) : null
        });
        return usuario;
    }

    paraBackend(): IUsuario {
        const usuario = Object.assign(Object.create(Usuario.prototype), this, {
            endereco: (this.endereco) ? this.endereco.paraBackend() : null,
            tipoUsuario: (this.tipoUsuario) ? this.tipoUsuario.paraBackend() : null,
            listaTipoAtuacao: (this.listaAreaAtuacao) ? AreaAtuacao.listaParaBackend(this.listaAreaAtuacao) : null
        });

        return usuario;
    }
}