import { Estado, IEstado } from './estado';
import * as moment from 'moment';

export class ICidade {
    id: number;
    nome: string;
    estado: IEstado;
}

export class Cidade {
    id: number;
    nome: string;
    estado: Estado;

    static listaDoBackend(response: ICidade[]): Cidade[] {
        const lista: Cidade[] = [];

        for (const objJSON of response) {
            lista.push(this.doBackend(objJSON));
        }

        return lista;
    }

    static doBackend(response: ICidade): Cidade {
        let cidade = Object.create(Cidade.prototype);

        if (response == null) {
            return null;
        }

        cidade = Object.assign(cidade, response, {
            estado: (response.estado) ? Estado.doBackend(response.estado) : null
        });
        return cidade;
    }

    public paraBackend(): ICidade {
        const cidade = Object.assign(Object.create(Cidade.prototype), this, {
            estado: (this.estado) ? this.estado.paraBackend() : null,
        });

        return cidade;
    }
}