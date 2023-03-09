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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
    public CertificadoDto cria(@RequestHeader(name="Authorization") String token, @RequestBody CertificadoDto certificadoDto) throws IOException, OfficeException, IShareExcessao {

        Usuario usuario = usuarioServico.obtemPorToken(token);
        if(ObjectUtils.isEmpty(usuario)){
            throw new IShareExcessao("Usuário não encontrado", HttpStatus.BAD_REQUEST);
        }

        return certificadoMapeador.paraDto(certificadoServico.cria(certificadoMapeador.doDto(certificadoDto), usuario));
    }

    @GetMapping(path = "/lista")
    public Page<CertificadoDto> lista(@RequestHeader(name="Authorization") String token,
                                      String[] listaIdAreaAtuacao,
                                      Long[] listaIdTipoUsuario,
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

        List<UUID> lista = new ArrayList<>();
        if(!ObjectUtils.isEmpty(listaIdAreaAtuacao)){
            lista = Arrays.stream(listaIdAreaAtuacao).map(UUID::fromString).collect(Collectors.toList());
        }

        Pageable pagina = PageRequest.of(numeroPagina.intValue(), tamanhoPagina.intValue());

        Page<CertificadoDto> page = certificadoMapeador.paraDto(certificadoServico.lista(usuario.ehOngOsc(), lista, listaIdTipoUsuario, usuario, pagina));

        return page;
    }


}
