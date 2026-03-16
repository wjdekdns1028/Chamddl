package com.chamddeur.repository;

import com.chamddeur.model.PrivateInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PrivateInquiryRepository extends JpaRepository<PrivateInquiry, Long> {
    List<PrivateInquiry> findAllByOrderByCreatedAtDesc();
}
