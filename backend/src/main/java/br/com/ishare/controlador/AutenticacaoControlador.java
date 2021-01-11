package br.com.ishare.controlador;

import br.com.ishare.core.autenticacao.TokenService;
import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.usuario.UsuarioDto;
import br.com.ishare.dto.usuario.UsuarioSaidaDto;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.repositorio.UsuarioJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/auth")
public class AutenticacaoControlador {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioJpaRepository usuarioJpaRepository;

    @PostMapping(path = "/login")
    public ResponseEntity<UsuarioSaidaDto> logar(@RequestBody UsuarioDto usuario) throws IShareExcessao {
        UsernamePasswordAuthenticationToken dadosLogin = usuario.converter();

        try {
            Authentication authentication = authenticationManager.authenticate(dadosLogin);
            String token = tokenService.gerarToken(authentication);
            Usuario usuarioLogado = usuarioJpaRepository.findByEmail(usuario.getEmail());
            UsuarioSaidaDto usuarioSaidaDto = new UsuarioSaidaDto();
            usuarioSaidaDto.setNome(((Usuario) usuarioLogado).getNome());
            usuario.setEmail(usuarioLogado.getEmail());
            usuarioSaidaDto.setToken("Bearer " + token);
            usuarioLogado.setToken("Bearer " + token);
            usuarioJpaRepository.save(usuarioLogado);
            return ResponseEntity.ok(usuarioSaidaDto);
        } catch (AuthenticationException e){
            throw new IShareExcessao("Dados inválidos", HttpStatus.BAD_REQUEST);
        }
    }
}
