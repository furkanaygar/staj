package tr.com.t2.ik.model;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Data
@Entity
public class LeaveForm {

    @Id
    @GeneratedValue
    private int id;
    @Column
    private String username;
    @Column
    private String startdate;
    @Column
    private String finishdate;
    @Column
    private String type;
    @Column
    private String reason;
    @Column
    private String status;
    @Column
    private String duration;






}