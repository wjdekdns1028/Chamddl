package com.chamddeur.service;

import com.chamddeur.dto.ContactDto;
import com.chamddeur.model.ContactInquiry;
import com.chamddeur.repository.ContactInquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactInquiryRepository contactInquiryRepository;

    @Transactional
    public void submit(ContactDto.Request dto) {
        ContactInquiry inquiry = ContactInquiry.builder()
                .name(dto.getName())
                .phone(dto.getPhone())
                .type(dto.getType())
                .message(dto.getMessage())
                .build();
        contactInquiryRepository.save(inquiry);
    }

    @Transactional(readOnly = true)
    public List<ContactDto.Response> getAll() {
        return contactInquiryRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(ContactDto.Response::from)
                .collect(Collectors.toList());
    }
}
