package com.example.controller;

import com.example.dto.MobileDTO;
import com.example.dto.PurchaseRequest;
import com.example.service.MobileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mobiles")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class MobileController {
    private final MobileService service;

    @GetMapping
    public List<MobileDTO> getMobiles() {
        return service.getAllMobiles();
    }

    @PostMapping("/purchase")
    public String purchaseMobile(@Valid @RequestBody PurchaseRequest request) {
        return service.purchaseMobile(request);
    }

    // Custom query endpoints
    @GetMapping("/brand/{brand}")
    public List<MobileDTO> getByBrand(@PathVariable String brand) {
        return service.getMobilesByBrand(brand);
    }

    @GetMapping("/price/{price}")
    public List<MobileDTO> getCheaperThan(@PathVariable double price) {
        return service.getMobilesCheaperThan(price);
    }

    @GetMapping("/stock/{stock}")
    public List<MobileDTO> getByStock(@PathVariable int stock) {
        return service.getMobilesWithStock(stock);
    }

    @GetMapping("/search/{keyword}")
    public List<MobileDTO> searchByModel(@PathVariable String keyword) {
        return service.searchMobilesByModel(keyword);
    }
}
