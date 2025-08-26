package com.example.service;

import com.example.dto.MobileDTO;
import com.example.dto.PurchaseRequest;
import com.example.entity.Mobile;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.MobileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MobileService {
    private final MobileRepository repo;

    // Get all mobiles
    public List<MobileDTO> getAllMobiles() {
        return repo.findAll()
                .stream()
                .map(m -> new MobileDTO(m.getId(), m.getBrand(), m.getModel(), m.getPrice(), m.getStock()))
                .collect(Collectors.toList());
    }

    // Purchase mobile
    public String purchaseMobile(PurchaseRequest request) {
        Mobile mobile = repo.findById(request.getMobileId())
                .orElseThrow(() -> new ResourceNotFoundException("Mobile not found"));

        if (mobile.getStock() < request.getQuantity()) {
            throw new IllegalArgumentException("Not enough stock available");
        }

        mobile.setStock(mobile.getStock() - request.getQuantity());
        repo.save(mobile);

        return "Purchase successful! " + request.getCustomerName() +
                " bought " + request.getQuantity() + " " + mobile.getModel();
    }

    // Custom query methods
    public List<MobileDTO> getMobilesByBrand(String brand) {
        return repo.findByBrandIgnoreCase(brand)
                .stream()
                .map(m -> new MobileDTO(m.getId(), m.getBrand(), m.getModel(), m.getPrice(), m.getStock()))
                .collect(Collectors.toList());
    }

    public List<MobileDTO> getMobilesCheaperThan(double price) {
        return repo.findByPriceLessThan(price)
                .stream()
                .map(m -> new MobileDTO(m.getId(), m.getBrand(), m.getModel(), m.getPrice(), m.getStock()))
                .collect(Collectors.toList());
    }

    public List<MobileDTO> getMobilesWithStock(int minStock) {
        return repo.findByStockGreaterThan(minStock)
                .stream()
                .map(m -> new MobileDTO(m.getId(), m.getBrand(), m.getModel(), m.getPrice(), m.getStock()))
                .collect(Collectors.toList());
    }

    public List<MobileDTO> searchMobilesByModel(String keyword) {
        return repo.searchByModel(keyword)
                .stream()
                .map(m -> new MobileDTO(m.getId(), m.getBrand(), m.getModel(), m.getPrice(), m.getStock()))
                .collect(Collectors.toList());
    }
}
