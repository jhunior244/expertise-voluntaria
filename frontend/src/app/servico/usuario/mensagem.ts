import { Conversa, IConversa } from 'src/app/servico/usuario/conversa';
import * as moment from 'moment';
import { IUsuario, Usuario } from '../usuario/usuario';

export class IMensagem {
    id: string;
    texto: string;
    data: moment.Moment;
    usuario: IUsuario;
    conversa: IConversa;
}

export class Mensagem {
    id: string;
    texto: string;
    data: moment.Moment;
    usuario: Usuario;
    conversa: Conversa;

    static listaDoBackend(response: IMensagem[]): Mensagem[] {
        const lista: Mensagem[] = [];

        for (const json of response) {
            lista.push(this.doBackend(json));
        }
        return lista;
    }

    static doBackend(response: IMensagem): Mensagem | null {
        let mensagem = Object.create(Mensagem.prototype);
        if (response == null) {
            return null;
        }

        mensagem = Object.assign(mensagem, response, {
            data: (response.data) ? moment(response.data) : null,
            usuario: (response.usuario) ? Usuario.doBackend(response.usuario) : null,
            conversa: (response.conversa) ? Conversa.doBackend(response.conversa) : null,
        });
        return mensagem;
    }

    paraBackend(): IMensagem {
        const mensagem = Object.assign(Object.create(Mensagem.prototype), this, {
            data: (this.data) ? moment(this.data).toDate().toISOString() : null,
            usuario: (this.usuario) ? this.usuario.paraBackend() : null,
            conversa: (this.conversa) ? this.conversa.paraBackend() : null,
        });
        return mensagem;
    }
}