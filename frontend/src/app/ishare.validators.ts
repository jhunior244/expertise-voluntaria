import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, of } from 'rxjs';
import { UsuarioService } from './servico/usuario/usuario.service';
import { map } from 'rxjs/operators';

export class EmailCrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(controle: FormControl | null, formulario: FormGroupDirective | NgForm | null): boolean {
    return controle.touched
      && (controle.hasError('email') || controle.hasError('required') ||
        formulario.hasError('emailJaExisteNaBase') || formulario.hasError('emailsNaoCoincidem'));
  }
}

export class SenhaCrosFieldValidator implements ErrorStateMatcher {
  isErrorState(controle: FormControl | null, formulario: FormGroupDirective | NgForm | null): boolean {
      return controle.touched && ((controle.invalid || formulario.hasError('senhasNaoCoincidem')));
  }
}

export function emailExisteNaBaseValidator(usuarioService: UsuarioService): AsyncValidatorFn {
  return (formulario: AbstractControl): Observable<ValidationErrors | null> => {
      const emailControl = formulario as FormGroup;
      const email = emailControl.controls.email.value ? emailControl.controls.email.value : null;

      if (email == null) {
          return of(null);
      }

      return usuarioService.existeUsuarioCadastradoComEmail(email)
      .pipe(map(existe => existe ? { emailJaExisteNaBase : true } : null));

  };
}

export const emailsNaoCoincidem: ValidatorFn = (formulario: AbstractControl): ValidationErrors | null => {
  const formGroup = formulario as FormGroup;
  const email = formGroup?.controls?.email.value;
  const validacaoEmail = formGroup?.controls?.validacaoEmail.value;
  return formGroup?.controls?.email?.touched && formGroup?.controls?.validacaoEmail?.touched && email !== validacaoEmail ?
      { emailsNaoCoincidem: true } : null;
};

export const senhasNaoCoindemValidator: ValidatorFn = (formulario: AbstractControl): ValidationErrors | null => {
  const formGroup = formulario as FormGroup;
  const senha = formGroup?.controls?.senha.value;
  const repetirSenha = formGroup?.controls?.repeteSenha.value;
  return formGroup?.controls?.senha?.touched && formGroup?.controls?.repeteSenha?.touched && senha !== repetirSenha ?
      { senhasNaoCoincidem: true } : null;
};


