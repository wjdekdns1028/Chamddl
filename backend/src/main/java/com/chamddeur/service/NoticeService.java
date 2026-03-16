package com.chamddeur.service;

import com.chamddeur.dto.NoticeDto;
import com.chamddeur.model.Notice;
import com.chamddeur.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<NoticeDto.Response> getAll() {
        return noticeRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(NoticeDto.Response::from)
                .collect(Collectors.toList());
    }

    public NoticeDto.Response getOne(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("공지사항을 찾을 수 없습니다."));
        return NoticeDto.Response.from(notice);
    }

    @Transactional
    public NoticeDto.Response create(NoticeDto.Request req) {
        Notice notice = Notice.builder()
                .title(req.getTitle())
                .content(req.getContent())
                .category(req.getCategory())
                .build();
        return NoticeDto.Response.from(noticeRepository.save(notice));
    }

    @Transactional
    public void delete(Long id) {
        if (!noticeRepository.existsById(id)) {
            throw new RuntimeException("공지사항을 찾을 수 없습니다.");
        }
        noticeRepository.deleteById(id);
    }
}
