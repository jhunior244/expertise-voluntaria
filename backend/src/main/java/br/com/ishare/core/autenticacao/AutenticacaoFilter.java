package br.com.ishare.core.autenticacao;

import br.com.ishare.entidade.usuario.Usuario;
import br.com.ishare.repositorio.UsuarioJpaRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

public class AutenticacaoFilter extends OncePerRequestFilter {

    private TokenService tokenService;
    private UsuarioJpaRepository usuarioJpaRepository;

    public AutenticacaoFilter(TokenService tokenService, UsuarioJpaRepository usuarioJpaRepository){
        this.tokenService = tokenService;
        this.usuarioJpaRepository = usuarioJpaRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        String token = recuperarToken(httpServletRequest);
        boolean valido = tokenService.isTokenValido(token);
        if(valido){
            autenticarCliente(token);
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private void autenticarCliente(String token) {
        UUID idUsuario = tokenService.getIdUsuario(token);
        Usuario usuario = usuarioJpaRepository.findById(idUsuario).get();
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private String recuperarToken(HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if(token == null || token.isEmpty() || !token.startsWith("Bearer ")){
            return null;
        }

        return token.substring(7);
    }
}
