package com.appzys.web.util;

import org.springframework.stereotype.Component;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "appzys-super-secure-production-jwt-secret-key-2026-mobile-studio";
    private static final long EXPIRATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

    public String generateToken(String username, String role) {
        long now = Instant.now().getEpochSecond();
        long exp = now + EXPIRATION_SECONDS;

        String headerJson = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
        String payloadJson = String.format("{\"sub\":\"%s\",\"role\":\"%s\",\"iat\":%d,\"exp\":%d}",
                username, role, now, exp);

        String encodedHeader = base64UrlEncode(headerJson.getBytes(StandardCharsets.UTF_8));
        String encodedPayload = base64UrlEncode(payloadJson.getBytes(StandardCharsets.UTF_8));

        String signatureInput = encodedHeader + "." + encodedPayload;
        String signature = sign(signatureInput, SECRET_KEY);

        return signatureInput + "." + signature;
    }

    public boolean validateToken(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) return false;

            String signatureInput = parts[0] + "." + parts[1];
            String expectedSignature = sign(signatureInput, SECRET_KEY);

            if (!MessageDigest.isEqual(parts[2].getBytes(StandardCharsets.UTF_8), expectedSignature.getBytes(StandardCharsets.UTF_8))) {
                return false;
            }

            // Check expiration
            String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            if (payloadJson.contains("\"exp\":")) {
                int expIdx = payloadJson.indexOf("\"exp\":") + 6;
                int endIdx = payloadJson.indexOf("}", expIdx);
                if (endIdx == -1) endIdx = payloadJson.indexOf(",", expIdx);
                long exp = Long.parseLong(payloadJson.substring(expIdx, endIdx).trim());
                if (Instant.now().getEpochSecond() > exp) {
                    return false;
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String extractUsername(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length < 2) return null;
            String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            int subIdx = payloadJson.indexOf("\"sub\":\"");
            if (subIdx == -1) return null;
            subIdx += 7;
            int endIdx = payloadJson.indexOf("\"", subIdx);
            return payloadJson.substring(subIdx, endIdx);
        } catch (Exception e) {
            return null;
        }
    }

    private String sign(String data, String key) {
        try {
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKey);
            byte[] signedBytes = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return base64UrlEncode(signedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error signing JWT", e);
        }
    }

    private String base64UrlEncode(byte[] bytes) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
