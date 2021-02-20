package br.com.ishare.repositorio.publicacao;

import br.com.ishare.entidade.publicacao.Publicacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PublicacaoJpaRepository extends JpaRepository<Publicacao, UUID> {
    Page<Publicacao> findByUsuarioId(UUID id, Pageable pagina);
}
