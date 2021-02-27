import { AreaAtuacao, IAreaAtuacao } from './../area-atuacao/area-atuacao';
import { ITipoUsuario, TipoUsuario } from './tipo-usuario';
import { Endereco, IEndereco } from './endereco';

export class IUsuario {
    nome: string;
    email: string;
    senha: string;
    token: string;
    cidade: string;
    uf: string;
    endereco: IEndereco;
    tipoUsuario: ITipoUsuario;
    listaAreaAtuacao: IAreaAtuacao[];
}

export class Usuario {
    nome: string;
    email: string;
    senha: string;
    token: string;
    cidade: string;
    uf: string;
    endereco: Endereco;
    tipoUsuario: TipoUsuario;
    listaAreaAtuacao: AreaAtuacao[];

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