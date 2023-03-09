package br.com.ishare.controlador;

import br.com.ishare.dto.publicacao.TipoPublicacaoDto;
import br.com.ishare.mapeador.TipoPublicacaoMapeador;
import br.com.ishare.servico.publicacao.ITipoPublicacaoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

import java.util.List;

@RequestScope
@RestController
@RequestMapping("/api/private/tipoPublicacao")
public class TipoPublicacaoProtegidoControlador {

    @Autowired
    private ITipoPublicacaoServico tipoPublicacaoServico;

    @Autowired
    private TipoPublicacaoMapeador tipoPublicacaoMapeador;

    @GetMapping(path = "/lista")
    public List<TipoPublicacaoDto> lista() {return this.tipoPublicacaoMapeador.paraDto(tipoPublicacaoServico.lista());}
}
