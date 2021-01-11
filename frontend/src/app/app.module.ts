import { SessaoService } from './core/sessao/sessao.service';
import { AuthService } from './core/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErroInterceptor, RequestInterceptor } from './core/auth/request.interceptor';
import { TokenService } from './core/token/token.service';
import { ErroService } from './core/erro/erro.service';
import { TelaLoginComponent } from './tela/tela-login/tela-login.component';
import { TelaCadastroComponent } from './tela/tela-cadastro/tela-cadastro.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexModule } from '@angular/flex-layout';
import { UsuarioService } from './servico/usuario/usuario.service';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { TelaPaginaInicialSiteComponent } from './tela/tela-pagina-inicial-site/tela-pagina-inicial-site.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaLoginComponent,
    TelaLoginComponent,
    TelaCadastroComponent,
    TelaPaginaInicialSiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ToastNotificationsModule,
    FlexModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErroInterceptor,
      multi: true
    },
    AuthService,
    TokenService,
    ErroService,
    UsuarioService,
    SessaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
