package tr.com.t2.ik;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.model.Role;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.repository.RoleRepository;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;

@SpringBootApplication
public class T2IKApplication {

    public static void main(String[] args) {
        SpringApplication.run(T2IKApplication.class, args);
    }

    @Bean
    public CommandLineRunner addTestUsers (PersonnelRepository personnelRepository, RoleRepository roleRepository) {
        return (args) -> {

            Role admin = new Role();
            admin.setName("ROLE_ADMIN");

            Role user = new Role();
            user.setName("ROLE_USER");

            roleRepository.saveAll(Arrays.asList(admin,user));


            Personnel adminT2 = new Personnel();
            adminT2.setUsername("adminT2");
            adminT2.setPassword(new BCryptPasswordEncoder().encode("admin"));
            adminT2.setRoles(new HashSet<>(Arrays.asList(admin,user)));
            adminT2.setBirthDate("31-01-1990");
            adminT2.setIdentificationNo("129886780");
            adminT2.setStatus("true");
            Personnel mete = new Personnel();
            mete.setUsername("metehan.danaci");
            mete.setPassword(new BCryptPasswordEncoder().encode("mete"));
            mete.setRoles(new HashSet<>(Collections.singletonList(user)));
            mete.setBirthDate("11-11-1990");
            mete.setIdentificationNo("123456780");
            mete.setStatus("true");


            Personnel tan = new Personnel();
            tan.setUsername("tan.apaydin");
            tan.setPassword(new BCryptPasswordEncoder().encode("tan"));
            tan.setRoles(new HashSet<>(Collections.singletonList(user)));
            tan.setBirthDate("04-11-1990");
            tan.setIdentificationNo("11111111");
            tan.setStatus("true");

            personnelRepository.saveAll(Arrays.asList(adminT2,tan,mete));
        };
    }
}
