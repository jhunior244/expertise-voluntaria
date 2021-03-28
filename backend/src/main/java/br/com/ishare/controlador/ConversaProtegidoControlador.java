package br.com.ishare.controlador;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.publicacao.PublicacaoDto;
import br.com.ishare.dto.usuario.ConversaDto;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.entidade.usuario.UsuarioTelaContatoDto;
import br.com.ishare.mapeador.ConversaMapeador;
import br.com.ishare.servico.usuario.ConversaServico;
import br.com.ishare.servico.usuario.UsuarioServico;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/private/conversa")
public class ConversaProtegidoControlador {


    @Autowired
    private UsuarioServico usuarioServico;

    @Autowired
    private ConversaServico conversaServico;

    @Autowired
    private ConversaMapeador conversaMapeador;

    @GetMapping(path = "/listaParaChat")
    public Page<ConversaDto> listaParaChat(@RequestHeader(name="Authorization") String token,
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

        return conversaServico.listaParaChat(usuario.getId(), pagina);
    }

    @PostMapping(path = "/cria")
    public ConversaDto cria(@RequestHeader(name="Authorization") String token, @RequestBody ConversaDto conversa) throws JsonProcessingException {

        Usuario usuario = usuarioServico.obtemPorToken(token);
        if(ObjectUtils.isEmpty(usuario)){
            throw new IShareExcessao("Usuário não encontrado", HttpStatus.BAD_REQUEST);
        }

        return conversaMapeador.paraDto(conversaServico.cria(conversa, usuario), usuario.getId());
    }
}
