import { TelaVisualizaPublicacaoComponent } from './tela/tela-visualiza-publicacao/tela-visualiza-publicacao.component';
import { TelaVisualizaCertificadoComponent } from './tela/tela-visualiza-certificado/tela-visualiza-certificado.component';
import { TelaCertificadosComponent } from './tela/tela-certificados/tela-certificados.component';
import { TelaListaContatosComponent } from './tela/tela-lista-contatos/tela-lista-contatos.component';
import { TelaListaPublicacaoComponent } from './tela/tela-lista-publicacao/tela-lista-publicacao.component';
import { TelaCadastroComponent } from './tela/tela-cadastro/tela-cadastro.component';
import { TelaLoginComponent } from './tela/tela-login/tela-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { configuracao } from './configuracao';
import { AuthGuardTelaInicio, TelaInicioComponent } from './tela/tela-inicio/tela-inicio.component';
import { TelaPaginaInicialSiteComponent } from './tela/tela-pagina-inicial-site/tela-pagina-inicial-site.component';
import { TelaVisualizaPerfilUsuarioComponent } from './tela/tela-visualiza-perfil-usuario/tela-visualiza-perfil-usuario.component';
import { ListaCertificadosComponent } from './componente/certificados/lista-certificados/lista-certificados.component';
import { CriaCertificadoComponent } from './componente/certificados/cria-certificado/cria-certificado.component';
import { TelaPesquisaUsuariosComponent } from './tela/tela-pesquisa-usuarios/tela-pesquisa-usuarios.component';

const routes: Routes = [

  {
    path: configuracao.rotaLogin,
    component: TelaLoginComponent
  }, {
    path: configuracao.rotaCadastro,
    component: TelaCadastroComponent
  }, {
    path: configuracao.rotaVisualizaCertificado + '/:' + configuracao.parametroId,
    component: TelaVisualizaCertificadoComponent
  }, {
    path: configuracao.rotaPublicacao + '/:' + configuracao.parametroId,
    component: TelaVisualizaPublicacaoComponent
  }, {
    path: configuracao.rotaInterno,
    component: TelaInicioComponent,
    canActivate: [AuthGuardTelaInicio],
    children: [
      {
        path: '',
        redirectTo: configuracao.rotaListaPublicacao,
        pathMatch: 'full'
      }, {
        path: configuracao.rotaListaPublicacao,
        component: TelaListaPublicacaoComponent
      }, {
        path: configuracao.rotaListaContatos,
        component: TelaListaContatosComponent
      }, {
        path: configuracao.rotaPesquisaUsuarios,
        component: TelaPesquisaUsuariosComponent
      }, {
        path: configuracao.rotaVisualizaContato + '/:' + configuracao.parametroId,
        component: TelaVisualizaPerfilUsuarioComponent
      }, {
        path: configuracao.rotaCertificados,
        component: TelaCertificadosComponent,
        children: [
          {
            path: '',
            redirectTo: configuracao.rotaListaCertificados,
            pathMatch: 'full'
          }, {
            path: configuracao.rotaListaCertificados,
            component: ListaCertificadosComponent
          }, {
            path: configuracao.rotaCadastraCertificados,
            component: CriaCertificadoComponent
          }
        ]
      }
    ]
  }, {
    path: configuracao.rotaHome,
    component: TelaPaginaInicialSiteComponent
  },
  // {
  //   path: '',
  //   component: TelaPaginaInicialSiteComponent,
  // }, 
  {
   path: '**',
   redirectTo: configuracao.rotaHome,
   pathMatch: 'full'
 }, 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
