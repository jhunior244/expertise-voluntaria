package br.com.ishare.controlador;

import br.com.ishare.dto.usuario.AreaAtuacaoDto;
import br.com.ishare.mapeador.AreaAtuacaoMapeador;
import br.com.ishare.servico.usuario.IAreaAtuacaoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

@RequestScope
@RestController
@RequestMapping("/api/public/areaAtuacao")
public class AreaAtuacaoPublicoControlador {

    @Autowired
    private IAreaAtuacaoServico areaAtuacaoServico;

    @Autowired
    private AreaAtuacaoMapeador areaAtuacaoMapeador;

    @GetMapping(path = "/lista")
    public Page<AreaAtuacaoDto> lista(){

        Pageable pagina = PageRequest.of(0, 1000);

        Page<AreaAtuacaoDto> page = areaAtuacaoMapeador.paraDto(areaAtuacaoServico.lista(pagina));

        return page;
    }
}
