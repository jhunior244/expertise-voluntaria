package br.com.ishare.repositorio;

import br.com.ishare.entidade.usuario.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TipoUsuarioJpaRepository extends JpaRepository<TipoUsuario, Long> {
    List<TipoUsuario> findAll();
}
