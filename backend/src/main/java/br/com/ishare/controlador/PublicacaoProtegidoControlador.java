package br.com.ishare.controlador;

import br.com.ishare.dto.publicacao.PublicacaoDto;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.mapeador.PublicacaoMapeador;
import br.com.ishare.servico.publicacao.IPublicacaoServico;
import br.com.ishare.servico.usuario.IUsuarioServico;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
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
}
