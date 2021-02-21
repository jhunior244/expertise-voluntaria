export class ISetorEmpresa {
    id: string;
    nome: string;
}

export class SetorEmpresa {
    id: string;
    nome: string;

    static listaDoBackend(response: ISetorEmpresa[]): SetorEmpresa[] {
        const lista: SetorEmpresa[] = [];

        for (const objJSON of response) {
            lista.push(this.doBackend(objJSON));
        }

        return lista;
    }

    static listaParaBackend(listaImagem: SetorEmpresa[]): ISetorEmpresa[] {
        const lista: ISetorEmpresa[] = [];

        for (const imagem of listaImagem) {
            lista.push(imagem.paraBackend());
        }

        return lista;
    }

    static doBackend(response: ISetorEmpresa): SetorEmpresa {
        let setor = Object.create(SetorEmpresa.prototype);

        if (response == null) {
            return null;
        }

        setor = Object.assign(setor, response, {
        });
        return setor;
    }

    public paraBackend(): ISetorEmpresa {
        const area = Object.assign(Object.create(SetorEmpresa.prototype), this, {
        });
        return area;
    }
}