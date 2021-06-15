package tr.com.t2.ik.model;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Form {

    @Id
    @Column
    private String username;
    @Column
    private String date;

    @Column
    private String count;
    @Column
    private String type;
    @Column
    private String reason;



}
