package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.ProductVariantDTO;
import com.kltnbe.productservice.entities.Color;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.ProductSize;
import com.kltnbe.productservice.entities.ProductVariant;
import com.kltnbe.productservice.repositories.ColorRepository;
import com.kltnbe.productservice.repositories.ProductRepository;
import com.kltnbe.productservice.repositories.ProductSizeRepository;
import com.kltnbe.productservice.repositories.ProductVariantRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductVariantServiceImpl implements ProductVariantService {

    private final ProductVariantRepository variantRepository;
    private final ProductRepository productRepository;
    private final ProductSizeRepository sizeRepository;
    private final ColorRepository colorRepository;

    @Override
    public ProductVariantDTO createVariant(ProductVariantDTO dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        ProductSize size = sizeRepository.findById(dto.getSizeId())
                .orElseThrow(() -> new EntityNotFoundException("Size not found"));
        Color color = colorRepository.findById(dto.getColorId())
                .orElseThrow(() -> new EntityNotFoundException("Color not found"));

        // Check trùng biến thể
        variantRepository.findByProductIdAndSizeIdAndColorId(
                        product.getProductId(), size.getSizeId(), color.getColorId())
                .ifPresent(v -> {
                    throw new IllegalArgumentException("❌ Biến thể đã tồn tại.");
                });

        ProductVariant variant = new ProductVariant();
        variant.setProduct(product);
        variant.setSize(size);
        variant.setColor(color);
        variant.setPrice(dto.getPrice());
        variant.setQuantityInStock(dto.getQuantityInStock());
        variant.setQuantitySold(dto.getQuantitySold() != null ? dto.getQuantitySold() : 0);
        variant.setStatus(
                dto.getStatus() != null
                        ? ProductVariant.VariantStatus.valueOf(dto.getStatus())
                        : (dto.getQuantityInStock() != null && dto.getQuantityInStock() > 0
                        ? ProductVariant.VariantStatus.IN_STOCK
                        : ProductVariant.VariantStatus.OUT_OF_STOCK)
        );

        ProductVariant saved = variantRepository.save(variant);
        return mapToDTO(saved);
    }


    @Override
    public ProductVariantDTO updateStock(Long variantId, int quantitySold) {
        ProductVariant variant = variantRepository.findById(variantId)
                .orElseThrow(() -> new EntityNotFoundException("Variant not found"));

        variant.setQuantitySold(variant.getQuantitySold() + quantitySold);
        variant.setQuantityInStock(variant.getQuantityInStock() - quantitySold);

        if (variant.getQuantityInStock() <= 0) {
            variant.setStatus(ProductVariant.VariantStatus.OUT_OF_STOCK);
        }

        ProductVariant updated = variantRepository.save(variant);
        return mapToDTO(updated);
    }

    @Override
    public List<ProductVariantDTO> getVariantsByProduct(Long productId) {
        return variantRepository.findByProduct_ProductId(productId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    private ProductVariantDTO mapToDTO(ProductVariant v) {
        ProductVariantDTO dto = new ProductVariantDTO();
        dto.setVariantId(v.getVariantId());
        dto.setProductId(v.getProduct().getProductId());
        dto.setSizeId(v.getSize().getSizeId());
        dto.setColorId(v.getColor().getColorId());
        dto.setPrice(v.getPrice());
        dto.setQuantityInStock(v.getQuantityInStock());
        dto.setQuantitySold(v.getQuantitySold());
        dto.setStatus(v.getStatus().name());
        dto.setAsin(v.getProduct().getAsin());
        return dto;
    }
    @Override
    public Optional<ProductVariant> findByProductVariant(Long productId, Long sizeId, Long colorId) {
        return variantRepository.findByProductVariant(productId, sizeId, colorId);
    }
    @Override
    public void updateVariant(Long variantId, BigDecimal price, int quantity) {
        Optional<ProductVariant> opt = variantRepository.findById(variantId);
        if (opt.isPresent()) {
            ProductVariant variant = opt.get();
            variant.setQuantityInStock(quantity);
            variant.setPrice(price);
            variantRepository.save(variant);
        }
    }

    @Override
    public Optional<ProductVariant> getVariantById(Long variantId) {
        return variantRepository.findById(variantId);
    }
    @Override
    public void deleteVariant(Long variantId) {
        variantRepository.deleteById(variantId);
    }
}
