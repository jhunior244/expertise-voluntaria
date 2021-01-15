import { EstadoService } from './estado.service';
import { Cidade, ICidade } from './cidade';
import { Estado } from './estado';

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

    static integracaoParaEndereco(response: any, estadoService: EstadoService): Endereco {

        if (response == null) {
            return null;
        }
        console.log(response);

        const cidade = new Cidade();

        estadoService.obtem(response.uf).subscribe(estadoRetornado => {
            cidade.estado = estadoRetornado;
        });

        cidade.nome = response.localidade;
        const endereco = new Endereco();

        endereco.cidade = cidade;
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