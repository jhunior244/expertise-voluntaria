import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { EmailCrossFieldErrorMatcher } from 'src/app/ishare.validators';
import { Usuario } from 'src/app/servico/usuario/usuario';
import { Md5 } from 'ts-md5/dist/md5';
import { configuracao } from './../../configuracao';
import { AuthService } from './../../core/auth/auth.service';
import { ErroService } from './../../core/erro/erro.service';
import { SessaoService } from './../../core/sessao/sessao.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent implements OnInit {

  public formGroup: FormGroup;
  public emailMatcher = new EmailCrossFieldErrorMatcher();
  public rotasSistema = configuracao;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private erroService: ErroService,
    private router: Router,
    private sessaoService: SessaoService,
    private toaster: Toaster
    ) { 
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      senha: [null, Validators.required]
    });
  }

  get email(): FormControl { return this.formGroup.controls.email as FormControl; }
  get senha(): FormControl { return this.formGroup.controls.senha as FormControl; }

  ngOnInit(): void {
    this.sessaoService.deslogar();
  }

  logar(): void {
    const usuario = new Usuario();
    usuario.email = this.email.value;
    usuario.senha = Md5.hashStr(this.senha.value).toString();
    this.authService.autenticar(usuario).subscribe(resposta => {
      this.router.navigate([configuracao.rotaInterno]);
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    });
  }

  cadastro(){
    this.router.navigate([configuracao.rotaCadastro]);
  }

}
