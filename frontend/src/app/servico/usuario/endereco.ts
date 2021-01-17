import { EstadoService } from './estado.service';
import { Cidade, ICidade } from './cidade';
import { Estado } from './estado';
import { CidadeService } from './cidade.service';

export class IEndereco {
    id: string;
    rua: string;
    cep: string;
    bairro: string;
    numero: string;
    cidade: ICidade;
}

export class Endereco {
    id: string;
    rua: string;
    cep: string;
    bairro: string;
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

    static integracaoParaEndereco(response: any, cidade: Cidade): Endereco {

        if (response == null || cidade == null) {
            return null;
        }
        const endereco = new Endereco();
        endereco.cidade = cidade;
        endereco.bairro = response.bairro;
        endereco.cep = response.cep;
        endereco.rua = response.logradouro;
        endereco.numero = response.numero;

        return endereco;
    }

    paraBackend(): IEndereco {
        const obj = Object.assign(Object.create(Endereco.prototype), this, {
            cidade: (this.cidade) ? this.cidade.paraBackend() : null,
        });

        return obj;
    }
}