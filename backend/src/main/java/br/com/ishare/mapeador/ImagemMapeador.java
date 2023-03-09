package br.com.ishare.mapeador;

import br.com.ishare.dto.publicacao.ImagemDto;
import br.com.ishare.dto.publicacao.PublicacaoDto;
import br.com.ishare.entidade.publicacao.Imagem;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImagemMapeador {

    @Mapping(target = "conteudoBase64", expression = "java(obj.arrayByteToBase64())")
    ImagemDto paraDto(Imagem obj) throws JsonProcessingException;

    @Mapping(target = "conteudo", expression = "java(obj.base64toArrayByte())")
    Imagem doDto(ImagemDto obj) throws JsonProcessingException;

    List<Imagem> doDto(List<PublicacaoDto> lista);

    List<ImagemDto> paraDto(List<Imagem> lista);
}
