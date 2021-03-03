import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardPublicacaoComponent } from './componente/publicacao/card-publicacao/card-publicacao.component';
import { ListaPublicacaoComponent } from './componente/publicacao/lista-publicacao/lista-publicacao.component';
import { NovaPublicacaoComponent } from './componente/publicacao/nova-publicacao/nova-publicacao.component';
import { SelectAreaAtuacaoComponent } from './componente/select-area-atuacao/select-area-atuacao.component';
import { SelectCidadeComponent } from './componente/select-cidade/select-cidade.component';
import { SelectEstadoComponent } from './componente/select-estado/select-estado.component';
import { SelectTipoPublicacaoComponent } from './componente/select-tipo-publicacao/select-tipo-publicacao.component';
import { SelectTipoUsuarioComponent } from './componente/select-tipo-usuario/select-tipo-usuario.component';
import { AuthService } from './core/auth/auth.service';
import { ErroInterceptor, RequestInterceptor } from './core/auth/request.interceptor';
import { ErroService } from './core/erro/erro.service';
import { SessaoService } from './core/sessao/sessao.service';
import { TokenService } from './core/token/token.service';
import { AreaAtuacaoService } from './servico/area-atuacao/area-atuacao.service';
import { EnderecoPorCepService } from './servico/endereco-por-cep/endereco-por-cep.service';
import { ImagemService } from './servico/imagem/imagem.service';
import { PublicacaoService } from './servico/publicacao/publicacao.service';
import { TipoPublicacaoService } from './servico/publicacao/tipo-publicacao.service';
import { UploadArquivoService } from './servico/upload-arquivo/upload-arquivo.service';
import { CidadeService } from './servico/usuario/cidade.service';
import { EstadoService } from './servico/usuario/estado.service';
import { TipoUsuarioService } from './servico/usuario/tipo-usuario.service';
import { UsuarioService } from './servico/usuario/usuario.service';
import { TelaCadastroComponent } from './tela/tela-cadastro/tela-cadastro.component';
import { AuthGuardTelaInicio, TelaInicioComponent } from './tela/tela-inicio/tela-inicio.component';
import { TelaInicioService } from './tela/tela-inicio/tela-inicio.service';
import { TelaListaContatosComponent } from './tela/tela-lista-contatos/tela-lista-contatos.component';
import { TelaListaPublicacaoComponent } from './tela/tela-lista-publicacao/tela-lista-publicacao.component';
import { TelaLoginComponent } from './tela/tela-login/tela-login.component';
import { TelaPaginaInicialSiteComponent } from './tela/tela-pagina-inicial-site/tela-pagina-inicial-site.component';
import { DialogoAguardeComponent } from './componente/dialogo-aguarde/dialogo-aguarde.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TelaContatosComponent } from './tela/tela-contatos/tela-contatos.component';
import { TelaCertificadosComponent } from './tela/tela-certificados/tela-certificados.component';

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
    SelectAreaAtuacaoComponent,
    TelaListaPublicacaoComponent,
    SelectCidadeComponent,
    SelectTipoPublicacaoComponent,
    TelaListaContatosComponent,
    DialogoAguardeComponent,
    TelaContatosComponent,
    TelaCertificadosComponent
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
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule
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
    AuthGuardTelaInicio,
    AreaAtuacaoService,
    TipoPublicacaoService,
    TelaInicioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
