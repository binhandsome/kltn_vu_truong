package com.kltnbe.recommendservice.dtos.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RunBuildOfflineRequest {
    private String meta_path;
    private Integer topk;
}
