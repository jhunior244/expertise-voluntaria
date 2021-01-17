package br.com.ishare.repositorio;

import br.com.ishare.entidade.usuario.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface CidadeJpaRepository extends JpaRepository<Cidade, Long>, CidadeJpaRepositoryCustom, PagingAndSortingRepository<Cidade, Long> {
    Cidade findByNome(String nome);
}
