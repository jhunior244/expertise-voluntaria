package br.com.ishare.mapeador;

import br.com.ishare.dto.usuario.CidadeDto;
import br.com.ishare.entidade.usuario.Cidade;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring",uses =
        {EstadoMapeador.class},
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CidadeMapeador {
    CidadeDto paraDto(Cidade obj);

    Cidade doDto(CidadeDto obj);

    List<Cidade> doDto(List<CidadeDto> lista);

    List<CidadeDto> paraDto(List<Cidade> lista);

    default Page<CidadeDto> paraDto(Page<Cidade> page){
        return page.map(this::paraDto);
    }
}
