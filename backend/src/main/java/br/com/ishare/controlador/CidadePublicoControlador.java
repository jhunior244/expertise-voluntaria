package br.com.ishare.controlador;

import br.com.ishare.dto.usuario.CidadeDto;
import br.com.ishare.mapeador.CidadeMapeador;
import br.com.ishare.servico.ICidadeServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

@RequestScope
@RestController
@RequestMapping("/api/public/cidade")
public class CidadePublicoControlador {

    @Autowired
    private ICidadeServico cidadeServico;

    @Autowired
    private CidadeMapeador cidadeMapeador;

    @GetMapping(path = "/obtem")
    public CidadeDto obtem(String nome, String uf){

        return cidadeMapeador.paraDto(cidadeServico.obtem(nome, uf));
    }
}
