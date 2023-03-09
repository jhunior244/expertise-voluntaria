import * as moment from 'moment';

export class ITipoPublicacao {
    id: number;
    nome: string;
}

export class TipoPublicacao {
    id: number;
    nome: string;

    static listaDoBackend(response: ITipoPublicacao[]): TipoPublicacao[] {
        const lista: TipoPublicacao[] = [];

        for (const objJSON of response) {
            lista.push(this.doBackend(objJSON));
        }

        return lista;
    }

    static doBackend(response: ITipoPublicacao): TipoPublicacao {
        let tipo = Object.create(TipoPublicacao.prototype);

        if (response == null) {
            return null;
        }

        tipo = Object.assign(tipo, response, {
        });
        return tipo;
    }

    public paraBackend(): ITipoPublicacao {
        const tipo = Object.assign(Object.create(TipoPublicacao.prototype), this, {
        });

        return tipo;
    }
}