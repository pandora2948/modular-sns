package global.config.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
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
@RequiredArgsConstructor
public class CustomAuthorizationFilter extends OncePerRequestFilter {
  private final JwtProvider jwtProvider;
  private final UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain
  ) throws ServletException, IOException {
    String servletPath = request.getServletPath();
    String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

    if (servletPath.startsWith("/api/auth")) {
      filterChain.doFilter(request, response);
      return;
    } else if (authorizationHeader == null || authorizationHeader.startsWith(TOKEN_HEADER_PREFIX)) {
      log.info("JWT Token이 존재하지 않습니다.");
      response.setStatus(400);
      response.setContentType("application/json");
      response.setCharacterEncoding("utf-8");
    }

    String token = authorizationHeader.substring(TOKEN_HEADER_PREFIX.length());
    String email = jwtProvider.extractEmail(token);
    UserDetails userDetails = userDetailsService.loadUserByUsername(email);
    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
      new UsernamePasswordAuthenticationToken(
        userDetails, null, userDetails.getAuthorities()
      );
    usernamePasswordAuthenticationToken.setDetails(
      new WebAuthenticationDetailsSource().buildDetails(request)
    );
    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    filterChain.doFilter(request, response);

  }
}
