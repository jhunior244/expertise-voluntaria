export class IAreaAtuacao {
    id: string;
    nome: string;
}

export class AreaAtuacao {
    id: string;
    nome: string;

    static listaDoBackend(response: IAreaAtuacao[]): AreaAtuacao[] {
        const lista: AreaAtuacao[] = [];

        for (const objJSON of response) {
            lista.push(this.doBackend(objJSON));
        }

        return lista;
    }

    static listaParaBackend(listaImagem: AreaAtuacao[]): IAreaAtuacao[] {
        const lista: IAreaAtuacao[] = [];

        for (const imagem of listaImagem) {
            lista.push(imagem.paraBackend());
        }

        return lista;
    }

    static doBackend(response: IAreaAtuacao): AreaAtuacao {
        let area = Object.create(AreaAtuacao.prototype);

        if (response == null) {
            return null;
        }

        area = Object.assign(area, response, {
        });
        return area;
    }

    public paraBackend(): IAreaAtuacao {
        const area = Object.assign(Object.create(AreaAtuacao.prototype), this, {
        });
        return area;
    }
}