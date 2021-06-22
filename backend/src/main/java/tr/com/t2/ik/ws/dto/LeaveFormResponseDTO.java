package tr.com.t2.ik.ws.dto;

import lombok.Builder;
import lombok.Data;
import tr.com.t2.ik.model.Form;
import java.util.Set;

@Data
@Builder
public class LeaveFormResponseDTO {

    private String username;
    private String startDate;
    private String finishDate;
    private String reason;
    private int id;
    private Set<Form> forms;
}
