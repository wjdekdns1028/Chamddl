package com.chamddeur.dto;

import com.chamddeur.model.PrivateInquiry;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

public class PrivateInquiryDto {

    @Data
    public static class Request {
        @NotBlank private String title;
        @NotBlank private String name;
        @NotBlank private String password;
        private String content;
    }

    @Data
    public static class ListItem {
        private Long id;
        private String title;
        private String name;
        private LocalDateTime createdAt;

        public static ListItem from(PrivateInquiry p) {
            ListItem item = new ListItem();
            item.id = p.getId();
            item.title = p.getTitle();
            item.name = p.getName();
            item.createdAt = p.getCreatedAt();
            return item;
        }
    }

    @Data
    public static class Response {
        private Long id;
        private String title;
        private String name;
        private String content;
        private LocalDateTime createdAt;

        public static Response from(PrivateInquiry p) {
            Response r = new Response();
            r.id = p.getId();
            r.title = p.getTitle();
            r.name = p.getName();
            r.content = p.getContent();
            r.createdAt = p.getCreatedAt();
            return r;
        }
    }
}
