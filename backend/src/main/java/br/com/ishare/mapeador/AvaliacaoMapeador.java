package br.com.ishare.mapeador;

import br.com.ishare.dto.avaliacao.AvaliacaoDto;
import br.com.ishare.entidade.usuario.Avaliacao;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", uses = {UsuarioMapeador.class},
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AvaliacaoMapeador {

    Avaliacao doDto(AvaliacaoDto avaliacaoDto);

    AvaliacaoDto paraDto(Avaliacao avaliacao);
}
