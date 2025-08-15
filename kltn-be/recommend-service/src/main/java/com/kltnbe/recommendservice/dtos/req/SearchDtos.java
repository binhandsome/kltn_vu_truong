package com.kltnbe.recommendservice.dtos.req;

// SearchDtos.java
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class SearchDtos {
    public static class ResultItem {
        public String asin;
        public double score;
    }
    public static class SearchResponse {
        @JsonProperty("user_id")
        public String userId;
        public int count;
        public List<ResultItem> results;
        @JsonProperty("query_sha1")
        public String querySha1;
    }
}
