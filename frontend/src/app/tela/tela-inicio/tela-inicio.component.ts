import { SessaoService } from './../../core/sessao/sessao.service';
import { Estado } from './../../servico/usuario/estado';
import { configuracao } from './../../configuracao';
import { Observable } from 'rxjs';
import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NovaPublicacaoComponent } from 'src/app/componente/publicacao/nova-publicacao/nova-publicacao.component';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Injectable()
export class AuthGuardTelaInicio implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.autenticado().pipe(map(autenticado => {
      if (autenticado) {
        return true;
      } else {
        this.router.navigate([configuracao.rotaLogin]);
        return false;
      }
    }));
  }
}

@Component({
  selector: 'app-tela-inicio',
  templateUrl: './tela-inicio.component.html',
  styleUrls: ['./tela-inicio.component.css']
})
export class TelaInicioComponent implements OnInit {

  public formGroup: FormGroup;
  public estado: string;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private sessaoService: SessaoService
  ) {
    this.formGroup = this.formBuilder.group({
      expertiseNecessaria: [null],
      uf: [null],
      cidade: [null]
    });

    this.estado = this.sessaoService.getUf();
  }

  get expertiseNecessaria(): FormControl { return this.formGroup.controls.expertiseNecessaria as FormControl; }
  get uf(): FormControl { return this.formGroup.controls.uf as FormControl; }
  get cidade(): FormControl { return this.formGroup.controls.cidade as FormControl; }

  ngOnInit(): void {
    this.uf.valueChanges.subscribe((estado: Estado) => {
      if (estado) {
        this.estado = estado.uf;
      }
    });
  }
}


