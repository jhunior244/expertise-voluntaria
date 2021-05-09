import { IUsuario, Usuario } from '../usuario/usuario';

export class IAvaliacao {
    id: string;
    nota: number;
    usuario: IUsuario;
    usuarioAvaliador: IUsuario;
}

export class Avaliacao {
    id: string;
    nota: number;
    usuario: Usuario;
    usuarioAvaliador: Usuario;

    static listaDoBackend(response: IAvaliacao[]): Avaliacao[] {
        const lista: Avaliacao[] = [];

        for (const json of response) {
            lista.push(this.doBackend(json));
        }
        return lista;
    }

    static doBackend(response: IAvaliacao): Avaliacao | null {
        let avaliacao = Object.create(Avaliacao.prototype);
        if (response == null) {
            return null;
        }

        avaliacao = Object.assign(avaliacao, response, {
            usuario: (response.usuario) ? Usuario.doBackend(response.usuario) : null,
            usuarioAvaliador: (response.usuarioAvaliador) ? Usuario.doBackend(response.usuarioAvaliador) : null,
        });
        return avaliacao;
    }

    paraBackend(): IAvaliacao {
        const avaliacao = Object.assign(Object.create(Avaliacao.prototype), this, {
            usuario: (this.usuario) ? this.usuario.paraBackend() : null,
            usuarioAvaliador: (this.usuarioAvaliador) ? this.usuarioAvaliador.paraBackend() : null,
        });
        return avaliacao;
    }
}