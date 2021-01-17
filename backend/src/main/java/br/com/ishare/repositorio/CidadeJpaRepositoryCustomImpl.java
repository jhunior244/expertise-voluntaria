package br.com.ishare.repositorio;

import br.com.ishare.entidade.usuario.Cidade;
import br.com.ishare.entidade.usuario.QCidade;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

public class CidadeJpaRepositoryCustomImpl implements CidadeJpaRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Override
    public Cidade obtem(String nome, String uf){
        QCidade cidade = QCidade.cidade;

        JPQLQuery<Cidade> query = jpaQueryFactory.selectFrom(cidade);

        BooleanExpression predicado = cidade.id.isNotNull();

        if(!StringUtils.hasLength(nome) || !StringUtils.hasLength(uf)){
            return null;
        }
        predicado = predicado.and(cidade.nome.eq(nome));

        predicado = predicado.and(cidade.estado.uf.eq(uf));

        query.where(predicado);

        return query.fetchFirst();
    }
}
