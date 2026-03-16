package com.chamddeur.controller;

import com.chamddeur.dto.PrivateInquiryDto;
import com.chamddeur.service.PrivateInquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class PrivateInquiryController {

    private final PrivateInquiryService service;

    @GetMapping
    public ResponseEntity<List<PrivateInquiryDto.ListItem>> getList() {
        return ResponseEntity.ok(service.getList());
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody PrivateInquiryDto.Request req) {
        service.create(req);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/verify")
    public ResponseEntity<PrivateInquiryDto.Response> verify(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(service.verify(id, body.get("password")));
    }

    @GetMapping("/admin")
    public ResponseEntity<List<PrivateInquiryDto.Response>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
