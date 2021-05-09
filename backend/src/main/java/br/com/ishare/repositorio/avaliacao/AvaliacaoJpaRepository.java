package br.com.ishare.repositorio.avaliacao;

import br.com.ishare.entidade.usuario.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface AvaliacaoJpaRepository extends JpaRepository<Avaliacao, UUID>, AvaliacaoJpaRepositoryCustom, PagingAndSortingRepository<Avaliacao, UUID> {
}
