package br.com.ishare.repositorio;

import br.com.ishare.entidade.usuario.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface EnderecoJpaRepository  extends JpaRepository<Endereco, UUID>, CidadeJpaRepositoryCustom, PagingAndSortingRepository<Endereco, UUID> {
}
