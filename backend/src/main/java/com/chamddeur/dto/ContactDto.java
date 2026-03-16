package com.chamddeur.dto;

import com.chamddeur.model.ContactInquiry;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

public class ContactDto {

    @Data
    public static class Request {
        @NotBlank private String name;
        @NotBlank private String phone;
        private String type;
        private String message;
    }

    @Data
    public static class Response {
        private Long id;
        private String name;
        private String phone;
        private String type;
        private String message;
        private LocalDateTime createdAt;

        public static Response from(ContactInquiry c) {
            Response r = new Response();
            r.id        = c.getId();
            r.name      = c.getName();
            r.phone     = c.getPhone();
            r.type      = c.getType();
            r.message   = c.getMessage();
            r.createdAt = c.getCreatedAt();
            return r;
        }
    }
}
