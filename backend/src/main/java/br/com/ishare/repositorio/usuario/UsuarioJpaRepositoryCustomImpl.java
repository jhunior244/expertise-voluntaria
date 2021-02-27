package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.publicacao.Publicacao;
import br.com.ishare.entidade.usuario.QUsuario;
import br.com.ishare.entidade.usuario.Usuario;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class UsuarioJpaRepositoryCustomImpl implements UsuarioJpaRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Usuario> listaPorExpertisesPublicacao(List<UUID> listaIdAreaAtuacao){

        QUsuario usuario = QUsuario.usuario;

        JPQLQuery<Usuario> query = jpaQueryFactory.selectFrom(usuario);

        BooleanExpression predicado = usuario.id.isNotNull();

        if(CollectionUtils.isEmpty(listaIdAreaAtuacao)){
            return new ArrayList<>();
        }

        predicado = predicado.and(usuario.listaAreaAtuacao.any().id.in(listaIdAreaAtuacao));

        query.where(predicado);
        return query.fetch();
    }
}
