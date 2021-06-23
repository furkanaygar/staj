package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.Form;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.repository.FormRepository;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.ws.dto.JwtRequest;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;

@RequestMapping("/api/form")
@RestController
public class FormController {
    @Autowired
    private FormRepository formRepository;
    @PostMapping
    public void add(@RequestBody JwtRequest input){

        Form newform = new Form();
        newform.setUsername(input.getUsername());
        newform.setDate(input.getDate());
        newform.setCount(input.getCount());
        newform.setReason(input.getReason());
        newform.setType(input.getType());
        formRepository.save(newform);
        System.out.println("form");


    }
}



