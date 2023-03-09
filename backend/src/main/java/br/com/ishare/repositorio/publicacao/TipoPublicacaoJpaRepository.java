package br.com.ishare.repositorio.publicacao;

import br.com.ishare.entidade.publicacao.TipoPublicacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TipoPublicacaoJpaRepository extends JpaRepository<TipoPublicacao, Long> {
    List<TipoPublicacao> findAll();
}
