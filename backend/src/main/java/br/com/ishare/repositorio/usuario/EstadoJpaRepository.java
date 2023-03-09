package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EstadoJpaRepository extends JpaRepository<Estado, Long>, EstadoJpaRepositoryCustom {
    List<Estado> findAll();

    Estado findByNome(String nome);

    Estado findByUf(String uf);
}
