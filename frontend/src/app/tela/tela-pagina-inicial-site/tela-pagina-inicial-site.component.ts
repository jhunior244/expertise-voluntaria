import { configuracao } from './../../configuracao';
import { Router } from '@angular/router';
import { SessaoService } from './../../core/sessao/sessao.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tela-pagina-inicial-site',
  templateUrl: './tela-pagina-inicial-site.component.html',
  styleUrls: ['./tela-pagina-inicial-site.component.css'],
  providers: [NgbCarouselConfig] 
})
export class TelaPaginaInicialSiteComponent implements OnInit, AfterViewInit {

  @ViewChild('vantagem') vantagem: ElementRef<HTMLDivElement>;
  @ViewChild('sobre') sobre: ElementRef<HTMLDivElement>;
  public images = ['../../../assets/images/screen_1.PNG', '../../../assets/images/screen_2.PNG', '../../../assets/images/screen_3.PNG']
  constructor(
    private sessaoService: SessaoService,
    private router: Router
  ) { 
    this.sessaoService.deslogar();
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    // child is set
  }

  entrar(){
    this.router.navigate([configuracao.rotaLogin]);
  }
  
  cadastrar(){
    this.router.navigate([configuracao.rotaCadastro]);
  }

  irParaInicio(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  irParaVangagem(){
    window.scrollTo({
      top: this.vantagem.nativeElement.offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  }

  irParaSobre(){
    window.scrollTo({
      top: this.sobre.nativeElement.offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  }

}
