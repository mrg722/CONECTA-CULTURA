package cl.duoc.conectacultura.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import cl.duoc.conectacultura.model.Usuario;
import cl.duoc.conectacultura.repository.UsuarioRepository;

/**
 * Crea las cuentas ADMIN y USER que la Guía 17 exige para comprobar la matriz
 * de permisos (anónimo 401, USER 403, ADMIN 201). Las contraseñas llegan como
 * variables de entorno: si no se entregan, no se crea ninguna cuenta y así
 * ninguna clave queda versionada en Git.
 */
@Configuration
public class UsuariosInicialesConfig {

    @Bean
    CommandLineRunner usuariosIniciales(UsuarioRepository usuarios,
            PasswordEncoder passwordEncoder,
            @Value("${app.seed.admin-username:admin}") String adminUsername,
            @Value("${app.seed.admin-password:}") String adminPassword,
            @Value("${app.seed.user-username:usuario}") String userUsername,
            @Value("${app.seed.user-password:}") String userPassword) {

        return argumentos -> {
            crear(usuarios, passwordEncoder, adminUsername, adminPassword, "ADMIN");
            crear(usuarios, passwordEncoder, userUsername, userPassword, "USER");
        };
    }

    private void crear(UsuarioRepository usuarios, PasswordEncoder passwordEncoder,
            String username, String password, String rol) {

        if (password == null || password.isBlank()) return;
        if (usuarios.findByUsername(username).isPresent()) return;

        usuarios.save(new Usuario(null, username,
            passwordEncoder.encode(password), rol));
    }
}
