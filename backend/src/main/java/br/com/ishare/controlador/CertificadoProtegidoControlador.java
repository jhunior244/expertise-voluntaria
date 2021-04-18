package br.com.ishare.controlador;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.certificado.CertificadoDto;
import br.com.ishare.dto.publicacao.PublicacaoDto;
import br.com.ishare.entidade.usuario.Certificado;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.entidade.usuario.UsuarioTelaContatoDto;
import br.com.ishare.mapeador.CertificadoMapeador;
import br.com.ishare.servico.certificado.ICertificadoServico;
import br.com.ishare.servico.usuario.UsuarioServico;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.jodconverter.core.office.OfficeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.io.IOException;

@RequestScope
@RestController
@RequestMapping("/api/private/certificado")
public class CertificadoProtegidoControlador {

    @Autowired
    private UsuarioServico usuarioServico;

    @Autowired
    private ICertificadoServico certificadoServico;

    @Autowired
    private CertificadoMapeador certificadoMapeador;

    @PostMapping(path = "/cria")
    public Certificado cria(@RequestHeader(name="Authorization") String token, @RequestBody CertificadoDto certificadoDto) throws IOException, OfficeException {

        Usuario usuario = usuarioServico.obtemPorToken(token);
        if(ObjectUtils.isEmpty(usuario)){
            throw new IShareExcessao("Usuário não encontrado", HttpStatus.BAD_REQUEST);
        }

        return certificadoServico.cria(certificadoMapeador.doDto(certificadoDto), usuario);
    }

    @GetMapping(path = "/lista")
    public Page<CertificadoDto> lista(@RequestHeader(name="Authorization") String token,
                                             String usuarioCriador,
                                             Long numeroPagina,
                                             Long tamanhoPagina){

        Usuario usuario = usuarioServico.obtemPorToken(token);

        if(ObjectUtils.isEmpty(usuario)){
            throw new IShareExcessao("Usuário não encontrado", HttpStatus.BAD_REQUEST);
        }

        if(numeroPagina == null || tamanhoPagina == null){
            numeroPagina = 0L;
            tamanhoPagina = 10L;
        }

        Pageable pagina = PageRequest.of(numeroPagina.intValue(), tamanhoPagina.intValue());

        Page<CertificadoDto> page = certificadoMapeador.paraDto(certificadoServico.lista(usuario.ehOngOsc(), usuarioCriador, usuario, pagina));

        return page;
    }


}
