package br.com.ishare.core.autenticacao;

import br.com.ishare.entidade.usuario.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class TokenService {

    @Value("${ishare.jwt.expiration}")
    private String expiration;

    @Value("${ishare.jwt.secret}")
    private String secret;

    public String gerarToken(Authentication authentication){
        Usuario usuarioLogado = (Usuario) authentication.getPrincipal();
        Date now = new Date();
        Date dataExpiracao = new Date(now.getTime() + Long.parseLong(expiration));
        return Jwts.builder()
                .setIssuer("StudyManager")
                .setSubject(usuarioLogado.getId().toString())
                .setIssuedAt(now)
                .setExpiration(dataExpiracao)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public boolean isTokenValido(String token) {
        try{
            Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    public UUID getIdUsuario(String token) {
        Claims claims = Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token).getBody();
        return UUID.fromString(claims.getSubject());
    }
}
