package br.com.ishare.controlador;

import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.publicacao.PublicacaoDto;
import br.com.ishare.dto.usuario.UsuarioDto;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequestScope
@RestController
@RequestMapping("/api/public/usuario")
public class UsuarioPublicoControlador {

    @Autowired
    private UsuarioServico usuarioServico;

    @Autowired
    private UsuarioMapeador usuarioMapeador;

    @GetMapping(path = "existeUsuarioCadastradoComEmail")
    public boolean existeUsuarioCadastradoComEmail(String email){
        return usuarioServico.existeUsuarioCadastradoComEmail(email);
    }

    @PostMapping(path = "/cria")
    public void cria(@RequestBody UsuarioDto usuarioDto) throws Exception {
        usuarioServico.cria(usuarioDto);
    }

    @PatchMapping(path = "/adicionaContato")
    public UsuarioTelaContatoDto adicionaContato(@RequestHeader(name="Authorization") String token, @RequestBody UsuarioTelaContatoDto usuarioTelaContatoDto) throws Exception {
        Usuario usuario = usuarioServico.obtemPorToken(token);

        if(ObjectUtils.isEmpty(usuario)){
            throw new IShareExcessao("Usuário não encontrado", HttpStatus.BAD_REQUEST);
        }

        return usuarioServico.adicionaContato(usuarioTelaContatoDto, usuario);
    }
}
