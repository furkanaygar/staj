package tr.com.t2.ik.model;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity

public class Personnel {

    @Id
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String identificationNo;
    @Column
    private String birthDate;
    @Column
    private String status;




    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "personnel_roles",
            joinColumns = @JoinColumn(name = "username"),
            inverseJoinColumns = @JoinColumn(name = "name")
    )
    private Set<Role> roles = new HashSet<>();



}