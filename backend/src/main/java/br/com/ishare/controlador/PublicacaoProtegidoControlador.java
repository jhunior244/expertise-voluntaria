package br.com.ishare.controlador;

import br.com.ishare.dto.publicacao.PublicacaoDto;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.mapeador.PublicacaoMapeador;
import br.com.ishare.servico.publicacao.IPublicacaoServico;
import br.com.ishare.servico.usuario.IUsuarioServico;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/private/publicacao")
public class PublicacaoProtegidoControlador {

    @Autowired
    private IPublicacaoServico publicacaoServico;

    @Autowired
    private PublicacaoMapeador publicacaoMapeador;

    @Autowired
    private IUsuarioServico usuarioServico;

    @PostMapping(path = "/cria")
    public void cria(@RequestHeader(name="Authorization") String token, @RequestBody PublicacaoDto publicacao) throws JsonProcessingException {

        Usuario usuario = usuarioServico.obtemPorToken(token);
        publicacaoServico.cria(publicacaoMapeador.doDto(publicacao), usuario);
    }

    @GetMapping(path = "/obtem")
    public PublicacaoDto obtem(UUID id){
        return publicacaoMapeador.paraDto(publicacaoServico.obtem(id));
    }

    @GetMapping(path = "/lista")
    public Page<PublicacaoDto> lista(@RequestHeader(name="Authorization") String token, Long numeroPagina, Long tamanhoPagina){

        Usuario usuario = usuarioServico.obtemPorToken(token);

        if(numeroPagina == null || tamanhoPagina == null){
            numeroPagina = 0L;
            tamanhoPagina = 10L;
        }

        Pageable pagina = PageRequest.of(numeroPagina.intValue(), tamanhoPagina.intValue());

        Page<PublicacaoDto> page = publicacaoMapeador.paraDto(publicacaoServico.lista(usuario, pagina));

        return page;
    }
}
