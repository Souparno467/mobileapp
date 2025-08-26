package com.example.repository;

import com.example.entity.Mobile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MobileRepository extends JpaRepository<Mobile, Long> {
    // Custom query methods
    List<Mobile> findByBrandIgnoreCase(String brand);
    List<Mobile> findByPriceLessThan(double price);
    List<Mobile> findByStockGreaterThan(int stock);

    @Query("SELECT m FROM Mobile m WHERE LOWER(m.model) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Mobile> searchByModel(String keyword);
}
