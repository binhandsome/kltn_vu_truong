package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.clients.RecommendServiceProxy;
import com.kltnbe.adminservice.clients.SellerServiceClient;
import com.kltnbe.adminservice.dtos.ExportMetaReponse;
import com.kltnbe.adminservice.dtos.RunBuildOfflineRequest;
import com.kltnbe.adminservice.entities.SaveHistoryActionRecommend;
import com.kltnbe.adminservice.repositories.AdminSaveHistoryActionRecommendRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminSaveHistoryActionRecommendServiceImpl implements AdminSaveHistoryActionRecommendService{
    private final SellerServiceClient  sellerServiceClient;
    private final AdminSaveHistoryActionRecommendRepository  adminSaveHistoryActionRecommendRepository;
    private final RecommendServiceProxy   recommendServiceProxy;

    @Override
    public String exportMeta() {
        ExportMetaReponse exportMetaReponse = recommendServiceProxy.exportMeta().getBody();
        if (exportMetaReponse != null && exportMetaReponse.getStatus().equals("ok")) {
            SaveHistoryActionRecommend saveHistoryActionRecommend = new SaveHistoryActionRecommend();

            // Chuẩn hoá file path: đổi \ thành /
            String normalizedPath = exportMetaReponse.getFile().replace("\\", "/");
            saveHistoryActionRecommend.setFileSave(normalizedPath);

            saveHistoryActionRecommend.setStep(1);
            adminSaveHistoryActionRecommendRepository.save(saveHistoryActionRecommend);
            return "Thành Công";
        }
        return "Thất Bại";
    }


    @Override
    public String runBuildOffline(RunBuildOfflineRequest runBuildOfflineRequest) {
        String status = recommendServiceProxy.runBuildOffline(runBuildOfflineRequest).getBody();
        if (status.equals("success")) {
            SaveHistoryActionRecommend saveHistoryActionRecommend = adminSaveHistoryActionRecommendRepository.findByFileSave(runBuildOfflineRequest.getMeta_path());
            if (saveHistoryActionRecommend != null) {
                saveHistoryActionRecommend.setStep(2);
                saveHistoryActionRecommend.setTopK(runBuildOfflineRequest.getTopk());
                adminSaveHistoryActionRecommendRepository.save(saveHistoryActionRecommend);
                return "Thành Công";
            }
        }
        return "Thất Bại";
    }

    @Override
    public String importRecommendations(String fileSave) {
        String status = recommendServiceProxy.importRecommendations().getBody();
        if (status.equals("success")) {
            SaveHistoryActionRecommend saveHistoryActionRecommend = adminSaveHistoryActionRecommendRepository.findByFileSave(fileSave);
            if (saveHistoryActionRecommend != null) {
                saveHistoryActionRecommend.setStep(3);
                adminSaveHistoryActionRecommendRepository.save(saveHistoryActionRecommend);
                return "Thành Công";
            }

        }
        return "Thất Bại";
    }

    @Override
    public List<SaveHistoryActionRecommend> findAllByOrderByCreatedAtDesc() {
        return adminSaveHistoryActionRecommendRepository.findAllByOrderByCreatedAtDesc();
    }

}
