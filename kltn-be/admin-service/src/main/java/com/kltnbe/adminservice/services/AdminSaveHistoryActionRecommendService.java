package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.dtos.ExportMetaReponse;
import com.kltnbe.adminservice.dtos.RunBuildOfflineRequest;
import com.kltnbe.adminservice.entities.SaveHistoryActionRecommend;

import java.util.List;

public interface AdminSaveHistoryActionRecommendService {
    String exportMeta();
    String runBuildOffline(RunBuildOfflineRequest runBuildOfflineRequest);
    String importRecommendations(String fileSave);
    List<SaveHistoryActionRecommend> findAllByOrderByCreatedAtDesc();
}
