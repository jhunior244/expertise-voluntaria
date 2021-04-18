package br.com.ishare.repositorio.usuario;

import br.com.ishare.entidade.usuario.QUsuario;
import br.com.ishare.entidade.usuario.Usuario;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

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

    @Override
    public Page<Usuario> lista(Boolean somenteMeusContatos, boolean ignoraUsuarioLogado, String emailUsuarioLogado, Long[] listaIdEstado, Long[] listaIdCidade, List<UUID> listaIdAreaAtuacao, String nome, Pageable pagina){

        QUsuario usuario = QUsuario.usuario;

        QUsuario qUsuario = new QUsuario("qUsuario");

        JPQLQuery<Usuario> query = jpaQueryFactory.selectFrom(usuario);

        BooleanExpression predicado = usuario.id.isNotNull();

        if(ignoraUsuarioLogado && StringUtils.hasLength(emailUsuarioLogado)){
            predicado = predicado.and(usuario.email.ne(emailUsuarioLogado));
        }

        if(!ObjectUtils.isEmpty(listaIdEstado)){
            predicado = predicado.and(usuario.endereco.cidade.estado.id.in(listaIdEstado));
        }

        if(!ObjectUtils.isEmpty(listaIdCidade)){
            predicado = predicado.and(usuario.endereco.cidade.id.in(listaIdCidade));
        }

        if(!ObjectUtils.isEmpty(listaIdAreaAtuacao)){
            predicado = predicado.and(usuario.listaAreaAtuacao.any().id.in(listaIdAreaAtuacao));
        }

        if(StringUtils.hasLength(nome)){
            predicado = predicado.and(usuario.nome.containsIgnoreCase(nome));
        }

        if (!ObjectUtils.isEmpty(somenteMeusContatos)){
            if(somenteMeusContatos){
                BooleanExpression ehContato = JPAExpressions.selectOne().from(qUsuario).where(qUsuario.listaContato.any().id.eq(usuario.id).and(qUsuario.email.eq(emailUsuarioLogado))).exists();
                predicado = predicado.and(ehContato);
            } else {
                BooleanExpression naoEhContato = JPAExpressions.selectOne().from(qUsuario).where(qUsuario.listaContato.any().id.eq(usuario.id).and(qUsuario.email.eq(emailUsuarioLogado))).notExists();
                predicado = predicado.and(naoEhContato);
            }
        }

        query.where(predicado);

        query.limit(pagina.getPageSize());

        query.offset(pagina.getOffset());

        return new PageImpl<>(query.fetch(), pagina, query.fetchCount());
    }

    @Override
    public Boolean usuarioEhContato(UUID usuario, UUID possivelContato){

        if(usuario == null || possivelContato == null){
            return false;
        }

        QUsuario qUsuario = QUsuario.usuario;

        JPQLQuery<Usuario> query = jpaQueryFactory.selectFrom(qUsuario);

        BooleanExpression predicado = qUsuario.id.isNotNull();

        predicado = predicado.and(qUsuario.id.eq(usuario).and(qUsuario.listaContato.any().id.eq(possivelContato)));

        query.where(predicado);

        Usuario usuario1 = query.fetchFirst();

        return usuario1 != null;
    }
}
