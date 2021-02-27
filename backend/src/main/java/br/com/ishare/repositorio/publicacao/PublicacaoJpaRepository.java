package br.com.ishare.repositorio.publicacao;

import br.com.ishare.entidade.publicacao.Publicacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface PublicacaoJpaRepository extends JpaRepository<Publicacao, UUID>, PublicacaoJpaRepositoryCustom, PagingAndSortingRepository<Publicacao, UUID> {
    Page<Publicacao> findByUsuarioId(UUID id, Pageable pagina);
}
