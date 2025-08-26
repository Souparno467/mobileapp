package com.example.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MobileDTO {
    private Long id;
    private String brand;
    private String model;
    private double price;
    private int stock;
}