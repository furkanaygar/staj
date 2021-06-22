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
import tr.com.t2.ik.ws.dto.JwtRequest;

import java.security.Principal;
import java.util.Collections;
import java.util.HashSet;

@RestController
public class AdminController {

    @Autowired
    private PersonnelRepository personnelRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

   /* @RequestMapping("/api/admin/login")
    @PostMapping
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception
    {
        System.out.println("1");
        final Authentication authentication;
        authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        System.out.println("2");
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("3");
        final String token = jwtTokenUtil.generateToken(authentication);
        System.out.println("4");
        System.out.println(" admin girdi");
        System.out.println("5");
        return ResponseEntity.ok(token);


    }*/


    @RequestMapping("/api/admin/add")
    @PostMapping
    public void add(@RequestBody JwtRequest authenticationRequest){
        Personnel newPerson = new Personnel();
        Role user = new Role();
        user.setName("ROLE_USER");
        newPerson.setUsername(authenticationRequest.getUsername());
        newPerson.setPassword(new BCryptPasswordEncoder().encode(authenticationRequest.getPassword()));
        //newPerson.setBirthDate(authenticationRequest.getBirth_date());
       // newPerson.setIdentificationNo(authenticationRequest.getIdentification_no());
        newPerson.setRoles(new HashSet<>(Collections.singletonList(user)));
        newPerson.setStatus("active");
        personnelRepository.save(newPerson);

    }


}



