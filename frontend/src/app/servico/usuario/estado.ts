import * as moment from 'moment';

export class IEstado {
    id: number;
    nome: string;
}

export class Estado {
    id: number;
    nome: string;

    static listaDoBackend(response: IEstado[]): Estado[] {
        const lista: Estado[] = [];

        for (const objJSON of response) {
            lista.push(this.doBackend(objJSON));
        }

        return lista;
    }

    static doBackend(response: IEstado): Estado {
        let estado = Object.create(Estado.prototype);

        if (response == null) {
            return null;
        }

        estado = Object.assign(estado, response, {
        });
        return estado;
    }

    public paraBackend(): IEstado {
        const estado = Object.assign(Object.create(Estado.prototype), this, {
        });

        return estado;
    }
}