import { configuracao } from './../../configuracao';
import * as moment from 'moment';

export class ITipoUsuario {
    id: number;
    nome: string;
}

export class TipoUsuario {
    id: number;
    nome: string;

    static listaDoBackend(response: ITipoUsuario[]): TipoUsuario[] {
        const lista: TipoUsuario[] = [];

        for (const objJSON of response) {
            lista.push(this.doBackend(objJSON));
        }

        return lista;
    }

    static doBackend(response: ITipoUsuario): TipoUsuario {
        let tipoUsuario = Object.create(TipoUsuario.prototype);

        if (response == null) {
            return null;
        }

        tipoUsuario = Object.assign(tipoUsuario, response, {
        });
        return tipoUsuario;
    }

    public paraBackend(): ITipoUsuario {
        const tipoUsuario = Object.assign(Object.create(TipoUsuario.prototype), this, {
        });

        return tipoUsuario;
    }

    public ehPessoaFisica(): boolean {
        return this.id === configuracao.tipoUsuario.PESSOA_FISICA;
    }

    public ehPessoaJuridica(): boolean {
        return this.id === configuracao.tipoUsuario.PESSOA_JURIDICA;
    }
}