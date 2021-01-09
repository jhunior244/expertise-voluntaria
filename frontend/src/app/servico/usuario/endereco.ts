import { Cidade, ICidade } from './cidade';

export class IEndereco {
    id: string;
    rua: string;
    cep: string;
    numero: string;
    cidade: ICidade;
}

export class Endereco {
    id: string;
    rua: string;
    cep: string;
    numero: string;
    cidade: Cidade;

    static listaDoBackend(response: IEndereco[]): Endereco[] {
        const lista: Endereco[] = [];

        for (const objJSON of response) {
            lista.push(this.doBackend(objJSON));
        }

        return lista;
    }

    static listaParaBackend(listaFrontend: Endereco[]): IEndereco[] {
        const lista: IEndereco[] = [];

        for (const obj of listaFrontend) {
            lista.push(obj.paraBackend());
        }

        return lista;
    }

    static doBackend(response: IEndereco): Endereco {
        let obj = Object.create(Endereco.prototype);

        if (response == null) {
            return null;
        }

        obj = Object.assign(obj, response, {
            cidade: (response.cidade) ? Cidade.doBackend(response.cidade) : null
        });
        return obj;
    }

    paraBackend(): IEndereco {
        const obj = Object.assign(Object.create(Endereco.prototype), this, {
            cidade: (this.cidade) ? this.cidade.paraBackend() : null,
        });

        return obj;
    }
}