package br.com.ishare.mapeador;

import br.com.ishare.dto.publicacao.TipoPublicacaoDto;
import br.com.ishare.entidade.publicacao.TipoPublicacao;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TipoPublicacaoMapeador {

    TipoPublicacaoDto paraDto(TipoPublicacao obj);

    TipoPublicacao doDto(TipoPublicacaoDto obj);

    List<TipoPublicacaoDto> paraDto(List<TipoPublicacao> lista);
}
