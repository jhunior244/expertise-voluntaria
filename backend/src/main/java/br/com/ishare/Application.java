package br.com.ishare;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@SpringBootApplication
@EntityScan(basePackageClasses = {Application.class})
@ComponentScan(basePackages = "br.com.ishare.controlador")
@ComponentScan(basePackages = "br.com.ishare.servico")
@ComponentScan(basePackages = "br.com.ishare.repositorio")
@ComponentScan(basePackages = "br.com.ishare.mapeador")
@ComponentScan(basePackages = "br.com.ishare.autenticacao")
@ComponentScan(basePackages = "br.com.ishare.core.autenticacao")
public class Application {

	@PersistenceContext
	private EntityManager em;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public JPAQueryFactory jpaQueryFactory() {
		return new JPAQueryFactory(em);
	}

}
