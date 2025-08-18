package com.kltnbe.recommendservice.dtos.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImportRecommend {
    private String file_path = "deploy_data/offline_recs.jsonl";
    private Integer batch_size = 1000;
}
