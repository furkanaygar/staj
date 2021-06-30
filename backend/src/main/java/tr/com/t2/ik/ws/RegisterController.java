package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.model.Role;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.ws.dto.ControlResponseDTO;
import tr.com.t2.ik.ws.dto.JwtRequest;

import java.security.Principal;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;

@RestController
public class RegisterController {
    @Autowired
    private PersonnelRepository personnelRepository;

    @RequestMapping("/api/register")
    @PostMapping
    public ControlResponseDTO add(@RequestBody JwtRequest input) {
        Optional<Personnel> abc = personnelRepository.findById(input.getUsername());
        boolean test1 =false;
        if (!abc.isPresent()) {
            Personnel newPerson = new Personnel();
            Role user = new Role();
            user.setName("ROLE_USER");
            newPerson.setUsername(input.getUsername());
            newPerson.setPassword(new BCryptPasswordEncoder().encode(input.getPassword()));
            newPerson.setBirthDate(input.getBirth_date());
            newPerson.setIdentificationNo(input.getIdentification_no());
            newPerson.setRoles(new HashSet<>(Collections.singletonList(user)));
            newPerson.setStatus("Aktif");
            personnelRepository.save(newPerson);
            test1=true;
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



