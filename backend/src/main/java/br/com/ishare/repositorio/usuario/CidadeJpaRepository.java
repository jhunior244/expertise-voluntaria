package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CidadeJpaRepository extends JpaRepository<Cidade, Long>, CidadeJpaRepositoryCustom, PagingAndSortingRepository<Cidade, Long> {
    Cidade findByNome(String nome);
}
