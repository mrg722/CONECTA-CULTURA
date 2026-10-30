package cl.duoc.conectacultura.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="actividad")
public class Actividad {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="es obligatorio")
    @Size(max=100, message="admite hasta 100 caracteres")
    private String nombre;

    @NotBlank(message="es obligatoria")
    @Size(max=500, message="admite hasta 500 caracteres")
    private String descripcion;

    @NotNull(message="es obligatorio")
    @Min(value=0, message="no puede ser negativo")
    private Integer precio;

    @NotNull(message="son obligatorios")
    @Min(value=0, message="no pueden ser negativos")
    private Integer cupos;

    @NotBlank(message="es obligatoria")
    @Size(max=60, message="admite hasta 60 caracteres")
    private String categoria;
}
