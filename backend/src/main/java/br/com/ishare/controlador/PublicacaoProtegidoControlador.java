package br.com.ishare.controlador;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.publicacao.PublicacaoDto;
import br.com.ishare.entidade.publicacao.Publicacao;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.mapeador.PublicacaoMapeador;
import br.com.ishare.servico.publicacao.IPublicacaoServico;
import br.com.ishare.servico.usuario.IUsuarioServico;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
        if(ObjectUtils.isEmpty(usuario)){
            throw new IShareExcessao("Usuário não encontrado", HttpStatus.BAD_REQUEST);
        }

        publicacaoServico.cria(publicacaoMapeador.doDto(publicacao), usuario);
    }

    @GetMapping(path = "/obtem")
    public PublicacaoDto obtem(String id){
        if (!StringUtils.hasLength(id)){
            return new PublicacaoDto();
        }

        return publicacaoMapeador.paraDto(publicacaoServico.obtem(UUID.fromString(id)));
    }

    @GetMapping(path = "/lista")
    public Page<PublicacaoDto> lista(@RequestHeader(name="Authorization") String token,
                                     Long[] listaIdEstado,
                                     Long[] listaIdCidade,
                                     String[] listaIdAreaAtuacao,
                                     Long[] listaIdTipoUsuario,
                                     Long mostrarApenasMinhasPublicacoes,
                                     Long numeroPagina,
                                     Long tamanhoPagina){

        Usuario usuario = usuarioServico.obtemPorToken(token);

        if(ObjectUtils.isEmpty(usuario)){
            return null;
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

        Page<PublicacaoDto> page = publicacaoMapeador.paraDto(publicacaoServico.lista(listaIdEstado, listaIdCidade, lista, listaIdTipoUsuario, mostrarApenasMinhasPublicacoes, usuario.getId(), pagina));

        return page;
    }

    @GetMapping(path = "/listaParaSelect")
    public Page<PublicacaoDto> listaParaSelect(@RequestHeader(name="Authorization") String token,
                                     String idContato,
                                     Long numeroPagina,
                                     Long tamanhoPagina){

        Usuario usuarioLogado = usuarioServico.obtemPorToken(token);

        if(ObjectUtils.isEmpty(usuarioLogado)){
            return null;
        }

        if(numeroPagina == null || tamanhoPagina == null){
            numeroPagina = 0L;
            tamanhoPagina = 10L;
        }

        UUID idContatoConvertida = null;
        if(StringUtils.hasLength(idContato)){
            idContatoConvertida = UUID.fromString(idContato);
        }

        Pageable pagina = PageRequest.of(numeroPagina.intValue(), tamanhoPagina.intValue());

        Page<PublicacaoDto> page = publicacaoMapeador.paraDto(publicacaoServico.listaParaSelect(usuarioLogado.getId(), idContatoConvertida, pagina));

        return page;
    }
}
