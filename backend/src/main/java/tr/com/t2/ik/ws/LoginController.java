package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.model.Role;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.security.JwtTokenUtil;
import tr.com.t2.ik.ws.dto.ControlResponseDTO;
import tr.com.t2.ik.ws.dto.JwtRequest;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import  java.util.List;
import java.util.ArrayList;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController

public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    PersonnelRepository personnelRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @RequestMapping("/api/login")
    @PostMapping
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws IOException
    {
        final Authentication authentication;
        authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = jwtTokenUtil.generateToken(authentication);
        return ResponseEntity.ok(token);

    }
    // Admin olup olmamasına bakıyoruz
    @RequestMapping("/api/login/control")
    @PostMapping
    public ControlResponseDTO Control(@RequestBody JwtRequest input) throws IOException{
        Optional<Personnel> personnelOptional = personnelRepository.findById(input.getUsername());
        List<Role> roleList = new ArrayList<>();
        boolean test1 =false;
        if(personnelOptional.isPresent()) {
            for (Role x : personnelOptional.get().getRoles()) {
                roleList.add(x);
            }
            for (int x = 0; x < roleList.size(); x++) {

                if (roleList.get(x).getName().equals("ROLE_ADMIN")) {
                    test1 = true;

                    break;
                } else
                    test1 = false;
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
    @RequestMapping("/api/login/control/active")
    @PostMapping
    // Userin active olup olmamasına bakıyoruz
    public ControlResponseDTO ControlisActive(@RequestBody JwtRequest input) throws IOException{
        Optional<Personnel> personnelOptional = personnelRepository.findById(input.getUsername());
        boolean test1 =false;
        if(personnelOptional.isPresent()) {
            if (personnelOptional.get().getStatus().equals("Aktif")) {
                test1 = true;
            } else {
                test1 = false;
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
