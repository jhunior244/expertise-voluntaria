export const configuracao = {
    rotaBackendPublico: 'http://localhost:8080/api/public',
    rotaBackendPrivado: 'http://localhost:8080/api/private',

    rotaInicio: 'inicio',
    rotaHome: 'home',
    rotaLogin: 'login',
    rotaCadastro: 'cadastro',
    rotaListaPublicacao: 'publicacoes',
    rotaListaContatos: 'contatos',
    rotaVisualizaContato: 'detalhes-contato',
    rotaCertificados: 'certificados',
    rotaInterno: 'minha-conta',

    parametroId: 'id',
    parametroToken: 'token',
    parametroEmail: 'email',
    parametroNome: 'nome',
    parametroUf: 'uf',
    parametroListaIdEstado: 'listaIdEstado',
    parametroListaIdCidade: 'listaIdCidade',
    parametroListaIdAreaAtuacao: 'listaIdAreaAtuacao',
    parametroListaIdTipoUsuario: 'listaIdTipoUsuario',
    parametroMostrarApenasMinhasPublicacoes: 'mostrarApenasMinhasPublicacoes',

    tipoUsuario: {
        PESSOA_FISICA: 1,
        PESSOA_JURIDICA: 2,
        ONG_OSC: 3
    },
};
