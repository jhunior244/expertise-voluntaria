import { Endereco, IEndereco } from './endereco';

export class IUsuario {
    nome: string;
    email: string;
    senha: string;
    token: string;
    endereco: IEndereco;
}

export class Usuario {
    nome: string;
    email: string;
    senha: string;
    token: string;
    endereco: Endereco;

    static doBackend(response: IUsuario): Usuario | null {
        let usuario = Object.create(Usuario.prototype);
        if (response == null) {
            return null;
        }

        usuario = Object.assign(usuario, response, {
            endereco: (response.endereco) ? Endereco.doBackend(response.endereco) : null
        });
        return usuario;
    }

    paraBackend(): IUsuario {
        const usuario = Object.assign(Object.create(Usuario.prototype), this, {
            endereco: (this.endereco) ? this.endereco.paraBackend() : null,
        });

        return usuario;
    }
}