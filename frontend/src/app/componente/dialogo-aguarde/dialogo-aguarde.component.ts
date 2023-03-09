import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

const defaultDialogConfig = new MatDialogConfig();

@Component({
  selector: 'app-dialogo-aguarde',
  templateUrl: './dialogo-aguarde.component.html',
  styleUrls: ['./dialogo-aguarde.component.css']
})
export class DialogoAguardeComponent implements OnInit {
  public static configProgressSpinner = {
    disableClose: true,
    panelClass: 'dialogo-aguarde',
    hasBackdrop: true,
    backdropClass: '',
    width: '30%',
    height: '',
    minWidth: '',
    minHeight: '',
    maxWidth: defaultDialogConfig.maxWidth,
    maxHeight: '',
    data: {
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
