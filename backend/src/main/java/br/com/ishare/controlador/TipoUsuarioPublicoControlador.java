package br.com.ishare.controlador;

import br.com.ishare.dto.usuario.TipoUsuarioDto;
import br.com.ishare.mapeador.TipoUsuarioMapeador;
import br.com.ishare.servico.ITipoUsuarioServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

import java.util.List;

@RequestScope
@RestController
@RequestMapping("/api/public/tipoUsuario")
public class TipoUsuarioPublicoControlador {

    @Autowired
    private ITipoUsuarioServico tipoUsuarioServico;

    @Autowired
    private TipoUsuarioMapeador tipoUsuarioMapeador;

    @GetMapping(path = "/lista")
    public List<TipoUsuarioDto> lista(){
        return tipoUsuarioMapeador.paraDto(tipoUsuarioServico.lista());
    }

}
