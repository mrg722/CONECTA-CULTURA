package cl.duoc.conectacultura.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

/**
 * Declara en el contrato OpenAPI el esquema Bearer que exige la Guía 17.
 *
 * Sin esta declaración, Swagger UI no ofrece el botón Authorize y las
 * operaciones de escritura solo podrían responder 401, de modo que el ciclo
 * CRUD que pide la Guía 15 no podría ejecutarse desde la documentación.
 */
@Configuration
public class OpenApiConfig {

    private static final String ESQUEMA_BEARER = "bearer-jwt";

    @Bean
    OpenAPI conectaCulturaOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Conecta Cultura API")
                .version("v1")
                .description("API de actividades culturales. Las lecturas son "
                    + "públicas; crear, actualizar y eliminar exigen un token "
                    + "con rol ADMIN obtenido en POST /api/auth/login."))
            .components(new Components()
                .addSecuritySchemes(ESQUEMA_BEARER, new SecurityScheme()
                    .type(SecurityScheme.Type.HTTP)
                    .scheme("bearer")
                    .bearerFormat("JWT")))
            .addSecurityItem(new SecurityRequirement().addList(ESQUEMA_BEARER));
    }
}
