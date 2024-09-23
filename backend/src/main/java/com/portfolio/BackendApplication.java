package com.portfolio;

import java.util.Properties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().directory("../").load();

		String dbUrl = dotenv.get("DATABASE_URL");
		String dbUsername = dotenv.get("DATABASE_USERNAME");
		String dbPassword = dotenv.get("DATABASE_PASSWORD");

    Properties prop = new Properties();
	prop.put("spring.datasource.url", dbUrl);
	prop.put("spring.datasource.username", dbUsername);
	prop.put("spring.datasource.password", dbPassword);


	SpringApplication app  =  new	SpringApplication(BackendApplication.class);
	app.setDefaultProperties(prop);
	app.run(args);
	


	}

}
