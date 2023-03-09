package br.com.ishare.repositorio.publicacao;

import br.com.ishare.entidade.publicacao.Imagem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ImagemJpaRepository extends JpaRepository<Imagem, UUID> {
    Imagem findByNome(String name);
}
