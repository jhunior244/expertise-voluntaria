package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface MensagemJpaRepository extends JpaRepository<Mensagem, UUID>, MensagemJpaRepositoryCustom, PagingAndSortingRepository<Mensagem, UUID> {
}
