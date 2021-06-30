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
import tr.com.t2.ik.repository.FormRepository;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;


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
            adminT2.setBirthDate("1990-01-31");
            adminT2.setIdentificationNo("129886780");
            adminT2.setStatus("Aktif");

            personnelRepository.saveAll(Arrays.asList(adminT2));
        };
    }
}
