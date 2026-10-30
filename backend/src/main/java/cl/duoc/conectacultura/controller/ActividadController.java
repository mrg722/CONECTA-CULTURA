package cl.duoc.conectacultura.controller;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import cl.duoc.conectacultura.model.Actividad;
import cl.duoc.conectacultura.service.ActividadService;

@RestController
@RequestMapping("/api/actividades")
public class ActividadController {
    @Autowired
    private ActividadService servicio;

    @GetMapping 
    public List<Actividad> listar() { 
        return servicio.listar(); 
    }

    @GetMapping("/{id}") 
    public Actividad buscar(@PathVariable Long id) { 
        return servicio.buscar(id); 
    }

    @PostMapping
    public ResponseEntity<Actividad> crear(@Valid @RequestBody Actividad actividad) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servicio.guardar(actividad));
    }

    @PutMapping("/{id}")
    public Actividad actualizar(@PathVariable Long id, @Valid @RequestBody Actividad actividad) {
        return servicio.actualizar(id, actividad);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) { 
        servicio.eliminar(id); 
    }

}
