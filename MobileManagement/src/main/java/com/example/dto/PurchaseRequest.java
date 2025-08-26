package com.example.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseRequest {
    @NotNull(message = "Mobile ID is required")
    private Long mobileId;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
}