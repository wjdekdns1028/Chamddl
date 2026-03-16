package com.chamddeur.controller;

import com.chamddeur.dto.NoticeDto;
import com.chamddeur.service.NoticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public ResponseEntity<List<NoticeDto.Response>> getAll() {
        return ResponseEntity.ok(noticeService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoticeDto.Response> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(noticeService.getOne(id));
    }

    @PostMapping
    public ResponseEntity<NoticeDto.Response> create(@Valid @RequestBody NoticeDto.Request req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(noticeService.create(req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        noticeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
