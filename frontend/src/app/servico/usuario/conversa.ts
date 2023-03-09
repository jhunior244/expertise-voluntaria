import * as moment from 'moment';
import { IUsuario, Usuario } from '../usuario/usuario';

export class IConversa {
    id: string;
    dataCriacao: moment.Moment;
    dataUltimaModificacao: moment.Moment;
    novasMensagems: number;
    contato: IUsuario;
}

export class Conversa {
    id: string;
    dataCriacao: moment.Moment;
    dataUltimaModificacao: moment.Moment;
    novasMensagems: number;
    contato: Usuario;

    static listaDoBackend(response: IConversa[]): Conversa[] {
        const lista: Conversa[] = [];

        for (const json of response) {
            lista.push(this.doBackend(json));
        }
        return lista;
    }

    static doBackend(response: IConversa): Conversa | null {
        let usuario = Object.create(Conversa.prototype);
        if (response == null) {
            return null;
        }

        usuario = Object.assign(usuario, response, {
            dataCriacao: (response.dataCriacao) ? moment(response.dataCriacao) : null,
            dataUltimaModificacao: (response.dataUltimaModificacao) ? moment(response.dataUltimaModificacao) : null,
            contato: (response.contato) ? Usuario.doBackend(response.contato) : null,
        });
        return usuario;
    }

    paraBackend(): IConversa {
        const conversa = Object.assign(Object.create(Conversa.prototype), this, {
            dataCriacao: (this.dataCriacao) ? moment(this.dataCriacao).toDate().toISOString() : null,
            dataUltimaModificacao: (this.dataUltimaModificacao) ? moment(this.dataUltimaModificacao).toDate().toISOString() : null,
            contato: (this.contato) ? this.contato.paraBackend() : null,
        });
        return conversa;
    }
}