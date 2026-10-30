package cl.duoc.conectacultura.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @NotBlank(message="es obligatorio")
    private String username;

    @NotBlank(message="es obligatoria")
    private String password;
}
