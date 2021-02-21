package br.com.ishare.controlador;

import br.com.ishare.dto.usuario.SetorEmpresaDto;
import br.com.ishare.mapeador.SetorEmpresaMapeador;
import br.com.ishare.servico.usuario.ISetorEmpresaServico;
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
@RequestMapping("/api/public/setorEmpresa")
public class SetorEmpresaPublicoControlador {

    @Autowired
    private ISetorEmpresaServico setorEmpresaServico;

    @Autowired
    private SetorEmpresaMapeador setorEmpresaMapeador;

    @GetMapping(path = "/lista")
    public Page<SetorEmpresaDto> lista(){

        Pageable pagina = PageRequest.of(0, 1000);

        Page<SetorEmpresaDto> page = setorEmpresaMapeador.paraDto(setorEmpresaServico.lista(pagina));

        return page;
    }
}
