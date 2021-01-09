package br.com.ishare.mapeador;

import br.com.ishare.dto.usuario.EnderecoDto;
import br.com.ishare.entidade.usuario.Endereco;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring",uses =
        {CidadeMapeador.class},
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EnderecoMapeador {
    EnderecoDto paraDto(Endereco obj);

    Endereco doDto(EnderecoDto obj);

    List<Endereco> doDto(List<EnderecoDto> lista);

    List<EnderecoDto> paraDto(List<Endereco> lista);

    default Page<EnderecoDto> paraDto(Page<Endereco> page){
        return page.map(this::paraDto);
    }
}
