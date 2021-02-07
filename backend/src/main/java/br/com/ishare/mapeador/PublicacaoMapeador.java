package br.com.ishare.mapeador;

import br.com.ishare.dto.publicacao.PublicacaoDto;
import br.com.ishare.entidade.publicacao.Publicacao;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring",uses =
        {ImagemMapeador.class},
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PublicacaoMapeador {


    PublicacaoDto paraDto(Publicacao obj);

    Publicacao doDto(PublicacaoDto obj);

    List<Publicacao> doDto(List<PublicacaoDto> lista);

    List<PublicacaoDto> paraDto(List<Publicacao> lista);

    default Page<PublicacaoDto> paraDto(Page<Publicacao> page){
        return page.map(this::paraDto);
    }
}
