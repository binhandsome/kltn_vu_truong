package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.ProductDTO;
import com.kltnbe.productservice.dtos.ProductVariantDTO;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.ProductVariant;
import com.kltnbe.productservice.repositories.ProductRepository;
import com.kltnbe.productservice.repositories.ProductVariantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductVariantRepository variantRepository;

    @Override
    public ProductDTO getProductByAsin(String asin) {
        Optional<Product> product = productRepository.findByAsin(asin);
        return product.map(this::convertToDto).orElse(null);
    }

    @Override
    public ProductVariantDTO getVariantById(Long variantId) {
        Optional<ProductVariant> variant = variantRepository.findById(variantId);
        return variant.map(this::convertToVariantDto).orElse(null);
    }

    @Override
    public List<ProductDTO> searchProducts(String keyword) {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .filter(p -> p.getProductTitle().toLowerCase().contains(keyword.toLowerCase()))
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> filterProducts(String category, String brand) {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .filter(p -> (category == null || (p.getBrandName() != null && p.getBrandName().equalsIgnoreCase(category))) &&
                        (brand == null || (p.getBrandName() != null && p.getBrandName().equalsIgnoreCase(brand))))
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductVariantDTO createVariant(ProductVariantDTO variantDTO) {
        ProductVariant variant = convertToEntity(variantDTO);
        variant = variantRepository.save(variant);
        return convertToVariantDto(variant);
    }

    @Override
    public ProductVariantDTO updateVariant(Long variantId, ProductVariantDTO variantDTO) {
        Optional<ProductVariant> variantOptional = variantRepository.findById(variantId);
        if (variantOptional.isPresent()) {
            ProductVariant variant = variantOptional.get();
            variant = convertToEntity(variantDTO);
            variant.setVariantId(variantId);
            return convertToVariantDto(variantRepository.save(variant));
        }
        return null;
    }

    @Override
    public void deleteVariant(Long variantId) {
        variantRepository.deleteById(variantId);
    }

    private ProductDTO convertToDto(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setProductId(product.getProductId());
        dto.setAsin(product.getAsin());
        dto.setProductTitle(product.getProductTitle());
        dto.setProductPrice(product.getProductPrice());
        dto.setAverageRating(product.getAverageRating());
        dto.setNumberOfRatings(product.getNumberOfRatings());
        dto.setProductThumbnail(product.getProductThumbnail());
        dto.setBrandName(product.getBrandName());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setProductStatus(product.getProductStatus().name());
        return dto;
    }

    private ProductVariantDTO convertToVariantDto(ProductVariant variant) {
        ProductVariantDTO dto = new ProductVariantDTO();
        dto.setVariantId(variant.getVariantId());
        dto.setProductAsin(variant.getProductAsin());
        dto.setStoreId(variant.getStoreId());
        dto.setVariantPrice(variant.getVariantPrice());
        dto.setVariantColor(variant.getVariantColor());
        dto.setVariantSku(variant.getVariantSku());
        dto.setVariantThumbnail(variant.getVariantThumbnail());
        return dto;
    }

    private ProductVariant convertToEntity(ProductVariantDTO dto) {
        ProductVariant variant = new ProductVariant();
        variant.setVariantId(dto.getVariantId());
        variant.setProductAsin(dto.getProductAsin());
        variant.setStoreId(dto.getStoreId());
        variant.setVariantPrice(dto.getVariantPrice());
        variant.setVariantColor(dto.getVariantColor());
        variant.setVariantSku(dto.getVariantSku());
        variant.setVariantThumbnail(dto.getVariantThumbnail());
        return variant;
    }
}