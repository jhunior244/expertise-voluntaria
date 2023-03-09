package br.com.ishare.repositorio.certificado;

import br.com.ishare.entidade.usuario.Certificado;
import br.com.ishare.entidade.usuario.QCertificado;
import br.com.ishare.entidade.usuario.Usuario;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class CertificadoJpaRepositoryCustomImpl implements CertificadoJpaRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Certificado> lista(Boolean ehOngOsc, List<UUID> listaAreaAtuacao, Long[] listaIdTipoUsuario, Usuario usuarioLogado, Pageable pagina){

        QCertificado certificado = QCertificado.certificado;

        JPAQuery<Certificado> query = jpaQueryFactory.selectFrom(certificado);

        BooleanExpression predicado = certificado.id.isNotNull();

        if (!CollectionUtils.isEmpty(listaAreaAtuacao)){
            predicado = predicado.and(certificado.areaAtuacao.id.in(listaAreaAtuacao));
        }

        if (!ObjectUtils.isEmpty(listaIdTipoUsuario)){
            predicado = predicado.and(certificado.usuario.tipoUsuario.id.in(listaIdTipoUsuario));
        }

        if(!ObjectUtils.isEmpty(ehOngOsc)){
            if (ehOngOsc){
                predicado = predicado.and(certificado.usuarioResponsavelCriacao.id.eq(usuarioLogado.getId()));
            } else {
                predicado = predicado.and(certificado.usuario.id.eq(usuarioLogado.getId()));
            }

            query.where(predicado).orderBy(certificado.dataCriacao.desc());

            query.limit(pagina.getPageSize());

            query.offset(pagina.getOffset());

            return new PageImpl<>(query.fetch(), pagina, query.fetchCount());
        }
        return new PageImpl<>(new ArrayList<>(), pagina, 0);
    }

    @Override
    public Certificado obtem(UUID idPublicacao, UUID idAreaAtuacao, UUID idUsuarioVoluntario){

        QCertificado certificado = QCertificado.certificado;

        JPAQuery<Certificado> query = jpaQueryFactory.selectFrom(certificado);

        BooleanExpression predicado = certificado.id.isNotNull();

        if(idPublicacao != null){
            predicado = predicado.and(certificado.publicacao.id.eq(idPublicacao));
        }

        if (idAreaAtuacao != null){
            predicado = predicado.and(certificado.areaAtuacao.id.eq(idAreaAtuacao));
        }

        if (idUsuarioVoluntario != null){
            predicado = predicado.and(certificado.usuario.id.eq(idUsuarioVoluntario));
        }

        query.where(predicado);

        return query.fetchFirst();
    }
}
