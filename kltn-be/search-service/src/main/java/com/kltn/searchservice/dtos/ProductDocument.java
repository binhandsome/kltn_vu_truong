package com.kltn.searchservice.dtos;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.math.BigDecimal;

@Document(indexName = "products")
@Data
public class ProductDocument {

    @Id
    @Field(type = FieldType.Long)
    private Long productId;

    @Field(type = FieldType.Keyword)
    private String asin;

    @Field(type = FieldType.Text)
    private String productTitle;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Double)
    private BigDecimal productPrice;
    private String productThumbnail;
    private String salesRank;
    private String productType;
    private Double percentDiscount;
    private Integer stockQuantity;
    private String tags;
    private String productStatus; // ACTIVE, DELETED,...
    private Long storeId;

}