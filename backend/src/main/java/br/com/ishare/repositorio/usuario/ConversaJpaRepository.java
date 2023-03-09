package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.Conversa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface ConversaJpaRepository extends JpaRepository<Conversa, UUID>, ConversaJpaRepositoryCustom, PagingAndSortingRepository<Conversa, UUID> {
    Conversa findByUsuarioUmIdAndUsuarioDoisId(UUID idUsuarioUm, UUID idUsuarioDois);
}
