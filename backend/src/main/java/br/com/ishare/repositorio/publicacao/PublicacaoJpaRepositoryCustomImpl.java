package br.com.ishare.repositorio.publicacao;

import br.com.ishare.entidade.publicacao.Publicacao;
import br.com.ishare.entidade.publicacao.QPublicacao;
import br.com.ishare.entidade.usuario.QCertificado;
import br.com.ishare.entidade.usuario.QUsuario;
import br.com.ishare.entidade.usuario.Usuario;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
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
    public Page<Publicacao> lista(Long[] listaIdEstado, Long[] listaIdCidade, List<UUID> listaIdAreaAtuacao, Long[] listaIdTipoUsuario, Long mostrarApenasMinhasPublicacoes, UUID idUsuarioLogado, Pageable pagina){

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

        if(!ObjectUtils.isEmpty(listaIdTipoUsuario)){
            predicado = predicado.and(publicacao.usuario.tipoUsuario.id.in(listaIdTipoUsuario));
        }

        if(!ObjectUtils.isEmpty(mostrarApenasMinhasPublicacoes)){
            if(mostrarApenasMinhasPublicacoes == 1L){
                predicado = predicado.and(publicacao.usuario.id.eq(idUsuarioLogado));
            } else if(mostrarApenasMinhasPublicacoes == 0L) {
                predicado = predicado.and(publicacao.usuario.id.ne(idUsuarioLogado));
            }
        }

        query.where(predicado).orderBy(publicacao.data.desc());

        query.limit(pagina.getPageSize());

        query.offset(pagina.getOffset());

        return new PageImpl<>(query.fetch(), pagina, query.fetchCount());
    }

    @Override
    public Page<Publicacao> listaParaSelect(UUID idUsuarioLogado, UUID idContato, Pageable pagina){

        QPublicacao publicacao = QPublicacao.publicacao;

//        QCertificado certificado = QCertificado.certificado;

        JPAQuery<Publicacao> query = jpaQueryFactory.selectFrom(publicacao);

        BooleanExpression predicado = publicacao.id.isNotNull();

        if(idContato != null){
            predicado = predicado.and(publicacao.usuario.id.eq(idContato));
        }

        predicado = predicado.or(publicacao.usuario.id.eq(idUsuarioLogado));

//        predicado = predicado.and(JPAExpressions.selectOne().from(certificado).where(certificado.publicacao.id.eq(publicacao.id)).notExists());

        query.where(predicado);

        query.limit(pagina.getPageSize());

        List<Publicacao> lista =  query.fetch();

        return new PageImpl<>(lista, pagina, query.fetchCount());
    }
}
