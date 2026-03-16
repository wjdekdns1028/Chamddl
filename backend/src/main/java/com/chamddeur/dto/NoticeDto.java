package com.chamddeur.dto;

import com.chamddeur.model.Notice;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

public class NoticeDto {

    @Data
    public static class Request {
        @NotBlank private String title;
        @NotBlank private String content;
        private Notice.Category category = Notice.Category.NOTICE;
    }

    @Data
    public static class Response {
        private Long id;
        private String title;
        private String content;
        private Notice.Category category;
        private LocalDateTime createdAt;

        public static Response from(Notice n) {
            Response r = new Response();
            r.id        = n.getId();
            r.title     = n.getTitle();
            r.content   = n.getContent();
            r.category  = n.getCategory();
            r.createdAt = n.getCreatedAt();
            return r;
        }
    }
}
