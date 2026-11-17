package com.appzys.web.controller;

import com.appzys.web.dto.ApiResponse;
import com.appzys.web.entity.BlogPost;
import com.appzys.web.repository.BlogPostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/blogs")
public class BlogController {

    private final BlogPostRepository blogPostRepository;

    public BlogController(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BlogPost>>> getPublishedBlogs() {
        List<BlogPost> blogs = blogPostRepository.findByPublishedTrueOrderByCreatedAtDesc();
        return ResponseEntity.ok(ApiResponse.ok("Published blogs loaded successfully", blogs));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<BlogPost>> getBlogBySlug(@PathVariable String slug) {
        Optional<BlogPost> blogOpt = blogPostRepository.findBySlug(slug);
        if (blogOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Article not found with slug: " + slug));
        }
        return ResponseEntity.ok(ApiResponse.ok("Article loaded successfully", blogOpt.get()));
    }
}
