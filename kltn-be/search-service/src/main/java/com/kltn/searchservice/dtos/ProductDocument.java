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

    @Field(type = FieldType.Text, analyzer = "ngram_analyzer")
    private String productTitle;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String description;

    @Field(type = FieldType.Double)
    private BigDecimal productPrice;
}