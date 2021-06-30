package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.LeaveForm;
import tr.com.t2.ik.model.LeaveForm;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.repository.FormRepository;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.ws.dto.JwtRequest;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;


@RestController
public class FormController {

    @Autowired
    private FormRepository formRepository;

    @RequestMapping("/api/form")
    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public void add(@RequestBody JwtRequest input){
        
        LeaveForm newform = new LeaveForm();
        newform.setUsername(input.getUsername());
        newform.setStartdate(input.getDate());
        newform.setFinishdate(input.getCount());
        newform.setReason(input.getReason());
        newform.setType(input.getType());
        newform.setStatus("Beklemede");
        if(input.getType().equals("Mazeret")){
            newform.setDuration(input.getDuration()+" saat");
        }
        else {
        newform.setDuration(input.getDuration()+" gün");
        }
        formRepository.save(newform);


    }





}