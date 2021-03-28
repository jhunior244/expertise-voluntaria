package br.com.ishare.mapeador;

import br.com.ishare.dto.usuario.MensagemDto;
import br.com.ishare.entidade.usuario.Mensagem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring",uses =
        {UsuarioMapeador.class,
        ConversaMapeador.class},
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MensagemMapador {

    @Mapping(target = "usuario.listaContato", ignore = true)
    MensagemDto paraDto(Mensagem obj);

    Mensagem doDto(MensagemDto obj);

    List<Mensagem> doDto(List<MensagemDto> lista);

    List<MensagemDto> paraDto(List<Mensagem> lista);

    default Page<MensagemDto> paraDto(Page<Mensagem> page){
        return page.map(this::paraDto);
    }
}
