package cl.duoc.conectacultura.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import cl.duoc.conectacultura.dto.LoginRequest;
import cl.duoc.conectacultura.dto.LoginResponse;
import cl.duoc.conectacultura.model.Usuario;
import cl.duoc.conectacultura.repository.UsuarioRepository;
import cl.duoc.conectacultura.security.JwtService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarios;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UsuarioRepository usuarios,
            PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarios = usuarios;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest credenciales) {
        Usuario usuario = usuarios.findByUsername(credenciales.getUsername())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Credenciales inválidas"));

        if (!passwordEncoder.matches(credenciales.getPassword(),
                usuario.getPasswordHash())) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
        }

        return new LoginResponse(
            jwtService.generar(usuario.getUsername(), usuario.getRol()),
            usuario.getUsername(),
            usuario.getRol());
    }
}
