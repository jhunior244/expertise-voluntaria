import { SessaoService } from './../../core/sessao/sessao.service';
import { CidadeService } from './../../servico/usuario/cidade.service';
import { SenhaCrosFieldValidator, emailsNaoCoincidem } from './../../ishare.validators';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { EmailCrossFieldErrorMatcher, emailExisteNaBaseValidator, senhasNaoCoindemValidator } from 'src/app/ishare.validators';
import { Cidade } from 'src/app/servico/usuario/cidade';
import { Endereco } from 'src/app/servico/usuario/endereco';
import { UsuarioService } from 'src/app/servico/usuario/usuario.service';
import { Md5 } from 'ts-md5';
import { configuracao } from './../../configuracao';
import { AuthService } from './../../core/auth/auth.service';
import { ErroService } from './../../core/erro/erro.service';
import { Usuario } from './../../servico/usuario/usuario';
import { EnderecoPorCepService } from 'src/app/servico/endereco-por-cep/endereco-por-cep.service';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css']
})
export class TelaCadastroComponent implements OnInit {

  public formGroup: FormGroup;
  public emailMatcher = new EmailCrossFieldErrorMatcher();
  public senhaMatcher = new SenhaCrosFieldValidator();
  private usuario: Usuario;
  private endereco: Endereco;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private erroService: ErroService,
    private router: Router,
    private toaster: Toaster,
    private enderecoPorCepService: EnderecoPorCepService,
    private cidadeService: CidadeService,
    private sessaoService: SessaoService
  ) {
    this.formGroup = this.formBuilder.group({
      nome: [null, Validators.required],
      tipoUsuario: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      validacaoEmail: [null, Validators.compose([Validators.required, Validators.email])],
      rua: [null, Validators.required],
      cep: [null, Validators.required],
      numero: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
      senha: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      repeteSenha: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])]
    }, {
      validators: [
        emailsNaoCoincidem,
        senhasNaoCoindemValidator
      ],
      asyncValidators: [
        emailExisteNaBaseValidator(this.usuarioService)
      ],
      updateOn: 'blur'
    });
  }

  get email(): FormControl { return this.formGroup.controls.email as FormControl; }
  get validacaoEmail(): FormControl { return this.formGroup.controls.validacaoEmail as FormControl; }
  get nome(): FormControl { return this.formGroup.controls.nome as FormControl; }
  get tipoUsuario(): FormControl { return this.formGroup.controls.tipoUsuario as FormControl; }
  get cep(): FormControl { return this.formGroup.controls.cep as FormControl; }
  get rua(): FormControl { return this.formGroup.controls.rua as FormControl; }
  get numero(): FormControl { return this.formGroup.controls.numero as FormControl; }
  get bairro(): FormControl { return this.formGroup.controls.bairro as FormControl; }
  get cidade(): FormControl { return this.formGroup.controls.cidade as FormControl; }
  get estado(): FormControl { return this.formGroup.controls.estado as FormControl; }
  get senha(): FormControl { return this.formGroup.controls.senha as FormControl; }
  get repeteSenha(): FormControl { return this.formGroup.controls.repeteSenha as FormControl; }

  ngOnInit(): void {
    this.sessaoService.deslogar();
    this.cep.valueChanges.subscribe((cepEscrito: string) => {
      if (cepEscrito.length === 8) {
        this.enderecoPorCepService.obtemEndereco(this.cep.value).subscribe(enderecoRetornado => {
          if (enderecoRetornado?.localidade) {
            this.cidadeService.obtem(enderecoRetornado.localidade, enderecoRetornado.uf).subscribe(cidadeRetornada => {
              this.endereco = Endereco.integracaoParaEndereco(enderecoRetornado, cidadeRetornada);
              this.enderecoIntegracaoParaFormulario(this.endereco);
            }, (erro: HttpErrorResponse) => {
              console.log(erro);
              this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
            });
          } else {
            this.limpaCamposCep();
          }

        }, (erro: HttpErrorResponse) => {
          console.log(erro);
          this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
        });
      }
    });
  }

  enderecoIntegracaoParaFormulario(endereco: Endereco) {
    this.rua.setValue(endereco?.rua);
    this.bairro.setValue(endereco?.bairro);
    this.cidade.setValue(endereco?.cidade?.nome);
    this.estado.setValue(endereco?.cidade?.estado);
    this.rua.disable();
    this.bairro.disable();
    this.cidade.disable();
    this.estado.disable();
  }

  limpaCamposCep(): void {
    this.rua.setValue(null);
    this.bairro.setValue(null);
    this.cidade.setValue(null);
    this.estado.setValue(null);
    this.rua.enable();
    this.bairro.enable();
    this.cidade.enable();
    this.estado.enable();
  }

  formularioParaEntidade(): void {
    this.usuario = new Usuario();
    this.usuario.endereco = new Endereco();
    this.usuario.endereco.cidade = new Cidade();
    this.usuario.nome = this.nome.value;
    this.usuario.tipoUsuario = this.tipoUsuario.value;
    this.usuario.email = this.email.value;
    this.usuario.endereco.rua = this.rua.value;
    this.usuario.endereco.bairro = this.bairro.value;
    this.usuario.endereco.cep = this.cep.value;
    this.usuario.endereco.numero = this.numero.value;
    this.usuario.endereco.cidade.id = this.endereco?.cidade?.id;
    this.usuario.endereco.cidade.nome = this.cidade.value;
    this.usuario.endereco.cidade.estado = this.estado.value;
    this.usuario.senha = Md5.hashStr(this.senha.value).toString();
  }

  cadastrar(): void {
    this.formularioParaEntidade();

    this.usuarioService.cria(this.usuario).subscribe(() => {
      this.erroService.exibeMensagemSucesso('Usuário criado com sucesso.', this.toaster);
      this.authService.autenticar(this.usuario).subscribe(() => {
        this.router.navigate([configuracao.rotaInicio]);
      }, (erro: HttpErrorResponse) => {
        console.log(erro);
        this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
      });
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    });
  }

}
