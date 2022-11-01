package global.config.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import static global.config.security.JwtConstants.*;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CustomAuthorizationFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain
  ) throws ServletException, IOException {
    String servletPath = request.getServletPath();
    String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

    if (servletPath.equals("/api/auth/login") || servletPath.equals("/api/auth/refresh")) {
      filterChain.doFilter(request, response);
    } else if (authorizationHeader == null || authorizationHeader.startsWith(TOKEN_HEADER_PREFIX)) {
      log.info("JWT Token이 존재하지 않습니다.");
      response.setStatus(400);
      response.setContentType("application/json");
      response.setCharacterEncoding("utf-8");
    }
  }
}
