package tr.com.t2.ik.model;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Data
@Entity
public class Form {

    @Id
    @GeneratedValue
    private int id;
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