package br.com.ishare.mapeador;

import br.com.ishare.dto.usuario.AreaAtuacaoDto;
import br.com.ishare.entidade.usuario.AreaAtuacao;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AreaAtuacaoMapeador {
    AreaAtuacaoDto paraDto(AreaAtuacao obj);

    AreaAtuacao doDto(AreaAtuacaoDto obj);

    List<AreaAtuacao> doDto(List<AreaAtuacaoDto> lista);

    List<AreaAtuacaoDto> paraDto(List<AreaAtuacao> lista);

    default Page<AreaAtuacaoDto> paraDto(Page<AreaAtuacao> page){
        return page.map(this::paraDto);
    }
}
