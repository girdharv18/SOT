package com.theskysid.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {

        // uncomment this env for personal use.

//        Dotenv dotenv = Dotenv.configure()
//                .ignoreIfMalformed()
//                .ignoreIfMissing()
//                .load();
//
//        dotenv.entries().forEach(e -> {
//            if (System.getProperty(e.getKey()) == null && System.getenv(e.getKey()) == null) {
//                System.setProperty(e.getKey(), e.getValue());
//            }
//        });

        SpringApplication.run(BackendApplication.class, args);

        System.out.println("UserManagementApplication started");
    }

}
