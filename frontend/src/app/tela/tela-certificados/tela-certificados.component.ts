import { configuracao } from 'src/app/configuracao';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-certificados',
  templateUrl: './tela-certificados.component.html',
  styleUrls: ['./tela-certificados.component.css']
})
export class TelaCertificadosComponent implements OnInit {

  constructor(
    private router: Router
  ) { 
  }

  ngOnInit(): void {
  }

}
