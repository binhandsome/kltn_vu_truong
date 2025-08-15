package com.kltnbe.productservice.dtos;

import java.util.List;

public class RecommendResponse {
    public static class Query {
        private String asin;
        private String title;
        public String getAsin() { return asin; }
        public void setAsin(String asin) { this.asin = asin; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
    }
    private Query query;
    private List<String> recommend_asins;
    private List<Double> scores;
    private Integer count;
    private String message; // có thể null

    public Query getQuery() { return query; }
    public void setQuery(Query query) { this.query = query; }
    public List<String> getRecommend_asins() { return recommend_asins; }
    public void setRecommend_asins(List<String> recommend_asins) { this.recommend_asins = recommend_asins; }
    public List<Double> getScores() { return scores; }
    public void setScores(List<Double> scores) { this.scores = scores; }
    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}