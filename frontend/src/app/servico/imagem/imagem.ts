import * as moment from 'moment';

export class IImagem {
    id: number;
    nome: string;
    tipo: string;
    conteudoBase64: string;
    conteudo: any;
}

export class Imagem {
    id: number;
    nome: string;
    tipo: string;
    conteudoBase64: string;
    conteudo: any;

    static listaDoBackend(response: IImagem[]): Imagem[] {
        const lista: Imagem[] = [];

        for (const objJSON of response) {
            lista.push(this.doBackend(objJSON));
        }

        return lista;
    }

    static listaParaBackend(listaImagem: Imagem[]): IImagem[] {
        const lista: IImagem[] = [];

        for (const imagem of listaImagem) {
            lista.push(imagem.paraBackend());
        }

        return lista;
    }

    static doBackend(response: IImagem): Imagem {
        let imagem = Object.create(Imagem.prototype);

        if (response == null) {
            return null;
        }

        imagem = Object.assign(imagem, response, {
            conteudo: (response.conteudoBase64) ? 'data:image/jpg;base64,'.concat(this.retiraAspas(response.conteudoBase64)) : null,
            conteudoBase64: null
        });
        return imagem;
    }

    private static retiraAspas(conteudo: string): string {
        if (conteudo == null) {
            return '';
        }
        return conteudo.substring(1, conteudo.length - 1);
    }

    public paraBackend(): IImagem {
        const imagem = Object.assign(Object.create(Imagem.prototype), this, {
            conteudoBase64: (this.conteudo) ? this.conteudo.substring(23) : null,
        });
        return imagem;
    }
}