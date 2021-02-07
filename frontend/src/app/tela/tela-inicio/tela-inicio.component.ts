import { NovaPublicacaoComponent } from './../../componente/nova-publicacao/nova-publicacao.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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


