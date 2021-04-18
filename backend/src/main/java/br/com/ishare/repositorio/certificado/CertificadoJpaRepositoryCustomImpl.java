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
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

public class CertificadoJpaRepositoryCustomImpl implements CertificadoJpaRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Certificado> lista(Boolean ehOngOsc, String usuarioCriador, Usuario usuarioLogado, Pageable pagina){

        QCertificado certificado = QCertificado.certificado;

        JPAQuery<Certificado> query = jpaQueryFactory.selectFrom(certificado);

        BooleanExpression predicado = certificado.id.isNotNull();

        if(!ObjectUtils.isEmpty(ehOngOsc) && ehOngOsc){
            predicado = predicado.and(certificado.usuarioResponsavelCriacao.id.eq(usuarioLogado.getId()));

            query.where(predicado).orderBy(certificado.dataCriacao.desc());

            query.limit(pagina.getPageSize());

            query.offset(pagina.getOffset());

            return new PageImpl<>(query.fetch(), pagina, query.fetchCount());
        }

        if(StringUtils.hasLength(usuarioCriador)){
            predicado = predicado.and(certificado.usuarioResponsavelCriacao.nome.containsIgnoreCase(usuarioCriador));
        }

        predicado = predicado.and(certificado.usuario.id.eq(usuarioLogado.getId()));

        query.where(predicado).orderBy(certificado.dataCriacao.desc());

        query.limit(pagina.getPageSize());

        query.offset(pagina.getOffset());

        return new PageImpl<>(query.fetch(), pagina, query.fetchCount());
    }
}
