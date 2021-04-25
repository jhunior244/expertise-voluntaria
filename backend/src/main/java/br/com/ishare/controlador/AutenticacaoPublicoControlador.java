package br.com.ishare.controlador;

import br.com.ishare.core.autenticacao.TokenService;
import br.com.ishare.core.validacao.IShareExcessao;
import br.com.ishare.dto.usuario.UsuarioDto;
import br.com.ishare.dto.usuario.UsuarioSaidaDto;
import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.mapeador.TipoUsuarioMapeador;
import br.com.ishare.repositorio.usuario.UsuarioJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

@RequestScope
@RestController
@RequestMapping("/api/public/auth")
public class AutenticacaoPublicoControlador {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private TipoUsuarioMapeador tipoUsuarioMapeador;

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
            usuarioSaidaDto.setUf(usuarioLogado.getUf());
            usuarioSaidaDto.setCidade(usuarioLogado.getCidade());
            usuarioSaidaDto.setEmail(usuarioLogado.getEmail());
            usuarioSaidaDto.setTipoUsuario(tipoUsuarioMapeador.paraDto(usuarioLogado.getTipoUsuario()));
            usuarioJpaRepository.save(usuarioLogado);
            return ResponseEntity.ok(usuarioSaidaDto);
        } catch (AuthenticationException e){
            throw new IShareExcessao("Dados inválidos", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/autenticado")
    public boolean autenticado(@RequestHeader(name="Authorization") String token){
        if(!StringUtils.hasLength(token) || token.length() < 7 || !tokenService.isTokenValido(token.substring(7))){
            return false;
        }

        return true;
    }
}
