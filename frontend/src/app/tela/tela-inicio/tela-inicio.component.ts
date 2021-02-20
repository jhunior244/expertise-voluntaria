import { configuracao } from './../../configuracao';
import { Observable } from 'rxjs';
import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NovaPublicacaoComponent } from 'src/app/componente/publicacao/nova-publicacao/nova-publicacao.component';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardTelaInicio implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.autenticado().pipe(map(autenticado => {
      if (autenticado) {
        console.log('authenticated');
        return true;
      } else {
        console.log('not authenticated');
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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  novaPublicacao() {
    const dialogRef = this.dialog.open(NovaPublicacaoComponent, {
      width: '50vw',
      height: '70vh',
      hasBackdrop: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}


