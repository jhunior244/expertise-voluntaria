package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.Mensagem;
import br.com.ishare.entidade.usuario.QMensagem;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class MensagemJpaRepositoryCustomImpl implements MensagemJpaRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Mensagem> lista(UUID idConversa, Pageable pageable){
        if(idConversa == null){
            return new PageImpl<>(new ArrayList<>(), pageable, 0);
        }

        QMensagem mensagem = QMensagem.mensagem;

        JPQLQuery<Mensagem> query = jpaQueryFactory.selectFrom(mensagem);

        BooleanExpression predicado = mensagem.id.isNotNull();

        predicado = predicado.and(mensagem.conversa.id.eq(idConversa));

        query.where(predicado).orderBy(mensagem.data.asc());

        query.limit(pageable.getPageSize());

        query.offset(pageable.getOffset());

        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }

    @Override
    public List<Mensagem> atualizaMensagem(UUID idConversa, Mensagem ultimaMensagem){
        if(idConversa == null){
            return new ArrayList<>();
        }

        QMensagem mensagem = QMensagem.mensagem;

        JPQLQuery<Mensagem> query = jpaQueryFactory.selectFrom(mensagem);

        BooleanExpression predicado = mensagem.id.isNotNull();

        predicado = predicado.and(mensagem.conversa.id.eq(idConversa));

        if(ultimaMensagem != null){
            predicado = predicado.and(mensagem.data.gt(ultimaMensagem.getData()));
        }

        query.where(predicado).orderBy(mensagem.data.asc());

        return query.fetch();
    }
}
