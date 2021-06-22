package tr.com.t2.ik.repository;

import org.springframework.data.repository.CrudRepository;
import tr.com.t2.ik.model.Form;

import java.util.Optional;

public interface FormRepository extends CrudRepository<Form, String> {

    Optional<Form> findById(int id);
}
