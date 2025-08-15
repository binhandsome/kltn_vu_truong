package com.kltnbe.recommendservice.services;

import com.kltnbe.recommendservice.dtos.req.SearchDtos;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;

@Service
public class ImageSearchService {

    private final WebClient fastApiClient;

    public ImageSearchService(WebClient fastApiClient) {
        this.fastApiClient = fastApiClient;
    }

    public SearchDtos.SearchResponse searchByImage(MultipartFile file, String userId, int topk) throws IOException {
        byte[] bytes = file.getBytes();
        ByteArrayResource resource = new ByteArrayResource(bytes) {
            @Override public String getFilename() {
                return file.getOriginalFilename() != null ? file.getOriginalFilename() : "upload.jpg";
            }
        };
        MultipartBodyBuilder mb = new MultipartBodyBuilder();
        mb.part("file", resource)
                .filename(resource.getFilename())
                .contentType(file.getContentType() != null
                        ? MediaType.parseMediaType(file.getContentType())
                        : MediaType.IMAGE_JPEG);
        Mono<SearchDtos.SearchResponse> mono = fastApiClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/search_image")
                        .queryParam("topk", topk)
                        .queryParam("user_id", userId)
                        .build())
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(mb.build()))
                .retrieve()
                .bodyToMono(SearchDtos.SearchResponse.class);
        return mono.block();
    }}