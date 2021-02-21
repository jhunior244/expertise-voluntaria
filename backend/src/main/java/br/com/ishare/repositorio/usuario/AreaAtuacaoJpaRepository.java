package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.AreaAtuacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface AreaAtuacaoJpaRepository extends JpaRepository<AreaAtuacao, UUID>, PagingAndSortingRepository<AreaAtuacao, UUID> {
    Page<AreaAtuacao> findAll(Pageable pageable);
}
