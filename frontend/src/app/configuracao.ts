export const configuracao = {
    rotaBackendPublico: 'http://localhost:8080/api/public',
    rotaBackendPrivado: 'http://localhost:8080/api/private',
    hostFrontend: 'http://187.1.179.75:3000',

    rotaInicio: 'inicio',
    rotaHome: 'home',
    rotaLogin: 'login',
    rotaCadastro: 'cadastro',
    rotaListaPublicacao: 'publicacoes',
    rotaListaContatos: 'contatos',
    rotaVisualizaContato: 'detalhes-contato',
    rotaCertificados: 'certificados',
    rotaListaCertificados: 'lista',
    rotaCadastraCertificados: 'cadastra',
    rotaInterno: 'minha-conta',
    rotaPesquisaUsuarios: 'busca-contatos',
    rotaVisualizaCertificado: 'certificado',
    rotaPublicacao: 'publicacao',

    parametroId: 'id',
    parametroToken: 'token',
    parametroEmail: 'email',
    parametroNome: 'nome',
    parametroUf: 'uf',
    parametroSomenteMeusContatos: 'somenteMeusContatos',
    parametroListaIdEstado: 'listaIdEstado',
    parametroListaIdCidade: 'listaIdCidade',
    parametroListaIdAreaAtuacao: 'listaIdAreaAtuacao',
    parametroListaIdTipoUsuario: 'listaIdTipoUsuario',
    parametroMostrarApenasMinhasPublicacoes: 'mostrarApenasMinhasPublicacoes',
    parametroIdConversa: 'idConversa',
    parametroIdMensagem: 'idMensagem',
    parametroUsuarioCriador: 'usuarioCriador',
    parametroIdContato: 'idContato',

    parametroNumeroPagina: 'numeroPagina',
    parametroTamanhoPagina: 'tamanhoPagina',

    tipoUsuario: {
        PESSOA_FISICA: 1,
        PESSOA_JURIDICA: 2,
        ONG_OSC: 3
    },

    tipoPublicacao: {
        PROCURA_POR_VOLUNTARIO: 1,
        DISPONIBILIZACAO_MAO_DE_OBRA_VOLUNTARIA: 2,
    },
};
