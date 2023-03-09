package br.com.ishare.controlador;

import br.com.ishare.dto.usuario.EstadoDto;
import br.com.ishare.mapeador.EstadoMapeador;
import br.com.ishare.servico.usuario.IEstadoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

import java.util.List;

@RequestScope
@RestController
@RequestMapping("/api/public/estado")
public class EstadoPublicoControlador {

    @Autowired
    private IEstadoServico estadoServico;

    @Autowired
    private EstadoMapeador estadoMapeador;

    @GetMapping(path = "/lista")
    public List<EstadoDto> lista(String uf){
        return estadoMapeador.paraDto(estadoServico.lista(uf));
    }

    @GetMapping(path = "/obtem")
    public EstadoDto obtem(String uf){

        return estadoMapeador.paraDto(estadoServico.obtem(uf));
    }
}
