package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;
import tr.com.t2.ik.model.LeaveForm;
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

    // USER INFOYU JSON OLARAK RETURN EDIYORUM
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
    // FORMLARI JSON OLARAK RETURN EDİYORUM
    public LeaveFormResponseDTO getForm(int id) {
        System.out.println("get");
        Optional<LeaveForm> formOptional = formRepository.findById(id);
        if (formOptional.isPresent()) {
            return LeaveFormResponseDTO
                    .builder()
                    .id(formOptional.get().getId())
                    .username(formOptional.get().getUsername())
                    .finishDate(formOptional.get().getFinishdate())
                    .startDate(formOptional.get().getStartdate())
                    .reason(formOptional.get().getReason())
                    .type(formOptional.get().getType())
                    .status(formOptional.get().getStatus())
                    .duration(formOptional.get().getDuration())
                    .build();

        }
        return null;
    }

// EDIT EDİLMEK ISTENMEYEN YERLERİ DEĞİŞTİRMİYORUM
    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping("/api/user/edit")
    @PutMapping
    public void change(@RequestBody JwtRequest input ) throws Exception {
        String username = input.getUsername();
        Optional<Personnel> person = personnelRepository.findById(username);
        person.get().setIdentificationNo(input.getIdentification_no());
        person.get().setBirthDate(input.getBirth_date());
        personnelRepository.save(person.get());

    }

    // USERI SILIYORUM SOFT DELETE
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/api/user/{username}/delete")
    @PostMapping
    public List<PersonnelResponseDTO> delete(@PathVariable("username") String username) throws Exception {
        Optional<Personnel> person = personnelRepository.findById(username);

        person.get().setStatus("Silindi");
        personnelRepository.save(person.get());
        System.out.println("delete");
        return show();

    }
    //USERI ACTIVE EDİYORUM
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/api/user/{username}/active")
    @PostMapping
    public List<PersonnelResponseDTO> active(@PathVariable("username") String username) throws Exception {

        Optional<Personnel> person = personnelRepository.findById(username);
        person.get().setStatus("Aktif");
        personnelRepository.save(person.get());
        System.out.println("Active");
        return show();

    }
    // TUM USERLARI LIST ŞEKLINDE RETURN EDIYORUM
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/api/user/showall")
    @GetMapping
    public List<PersonnelResponseDTO> show (){
        List<Personnel> list = new ArrayList<>();
        Sort sort = Sort.by(
                Sort.Order.asc("status"));
        personnelRepository.findAll(sort).forEach(list::add);
        List<PersonnelResponseDTO> list1 = new ArrayList<>();
        for (int i =0; i<list.size();i++) {
            list1.add( getPersonnel(list.get(i).getUsername()));
            }

       return list1;
    }


    //GIRILMIŞ OLARAN TARİHTEN SONRA BAŞLAYACAK LEAVE FORMLARI RETURN EDIYORUM (START DATE E GORE)
    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping("/api/user/search")
    @PostMapping
    public List<LeaveFormResponseDTO> search(@RequestBody JwtRequest abc)throws ParseException{
        System.out.println("search grdi");
        SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = date.parse(abc.getDate());
        List<LeaveForm> list = new ArrayList<>();
        formRepository.findAll().forEach(list::add);
        List<LeaveFormResponseDTO> list1 = new ArrayList<>();
        for(int i =0; i< list.size();i++){
            Date date2 = date.parse(list.get(i).getStartdate());
            if(date1.compareTo(date2)<0)
            {
                    list1.add( getForm(list.get(i).getId()));
            }
        }
        System.out.println("return");
        return list1 ;

    }

    // FORMLARI LIST OLARAK RETURN EDIYORUM ISTENILEN USERA GORE
    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping("/api/forms/{username}")
    @GetMapping
    public List<LeaveFormResponseDTO> showForms (@PathVariable("username") String username){
        List<LeaveForm> list = new ArrayList<>();
        formRepository.findAllByOrderByIdAsc().forEach(list::add);
        List<LeaveFormResponseDTO> list1 = new ArrayList<>();
        for (int i =0; i<list.size();i++) {
            if(username.equals(list.get(i).getUsername())){
                list1.add( getForm(list.get(i).getId()));
            }
        }
        return list1;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/api/user/form/{username}/approve/{i}")
    @PostMapping
    public List<LeaveFormResponseDTO> activeForm(@PathVariable ("username") String username,@PathVariable ("i") int id) throws Exception {
        Optional<LeaveForm> form = formRepository.findById(id);
        form.get().setStatus("Onaylandı");
        formRepository.save(form.get());
        return showForms(username);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/api/user/form/{username}/reject/{i}")
    @PostMapping
    public List<LeaveFormResponseDTO> rejectForm(@PathVariable ("username") String username,@PathVariable ("i") int id) throws Exception {
        Optional<LeaveForm> form = formRepository.findById(id);
        form.get().setStatus("Reddedildi");
        formRepository.save(form.get());
        return showForms(username);
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/api/user/search/users")
    @PostMapping
    public List<PersonnelResponseDTO> searchUser(@RequestBody JwtRequest abc)throws ParseException{
        String username = abc.getUsername();
        List<Personnel> list = new ArrayList<>();
        personnelRepository.findAll().forEach(list::add);
        List<PersonnelResponseDTO> list1 = new ArrayList<>();
        for(int i =0; i< list.size();i++){
            if(username.equals(list.get(i).getUsername()))
            {
                list1.add( getPersonnel(list.get(i).getUsername()));
            }
        }
        System.out.println("return");
        return list1 ;

    }



}




