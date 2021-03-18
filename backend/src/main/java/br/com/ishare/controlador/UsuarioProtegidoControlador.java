package br.com.ishare.controlador;

import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.entidade.usuario.UsuarioTelaContatoDto;
import br.com.ishare.mapeador.UsuarioMapeador;
import br.com.ishare.servico.usuario.UsuarioServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

import java.util.UUID;

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
}
