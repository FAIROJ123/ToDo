package com.bridgeit.todo.user.configuration;



import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.XmlViewResolver;

import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.user.model.User;





@Configuration
@EnableWebMvc
@PropertySource("classpath:db.properties")
@EnableTransactionManagement
@ComponentScan(basePackages ="com.bridgeit.todo")

public class AppConfig extends WebMvcConfigurerAdapter {
	 
	@Autowired
	   private Environment env;
	
	@Bean
	   public DataSource getDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
	      dataSource.setDriverClassName(env.getProperty("db.driver"));
	      dataSource.setUrl(env.getProperty("db.url"));
	      dataSource.setUsername(env.getProperty("db.username"));
	      dataSource.setPassword(env.getProperty("db.password"));
	      return dataSource;
	   }

	   @Bean
	   public LocalSessionFactoryBean getSessionFactory() {
	      LocalSessionFactoryBean factoryBean = new LocalSessionFactoryBean();
	      factoryBean.setDataSource(getDataSource());
	      
	      Properties props=new Properties();
	      props.put("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
	      props.put("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));

	      factoryBean.setHibernateProperties(props);
	     /* factoryBean.setAnnotatedPackages("com.bridgeit.todo.notes");
	      factoryBean.setAnnotatedPackages("com.bridgeit.todo.user");
	      factoryBean.setAnnotatedPackages("com.bridgeit.todo.labels");*/
          factoryBean.setAnnotatedClasses(User.class,Notes.class,Label.class);
	      return factoryBean;
	   }

	   @Bean
	   public HibernateTransactionManager getTransactionManager() {
	      HibernateTransactionManager transactionManager = new HibernateTransactionManager();
	      transactionManager.setSessionFactory(getSessionFactory().getObject());
	      return transactionManager;
	   }
	   
	   @Bean
		public RedisConnectionFactory redisConnectionFactory() {
			
			JedisConnectionFactory connectionFactory = new JedisConnectionFactory();
			
			connectionFactory.setHostName("localhost");
			connectionFactory.setPort(6379);
			
			return connectionFactory;
		}
	   @Bean
		public RedisTemplate<String, String> redisTemplate() {
			RedisTemplate<String, String> redisTemplate = new RedisTemplate<String, String>();
			redisTemplate.setConnectionFactory(redisConnectionFactory());
			return redisTemplate;
		}
	   
	   @Override
	   public void addResourceHandlers(ResourceHandlerRegistry registry) {
		   
		      registry.addResourceHandler("/bower_components/**").addResourceLocations("/bower_components/");
		      registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
		      registry.addResourceHandler("/controllers/**").addResourceLocations("/controllers/");
		      registry.addResourceHandler("/templates/**").addResourceLocations("/templates/");
		      registry.addResourceHandler("/services/**").addResourceLocations("/services/");
		      registry.addResourceHandler("/derectives/**").addResourceLocations("/derectives/");
		      registry.addResourceHandler("/images/**").addResourceLocations("/images/");
		      registry.addResourceHandler("/css/**").addResourceLocations("/css/");
		      registry.addResourceHandler("/scripts/**").addResourceLocations("/scripts/");
		     
	   }

	   
}
