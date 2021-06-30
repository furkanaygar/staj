package tr.com.t2.ik.repository;

import org.springframework.data.repository.CrudRepository;
import tr.com.t2.ik.model.LeaveForm;

import java.util.List;
import java.util.Optional;

public interface FormRepository extends CrudRepository<LeaveForm, String> {

    Optional<LeaveForm> findById(int id);
    List<LeaveForm> findAllByOrderByIdAsc();
}

