package br.com.ishare.controlador;

import br.com.ishare.dto.usuario.UsuarioDto;
import br.com.ishare.mapeador.UsuarioMapeador;
import br.com.ishare.servico.UsuarioServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

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
        usuarioServico.cria(usuarioMapeador.doDto(usuarioDto));
    }
}
