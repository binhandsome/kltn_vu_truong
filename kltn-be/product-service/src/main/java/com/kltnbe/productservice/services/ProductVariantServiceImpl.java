package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.ProductVariantDTO;
import com.kltnbe.productservice.dtos.req.InventoryRestoreRequest;
import com.kltnbe.productservice.entities.Color;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.ProductSize;
import com.kltnbe.productservice.entities.ProductVariant;
import com.kltnbe.productservice.repositories.ColorRepository;
import com.kltnbe.productservice.repositories.ProductRepository;
import com.kltnbe.productservice.repositories.ProductSizeRepository;
import com.kltnbe.productservice.repositories.ProductVariantRepository;
import com.kltnbe.productservice.clients.SellerServiceProxy;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductVariantServiceImpl implements ProductVariantService {

    private final ProductVariantRepository variantRepository;
    private final ProductRepository productRepository;
    private final ProductSizeRepository sizeRepository;
    private final ColorRepository colorRepository;
    private final SellerServiceProxy sellerServiceProxy;

    // ✅ Helper để kiểm tra quyền sở hữu
    private void validateShopOwnership(Long storeId, Long authId) {
        Object body = sellerServiceProxy.getAuthIdByStore(storeId).getBody();
        Long storeOwnerAuth = (body instanceof Integer) ? ((Integer) body).longValue() : (Long) body;
        if (!authId.equals(storeOwnerAuth)) {
            throw new RuntimeException("❌ Bạn không có quyền thao tác với shop này");
        }
    }

    @Override
    public ProductVariantDTO createVariant(ProductVariantDTO dto, Long authId) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        // ✅ Kiểm tra quyền sở hữu
        validateShopOwnership(product.getStoreId(), authId);

        ProductSize size = sizeRepository.findById(dto.getSizeId())
                .orElseThrow(() -> new EntityNotFoundException("Size not found"));
        Color color = colorRepository.findById(dto.getColorId())
                .orElseThrow(() -> new EntityNotFoundException("Color not found"));

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
    public ProductVariantDTO updateStock(Long variantId, int quantitySold, Long authId) {
        ProductVariant variant = variantRepository.findById(variantId)
                .orElseThrow(() -> new EntityNotFoundException("Variant not found"));

        validateShopOwnership(variant.getProduct().getStoreId(), authId);

        variant.setQuantitySold(variant.getQuantitySold() + quantitySold);
        variant.setQuantityInStock(variant.getQuantityInStock() - quantitySold);

        if (variant.getQuantityInStock() <= 0) {
            variant.setStatus(ProductVariant.VariantStatus.OUT_OF_STOCK);
        }

        ProductVariant updated = variantRepository.save(variant);
        return mapToDTO(updated);
    }

    @Override
    public List<ProductVariantDTO> getVariantsByProduct(Long productId, Long authId) {
        Long storeId = productRepository.findStoreIdByProductId(productId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy store của sản phẩm"));

        validateShopOwnership(storeId, authId); // Kiểm tra quyền sở hữu

        return variantRepository.findByProduct_ProductId(productId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    @Override
    public Optional<ProductVariant> findByProductVariant(Long productId, Long sizeId, Long colorId) {
        return variantRepository.findByProductVariant(productId, sizeId, colorId);
    }

    @Override
    public void updateVariant(Long variantId, BigDecimal price, int quantity, Long authId) {
        Optional<ProductVariant> opt = variantRepository.findById(variantId);
        if (opt.isPresent()) {
            ProductVariant variant = opt.get();

            validateShopOwnership(variant.getProduct().getStoreId(), authId);

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
    public void deleteVariant(Long variantId, Long authId) {
        ProductVariant variant = variantRepository.findById(variantId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy biến thể"));
        validateShopOwnership(variant.getProduct().getStoreId(), authId);
        variantRepository.deleteById(variantId);
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
    public void restoreInventoryFromNames(List<InventoryRestoreRequest> requests) {
        for (InventoryRestoreRequest req : requests) {
            String colorName = req.getColor();
            String sizeName = req.getSize();

            Optional<ProductVariant> variantOpt = variantRepository.findVariant(
                    req.getProductId(), colorName, sizeName
            );

            if (variantOpt.isPresent()) {
                ProductVariant variant = variantOpt.get();

                variant.setQuantityInStock(variant.getQuantityInStock() + req.getQuantity());
                variant.setQuantitySold(Math.max(variant.getQuantitySold() - req.getQuantity(), 0));

                if (variant.getQuantityInStock() > 0) {
                    variant.setStatus(ProductVariant.VariantStatus.IN_STOCK);
                }

                variantRepository.save(variant);
            } else {
                System.err.println("❌ Không tìm thấy biến thể: productId = " + req.getProductId() +
                        ", color = " + colorName + ", size = " + sizeName);
            }
        }
    }

}
