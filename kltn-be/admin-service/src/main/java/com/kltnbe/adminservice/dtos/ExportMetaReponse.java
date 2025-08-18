package com.kltnbe.adminservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExportMetaReponse {
    private String status;
    private String file;
    private Integer count;
}
