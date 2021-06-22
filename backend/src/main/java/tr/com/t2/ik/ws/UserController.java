package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.Form;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.repository.FormRepository;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.ws.dto.JwtRequest;
import tr.com.t2.ik.ws.dto.LeaveFormResponseDTO;
import tr.com.t2.ik.ws.dto.PersonnelResponseDTO;

import java.text.SimpleDateFormat;
import java.util.*;
import java.text.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    private PersonnelRepository personnelRepository;
    @Autowired
    private FormRepository formRepository;


    @GetMapping
    public String getMethod() {
        return "User Area, Welcome";
    }
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping
    @RequestMapping("/api/user/{username}/info")
    public PersonnelResponseDTO getPersonnel(@PathVariable("username") String username) {
        System.out.println("get");
        Optional<Personnel> personnelOptional = personnelRepository.findById(username);
       // Optional<Form> formOptional = formRepository.findById(username);
        if (personnelOptional.isPresent()) {
            return PersonnelResponseDTO
                    .builder()
                    .username(personnelOptional.get().getUsername())
                    .roles(personnelOptional.get().getRoles())
                    .dateBirth(personnelOptional.get().getBirthDate())
                    .identificationNo(personnelOptional.get().getIdentificationNo())
                    .status(personnelOptional.get().getStatus())
                    .build();

        }
        return null;
    }
    public LeaveFormResponseDTO getForm(int id) {
        System.out.println("get");
        Optional<Form> formOptional = formRepository.findById(id);
        if (formOptional.isPresent()) {
            return LeaveFormResponseDTO
                    .builder()
                    .id(formOptional.get().getId())
                    .username(formOptional.get().getUsername())
                    .finishDate(formOptional.get().getCount())
                    .startDate(formOptional.get().getCount())
                    .reason(formOptional.get().getReason())
                    .build();

        }
        return null;
    }


    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping("/api/user/edit")
    @PutMapping
    public void change(@RequestBody JwtRequest authenticationRequest) throws Exception {
        String username = authenticationRequest.getUsername();
        Optional<Personnel> person = personnelRepository.findById(username);
        person.get().setBirthDate(authenticationRequest.getBirth_date());
        person.get().setIdentificationNo(authenticationRequest.getIdentification_no());
        personnelRepository.save(person.get());

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/api/user/{username}/delete")
    @DeleteMapping
    public void delete(@PathVariable("username") String username) throws Exception {

        Optional<Personnel> person = personnelRepository.findById(username);
        person.get().setStatus("deleted");
        getPersonnel(username);
        personnelRepository.save(person.get());

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/api/user/showall")
    @GetMapping
    public List<PersonnelResponseDTO> show (){
        List<Personnel> list = new ArrayList<>();
        personnelRepository.findAll().forEach(list::add);
        List<PersonnelResponseDTO> list1 = new ArrayList<>();
        for (int i =0; i<list.size();i++) {
            list1.add( getPersonnel(list.get(i).getUsername()));
            }


       return list1;
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/api/forms/{username}")
    @GetMapping
    public List<LeaveFormResponseDTO> showForms (@PathVariable("username") String username){
        List<Form> list = new ArrayList<>();
        formRepository.findAll().forEach(list::add);
        List<LeaveFormResponseDTO> list1 = new ArrayList<>();
        for (int i =0; i<list.size();i++) {
            if(username.equals(list.get(i).getUsername())){
                list1.add( getForm(list.get(i).getId()));
            }
        }
        return list1;

    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/api/user/search")
    @PostMapping
    public List<PersonnelResponseDTO> search(@RequestBody JwtRequest abc)throws ParseException{
        SimpleDateFormat date = new SimpleDateFormat("dd-MM-yyyy");
        Date date1 = date.parse(abc.getBirth_date());
        List<Personnel> list = new ArrayList<>();
        personnelRepository.findAll().forEach(list::add);
        List<PersonnelResponseDTO> list1 = new ArrayList<>();

        for(int i =0; i< list.size();i++){
            Date date2 = date.parse(list.get(i).getBirthDate());
            // Girdiğimiz tarihten kücük olanı bastırıyorum hberiniz olsun
            if(date1.compareTo(date2)<0)
            {
                    list1.add( getPersonnel(list.get(i).getUsername()));
            }

        }
        return list1 ;

    }

}




