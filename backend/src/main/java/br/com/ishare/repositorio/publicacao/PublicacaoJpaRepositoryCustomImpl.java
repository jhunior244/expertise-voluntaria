package br.com.ishare.repositorio.publicacao;

import br.com.ishare.entidade.publicacao.Publicacao;
import br.com.ishare.entidade.publicacao.QPublicacao;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.ObjectUtils;

import java.util.List;
import java.util.UUID;

public class PublicacaoJpaRepositoryCustomImpl implements PublicacaoJpaRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Publicacao> lista(Long[] listaIdEstado, Long[] listaIdCidade, List<UUID> listaIdAreaAtuacao, Pageable pagina){

        QPublicacao publicacao = QPublicacao.publicacao;

        JPAQuery<Publicacao> query = jpaQueryFactory.selectFrom(publicacao);

        BooleanExpression predicado = publicacao.id.isNotNull();

        if(!ObjectUtils.isEmpty(listaIdEstado)){
            predicado = predicado.and(publicacao.usuario.endereco.cidade.estado.id.in(listaIdEstado));
        }

        if(!ObjectUtils.isEmpty(listaIdCidade)){
            predicado = predicado.and(publicacao.usuario.endereco.cidade.id.in(listaIdCidade));
        }

        if(!ObjectUtils.isEmpty(listaIdAreaAtuacao)){
            predicado = predicado.and(publicacao.listaAreaAtuacao.any().id.in(listaIdAreaAtuacao));
        }

        query.where(predicado);

        query.limit(pagina.getPageSize());

        query.offset(pagina.getOffset());

        return new PageImpl<>(query.fetch(), pagina, query.fetchCount());
    }
}
