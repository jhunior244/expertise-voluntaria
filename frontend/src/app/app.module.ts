import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectEstadoComponent } from './componente/select-estado/select-estado.component';
import { SelectTipoUsuarioComponent } from './componente/select-tipo-usuario/select-tipo-usuario.component';
import { AuthService } from './core/auth/auth.service';
import { ErroInterceptor, RequestInterceptor } from './core/auth/request.interceptor';
import { ErroService } from './core/erro/erro.service';
import { SessaoService } from './core/sessao/sessao.service';
import { TokenService } from './core/token/token.service';
import { EnderecoPorCepService } from './servico/endereco-por-cep/endereco-por-cep.service';
import { CidadeService } from './servico/usuario/cidade.service';
import { EstadoService } from './servico/usuario/estado.service';
import { TipoUsuarioService } from './servico/usuario/tipo-usuario.service';
import { UsuarioService } from './servico/usuario/usuario.service';
import { TelaCadastroComponent } from './tela/tela-cadastro/tela-cadastro.component';
import { AuthGuardTelaInicio, TelaInicioComponent } from './tela/tela-inicio/tela-inicio.component';
import { TelaLoginComponent } from './tela/tela-login/tela-login.component';
import { MatSliderModule } from '@angular/material/slider';
import { TelaPaginaInicialSiteComponent } from './tela/tela-pagina-inicial-site/tela-pagina-inicial-site.component';
import { MatIconModule } from '@angular/material/icon';
import { UploadArquivoService } from './servico/upload-arquivo/upload-arquivo.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagemService } from './servico/imagem/imagem.service';
import { PublicacaoService } from './servico/publicacao/publicacao.service';
import { CardPublicacaoComponent } from './componente/publicacao/card-publicacao/card-publicacao.component';
import { ListaPublicacaoComponent } from './componente/publicacao/lista-publicacao/lista-publicacao.component';
import { NovaPublicacaoComponent } from './componente/publicacao/nova-publicacao/nova-publicacao.component';
import {MatCardModule} from '@angular/material/card';
import { SelectSetorEmpresaComponent } from './componente/select-setor-empresa/select-setor-empresa.component';


@NgModule({
  declarations: [
    AppComponent,
    TelaLoginComponent,
    NovaPublicacaoComponent,
    TelaLoginComponent,
    TelaInicioComponent,
    TelaCadastroComponent,
    TelaPaginaInicialSiteComponent,
    SelectTipoUsuarioComponent,
    SelectEstadoComponent,
    ListaPublicacaoComponent,
    CardPublicacaoComponent,
    SelectSetorEmpresaComponent,
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
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule
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
    EstadoService,
    TokenService,
    ErroService,
    UsuarioService,
    SessaoService,
    TipoUsuarioService,
    EnderecoPorCepService,
    CidadeService,
    UploadArquivoService,
    ImagemService,
    PublicacaoService,
    AuthGuardTelaInicio
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
