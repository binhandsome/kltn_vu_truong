package com.kltnbe.productservice.dtos.req;
import java.util.List;
import java.util.Map;

public class RecommendNewReq {
    private String asin;                        // optional
    private String title;                       // required
    private List<List<String>> categories;      // list-of-lists
    private Map<String, Integer> salesRank;     // ví dụ {"Jewelry": 1}
    private String brand;
    private Integer topk = 100;                  // default

    // getters/setters
    public String getAsin() { return asin; }
    public void setAsin(String asin) { this.asin = asin; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public List<List<String>> getCategories() { return categories; }
    public void setCategories(List<List<String>> categories) { this.categories = categories; }
    public Map<String, Integer> getSalesRank() { return salesRank; }
    public void setSalesRank(Map<String, Integer> salesRank) { this.salesRank = salesRank; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public Integer getTopk() { return topk; }
    public void setTopk(Integer topk) { this.topk = topk; }
}
