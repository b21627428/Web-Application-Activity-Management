package com.example.demo.security;


import com.example.demo.model.Person;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

    static final long TOKEN_VALIDITY_SECONDS = 60 * 60 * 1000;
    static final String SECRET_KEY = "muhammed";


    public String getUsarnameFromToken(String token){
        return getClaimFromToken(token, Claims::getSubject);
    }

    private <T> T getClaimFromToken(String token, Function<Claims,T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
    private Boolean isTokenExpired(String token){
        final Date expirationDate = getExpirationDateFromToken(token);
        return expirationDate.before(new Date());
    }
    private Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token , Claims::getExpiration);
    }

    public String generateToken(Person person){
        Claims claims = Jwts.claims().setSubject(person.getIdentificationNumber());
        claims.put("scopes", Arrays.asList(new SimpleGrantedAuthority(
                "ROLE_"+UserDetailsServiceImpl.getUserAuthority(person))));
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+TOKEN_VALIDITY_SECONDS))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                .compact();
    }
    public boolean validateToken(String token, UserDetails userDetails){
        final String identification_number = getUsarnameFromToken(token);
        return (identification_number.equals(userDetails.getUsername())&&(!isTokenExpired(token)));
    }
}
