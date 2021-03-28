package br.com.ishare.controlador;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.entidade.usuario.UsuarioTelaContatoDto;
import br.com.ishare.mapeador.UsuarioMapeador;
import br.com.ishare.servico.usuario.UsuarioServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequestScope
@RestController
@RequestMapping("/api/private/usuario")
public class UsuarioProtegidoControlador {


    @Autowired
    private UsuarioServico usuarioServico;

    @Autowired
    private UsuarioMapeador usuarioMapeador;

    @GetMapping(path = "obtem")
    public UsuarioTelaContatoDto obtem(@RequestHeader(name="Authorization") String token, String id){
        if(!StringUtils.hasLength(token) || !StringUtils.hasLength(id)){
            return null;
        }
        Usuario usuarioLogado = usuarioServico.obtemPorToken(token);
        Usuario usuario = usuarioServico.obtem(UUID.fromString(id));
        return usuarioServico.paraUsuarioTelaConsultaDto(usuario, usuarioLogado);
    }

    @GetMapping(path = "/lista")
    public Page<UsuarioTelaContatoDto> lista(@RequestHeader(name="Authorization") String token,
                                             Long[] listaIdEstado,
                                             Long[] listaIdCidade,
                                             String[] listaIdAreaAtuacao,
                                             String nome,
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
            lista = Arrays.stream(listaIdAreaAtuacao).map(id -> UUID.fromString(id)).collect(Collectors.toList());
        }

        Pageable pagina = PageRequest.of(numeroPagina.intValue(), tamanhoPagina.intValue());

        Page<UsuarioTelaContatoDto> page = usuarioServico.paraUsuarioTelaConsultaDto(usuarioServico.lista(true, usuario.getEmail(), listaIdEstado, listaIdCidade, lista, nome, pagina), usuario);

        return page;
    }
}
