import { Avaliacao, IAvaliacao } from './../avaliacao/avaliacao';
import { IPublicacao, Publicacao } from './../publicacao/publicacao';
import { AreaAtuacao, IAreaAtuacao } from './../area-atuacao/area-atuacao';
import * as moment from 'moment';
import { IImagem, Imagem } from '../imagem/imagem';
import { IUsuario, Usuario } from '../usuario/usuario';

export class ICertificado {
    id: string;
    tempoTrabalhado: string;
    dataCriacao: moment.Moment;
    areaAtuacao: IAreaAtuacao;
    imagem: IImagem;
    usuario: IUsuario;
    usuarioResponsavelCriacao: IUsuario;
    publicacao: IPublicacao;
    avaliacao: IAvaliacao;
}

export class Certificado {
    id: string;
    tempoTrabalhado: string;
    dataCriacao: moment.Moment;
    areaAtuacao: AreaAtuacao;
    imagem: Imagem;
    usuario: Usuario;
    usuarioResponsavelCriacao: Usuario;
    publicacao: Publicacao;
    avaliacao: Avaliacao;

    static listaDoBackend(response: ICertificado[]): Certificado[] {
        const lista: Certificado[] = [];
        
        for (const json of response) {
            lista.push(this.doBackend(json));
        }
        return lista;
    }

    static doBackend(response: ICertificado): Certificado | null {
        let usuario = Object.create(Certificado.prototype);
        if (response == null) {
            return null;
        }

        usuario = Object.assign(usuario, response, {
            dataCriacao: (response.dataCriacao) ? moment(response.dataCriacao) : null,
            areaAtuacao: (response.areaAtuacao) ? AreaAtuacao.doBackend(response.areaAtuacao) : null,
            imagem: (response.imagem) ? Imagem.doBackend(response.imagem) : null,
            usuario: (response.usuario) ? Usuario.doBackend(response.usuario) : null,
            usuarioResponsavelCriacao: (response.usuarioResponsavelCriacao) ? Usuario.doBackend(response.usuarioResponsavelCriacao) : null,
            publicacao: (response.publicacao) ? Publicacao.doBackend(response.publicacao) : null,
            avaliacao: (response.avaliacao) ? Avaliacao.doBackend(response.avaliacao) : null,
        });
        return usuario;
    }

    paraBackend(): ICertificado {
        const certificado = Object.assign(Object.create(Certificado.prototype), this, {
            dataCriacao: (this.dataCriacao) ? moment(this.dataCriacao).toDate().toISOString() : null,
            areaAtuacao: (this.areaAtuacao) ? this.areaAtuacao.paraBackend() : null,
            imagem: (this.imagem) ? this.imagem.paraBackend() : null,
            usuario: (this.usuario) ? this.usuario.paraBackend() : null,
            usuarioResponsavelCriacao: (this.usuarioResponsavelCriacao) ? this.usuarioResponsavelCriacao.paraBackend() : null,
            publicacao: (this.publicacao) ? this.publicacao.paraBackend() : null,
            avaliacao: (this.avaliacao) ? this.avaliacao.paraBackend() : null,
        });
        return certificado;
    }
}