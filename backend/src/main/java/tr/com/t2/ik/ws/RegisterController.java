package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.model.Role;
import tr.com.t2.ik.repository.PersonnelRepository;
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
    public void add(@RequestBody JwtRequest authenticationRequest) {
        Optional<Personnel> abc = personnelRepository.findById(authenticationRequest.getUsername());
        if (!abc.isPresent()) {
            Personnel newPerson = new Personnel();
            Role user = new Role();
            user.setName("ROLE_USER");
            newPerson.setUsername(authenticationRequest.getUsername());
            newPerson.setPassword(new BCryptPasswordEncoder().encode(authenticationRequest.getPassword()));
            newPerson.setBirthDate(authenticationRequest.getBirth_date());
            newPerson.setIdentificationNo(authenticationRequest.getIdentification_no());
            newPerson.setRoles(new HashSet<>(Collections.singletonList(user)));
            newPerson.setStatus("true");
            personnelRepository.save(newPerson);
        }
        else
            return;

    }
}



