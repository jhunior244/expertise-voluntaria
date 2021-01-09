import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Toaster, ToastType } from 'ngx-toast-notifications';

@Injectable({
    providedIn: 'root'
})
export class ErroService {

    private mensagemErro: Subject<string> = new Subject();
    private mensagemAviso: Subject<string> = new Subject();
    private mensagemSucesso: Subject<string> = new Subject();

    public mensagemErro$: Observable<string>;
    public mensagemAviso$: Observable<string>;
    public mensagemSucesso$: Observable<string>;
    public mensagemGenerica$: Observable<string>;

    constructor(
        
    ) {
        this.mensagemErro$ = this.mensagemErro.asObservable();
        this.mensagemAviso$ = this.mensagemAviso.asObservable();
        this.mensagemSucesso$ = this.mensagemSucesso.asObservable();
    }

    exibeMensagemErro(mensagem: string, toaster: Toaster): void {
        mensagem = mensagem != null && typeof mensagem === 'string' ? mensagem : 'OcorreuErroInesperado';
        toaster.open({
            text: mensagem,
            type: 'danger',
            position: 'bottom-center',
            duration: 3500,
            preventDuplicates: true
          });
    }

    exibeMensagemAviso(mensagem: string, toaster: Toaster): void {
        toaster.open({
            text: mensagem,
            type: 'warning',
            position: 'bottom-center',
            duration: 3500,
            preventDuplicates: true
          });
    }

    exibeMensagemSucesso(mensagem: string, toaster: Toaster): void {
        toaster.open({
            text: mensagem,
            type: 'success',
            position: 'bottom-center',
            duration: 3500,
            preventDuplicates: true
          });
    }
}