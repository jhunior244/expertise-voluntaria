package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.Estado;
import br.com.ishare.entidade.usuario.QEstado;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import java.util.List;

public class EstadoJpaRepositoryCustomImpl implements EstadoJpaRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Estado> lista(String uf){

        QEstado estado = QEstado.estado;

        JPQLQuery<Estado> query = jpaQueryFactory.selectFrom(estado);

        BooleanExpression predicado = estado.id.isNotNull();

        if(StringUtils.hasLength(uf)){
            predicado = predicado.and(estado.uf.eq(uf));
        }

        query.where(predicado);

        return query.fetch();
    }

}
