package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.model.Role;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.security.JwtTokenUtil;
import tr.com.t2.ik.ws.dto.ControlResponseDTO;
import tr.com.t2.ik.ws.dto.JwtRegisterNewRequest;
import tr.com.t2.ik.ws.dto.JwtRequest;

import java.security.Principal;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;

@RestController
public class AdminController {

    @Autowired
    private PersonnelRepository personnelRepository;
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/api/admin/add")
    @PostMapping
    public ControlResponseDTO add(@RequestBody JwtRegisterNewRequest input) {
        Role user = new Role();
        user.setName("ROLE_USER");
        Role admin = new Role();
        admin.setName("ROLE_ADMIN");
        boolean test1 =false;
        Optional<Personnel> abc = personnelRepository.findById(input.getUsername());
        if (!abc.isPresent()) {

            if (input.getRole().equals("admin")) {
                Personnel newPerson = new Personnel();
                newPerson.setUsername(input.getUsername());
                newPerson.setPassword(new BCryptPasswordEncoder().encode(input.getPassword()));
                newPerson.setBirthDate(input.getBirth_date());
                newPerson.setIdentificationNo(input.getIdentification_no());
                newPerson.setRoles(new HashSet<>(Arrays.asList(admin, user)));
                newPerson.setStatus("Aktif");
                personnelRepository.save(newPerson);
                test1=true;
            }
            else  {
                Personnel newPerson = new Personnel();
                newPerson.setUsername(input.getUsername());
                newPerson.setPassword(new BCryptPasswordEncoder().encode(input.getPassword()));
                newPerson.setBirthDate(input.getBirth_date());
                newPerson.setIdentificationNo(input.getIdentification_no());
                newPerson.setRoles(new HashSet<>(Collections.singleton(user)));
                newPerson.setStatus("Aktif");
                personnelRepository.save(newPerson);
                test1=true;
            }
        }

        if(test1==true){
            return ControlResponseDTO
                    .builder()
                    .test(true)
                    .build();
        }
        else
            return ControlResponseDTO
                    .builder()
                    .test(false)
                    .build();

    }


}



