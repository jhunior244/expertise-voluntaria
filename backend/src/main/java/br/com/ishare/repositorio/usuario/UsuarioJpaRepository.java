package br.com.ishare.repositorio.usuario;


import br.com.ishare.entidade.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UsuarioJpaRepository extends JpaRepository<Usuario, UUID> {
    Usuario findByEmail(String email);
    Usuario findByToken(String token);
}
