package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.dtos.ExportMetaReponse;
import com.kltnbe.adminservice.dtos.RunBuildOfflineRequest;

public interface AdminSaveHistoryActionRecommendService {
    String exportMeta();
    String runBuildOffline(RunBuildOfflineRequest runBuildOfflineRequest);
    String importRecommendations(String fileSave);
}
