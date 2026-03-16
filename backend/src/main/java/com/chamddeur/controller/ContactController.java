package com.chamddeur.controller;

import com.chamddeur.dto.ContactDto;
import com.chamddeur.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    /** 공개: 상담 신청 */
    @PostMapping
    public ResponseEntity<Void> submit(@Valid @RequestBody ContactDto.Request dto) {
        contactService.submit(dto);
        return ResponseEntity.ok().build();
    }

    /** 관리자 전용: 문의 목록 조회 */
    @GetMapping
    public ResponseEntity<List<ContactDto.Response>> getAll() {
        return ResponseEntity.ok(contactService.getAll());
    }
}
