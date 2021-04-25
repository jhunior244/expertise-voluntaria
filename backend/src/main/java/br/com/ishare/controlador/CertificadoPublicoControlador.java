package br.com.ishare.controlador;

import br.com.ishare.dto.certificado.CertificadoDto;
import br.com.ishare.mapeador.CertificadoMapeador;
import br.com.ishare.servico.certificado.CertificadoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

import java.util.UUID;

@RequestScope
@RestController
@RequestMapping("/api/public/certificado")
public class CertificadoPublicoControlador {

    @Autowired
    private CertificadoServico certificadoServico;

    @Autowired
    private CertificadoMapeador certificadoMapeador;

    @GetMapping(path = "/obtem")
    public CertificadoDto obtem(String id){

        return certificadoMapeador.paraDto(certificadoServico.obtem(UUID.fromString(id)));
    }
}
