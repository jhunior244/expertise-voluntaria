package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TipoUsuarioJpaRepository extends JpaRepository<TipoUsuario, Long> {
    List<TipoUsuario> findAll();
    Optional<TipoUsuario> findById(Long id);
}
