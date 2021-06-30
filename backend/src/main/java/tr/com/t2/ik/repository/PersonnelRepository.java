package tr.com.t2.ik.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import tr.com.t2.ik.model.LeaveForm;
import tr.com.t2.ik.model.Personnel;

import java.util.List;
import java.util.Optional;

public interface PersonnelRepository extends CrudRepository<Personnel, String> {

    List<Personnel> findAll(Sort username);
}
