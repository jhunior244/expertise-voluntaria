import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Publicacao } from 'src/app/servico/publicacao/publicacao';

@Injectable({providedIn: 'root'})
export class TelaUsuarioService {

    private listaPublicacaoSubject = new BehaviorSubject<Publicacao[]>(null);
    

}