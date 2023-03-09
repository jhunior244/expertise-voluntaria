package br.com.ishare.controlador;

import br.com.ishare.dto.usuario.CidadeDto;
import br.com.ishare.dto.usuario.TipoUsuarioDto;
import br.com.ishare.mapeador.CidadeMapeador;
import br.com.ishare.servico.usuario.ICidadeServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

import java.util.List;

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

    @GetMapping(path = "/lista")
    public List<CidadeDto> lista(){
        return cidadeMapeador.paraDto(cidadeServico.lista());
    }
}
