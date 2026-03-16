package com.chamddeur.service;

import com.chamddeur.dto.PrivateInquiryDto;
import com.chamddeur.model.PrivateInquiry;
import com.chamddeur.repository.PrivateInquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PrivateInquiryService {

    private final PrivateInquiryRepository repo;

    public List<PrivateInquiryDto.ListItem> getList() {
        return repo.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PrivateInquiryDto.ListItem::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public void create(PrivateInquiryDto.Request req) {
        PrivateInquiry inquiry = PrivateInquiry.builder()
                .title(req.getTitle())
                .name(req.getName())
                .password(req.getPassword())
                .content(req.getContent())
                .build();
        repo.save(inquiry);
    }

    public PrivateInquiryDto.Response verify(Long id, String password) {
        PrivateInquiry inquiry = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다."));
        if (!inquiry.getPassword().equals(password)) {
            throw new RuntimeException("비밀번호가 올바르지 않습니다.");
        }
        return PrivateInquiryDto.Response.from(inquiry);
    }

    public List<PrivateInquiryDto.Response> getAll() {
        return repo.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PrivateInquiryDto.Response::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("게시물을 찾을 수 없습니다.");
        }
        repo.deleteById(id);
    }
}
