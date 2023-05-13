package com.gemini.userservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RequestCompleteGeminiDto {

    private String username;

    private String imgUrl;

    private List<Long> tagIds;

    private Long seed;
}