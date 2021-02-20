import { TelaCadastroComponent } from './tela/tela-cadastro/tela-cadastro.component';
import { TelaLoginComponent } from './tela/tela-login/tela-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { configuracao } from './configuracao';
import { AuthGuardTelaInicio, TelaInicioComponent } from './tela/tela-inicio/tela-inicio.component';
import { TelaPaginaInicialSiteComponent } from './tela/tela-pagina-inicial-site/tela-pagina-inicial-site.component';

const routes: Routes = [

  {
    path: configuracao.rotaLogin,
    component: TelaLoginComponent
  }, {
    path: configuracao.rotaCadastro,
    component: TelaCadastroComponent
  },
  {
    path: configuracao.rotaInicio,
    component: TelaInicioComponent,
    canActivate: [AuthGuardTelaInicio]
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
