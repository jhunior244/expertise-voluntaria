package br.com.ishare.mapeador;

import br.com.ishare.dto.usuario.EstadoDto;
import br.com.ishare.entidade.usuario.Estado;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EstadoMapeador {
    EstadoDto paraDto(Estado obj);

    Estado doDto(EstadoDto obj);

    List<Estado> doDto(List<EstadoDto> lista);

    List<EstadoDto> paraDto(List<Estado> lista);

    default Page<EstadoDto> paraDto(Page<Estado> page){
        return page.map(this::paraDto);
    }
}
