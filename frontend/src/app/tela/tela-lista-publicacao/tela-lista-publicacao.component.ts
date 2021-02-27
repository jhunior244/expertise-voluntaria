import { PublicacaoService } from './../../servico/publicacao/publicacao.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NovaPublicacaoComponent } from 'src/app/componente/publicacao/nova-publicacao/nova-publicacao.component';

@Component({
  selector: 'app-tela-lista-publicacao',
  templateUrl: './tela-lista-publicacao.component.html',
  styleUrls: ['./tela-lista-publicacao.component.css']
})
export class TelaListaPublicacaoComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private publicacaoService: PublicacaoService) { }

  ngOnInit(): void {
  }

  novaPublicacao(): void {
    const dialogRef = this.dialog.open(NovaPublicacaoComponent, {
      width: '50vw',
      height: '70vh',
      hasBackdrop: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.publicacaoService.lista
    });
  }

}
