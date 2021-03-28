package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.*;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.UUID;

public class ConversaJpaRepositoryCustomImpl implements ConversaJpaRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Conversa> listaParaChat(UUID usuarioLogado, Pageable pagina){
        if(usuarioLogado == null){
            return new PageImpl<>(new ArrayList<>(), pagina, 0);
        }

        QConversa conversa = QConversa.conversa;

        QUsuario usuario = QUsuario.usuario;

        JPQLQuery<Conversa> query = jpaQueryFactory.selectFrom(conversa);

        BooleanExpression predicado = conversa.id.isNotNull();

        query.leftJoin(conversa.usuarioUm, usuario);

        query.leftJoin(conversa.usuarioDois, usuario);

        predicado = predicado.and(conversa.usuarioUm.id.eq(usuarioLogado).or(conversa.usuarioDois.id.eq(usuarioLogado)));

        query.where(predicado);

        query.limit(pagina.getPageSize());

        query.offset(pagina.getOffset());

        return new PageImpl<>(query.fetch(), pagina, query.fetchCount());
    }
}
