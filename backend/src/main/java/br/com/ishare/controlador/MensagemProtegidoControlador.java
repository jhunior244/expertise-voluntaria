package br.com.ishare.controlador;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.usuario.MensagemDto;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.mapeador.MensagemMapador;
import br.com.ishare.servico.usuario.IMensagemServico;
import br.com.ishare.servico.usuario.UsuarioServico;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.util.List;
import java.util.UUID;

@RestController
@RequestScope
@RequestMapping("/api/private/mensagem")
public class MensagemProtegidoControlador {

    @Autowired
    private UsuarioServico usuarioServico;

    @Autowired
    private IMensagemServico mensagemServico;

    @Autowired
    private MensagemMapador mensagemMapador;


    @GetMapping(path = "/listaParaChat")
    public Page<MensagemDto> listaParaChat(@RequestHeader(name="Authorization") String token,
                                           String idConversa,
                                           Long numeroPagina,
                                           Long tamanhoPagina){

        Usuario usuario = usuarioServico.obtemPorToken(token);

        if(ObjectUtils.isEmpty(usuario)){
            throw new IShareExcessao("Usuário não encontrado", HttpStatus.BAD_REQUEST);
        }

        if (!StringUtils.hasLength(idConversa)){
            throw new IShareExcessao("Conversa não encontrada", HttpStatus.BAD_REQUEST);
        }

        if(numeroPagina == null || tamanhoPagina == null){
            numeroPagina = 0L;
            tamanhoPagina = 100L;
        }

        Pageable pagina = PageRequest.of(numeroPagina.intValue(), tamanhoPagina.intValue());

        return mensagemMapador.paraDto(mensagemServico.lista(UUID.fromString(idConversa), pagina));
    }

    @GetMapping(path = "/atualizaMensagem")
    public List<MensagemDto> atualizaMensagem(@RequestHeader(name="Authorization") String token,
                                              String idConversa,
                                              String idMensagem){

        Usuario usuario = usuarioServico.obtemPorToken(token);

        if(ObjectUtils.isEmpty(usuario)){
            throw new IShareExcessao("Usuário não encontrado", HttpStatus.BAD_REQUEST);
        }

        if (!StringUtils.hasLength(idConversa)){
            throw new IShareExcessao("Ocorreu um erro ao atualizar o chat. Por favor, recarregue a página.", HttpStatus.BAD_REQUEST);
        }

        UUID idUltimaMensagem = StringUtils.hasLength(idMensagem) ? UUID.fromString(idMensagem) : null;

        return mensagemMapador.paraDto(mensagemServico.atualizaMensagem(UUID.fromString(idConversa), idUltimaMensagem));
    }

    @PostMapping(path = "/enviaMensagem")
    public MensagemDto cria(@RequestHeader(name="Authorization") String token, @RequestBody MensagemDto mensagem) throws JsonProcessingException {

        Usuario usuario = usuarioServico.obtemPorToken(token);
        if(ObjectUtils.isEmpty(usuario)){
            throw new IShareExcessao("Usuário não encontrado", HttpStatus.BAD_REQUEST);
        }

        return  mensagemMapador.paraDto(mensagemServico.enviaMensagem(mensagemMapador.doDto(mensagem), usuario));
    }
}
