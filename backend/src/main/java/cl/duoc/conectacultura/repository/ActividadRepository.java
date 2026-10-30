package cl.duoc.conectacultura.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.duoc.conectacultura.model.Actividad;

@Repository
public interface ActividadRepository 
        extends JpaRepository<Actividad, Long> {

    List<Actividad> findByCategoriaIgnoreCase(String categoria);
}
