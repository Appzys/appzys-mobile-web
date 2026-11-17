package com.appzys.web.controller;

import com.appzys.web.dto.ApiResponse;
import com.appzys.web.entity.BlogPost;
import com.appzys.web.entity.CaseStudy;
import com.appzys.web.entity.CostEstimate;
import com.appzys.web.entity.Lead;
import com.appzys.web.repository.BlogPostRepository;
import com.appzys.web.repository.CaseStudyRepository;
import com.appzys.web.repository.CostEstimateRepository;
import com.appzys.web.repository.LeadRepository;
import com.appzys.web.util.JwtUtil;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final LeadRepository leadRepository;
    private final CostEstimateRepository costEstimateRepository;
    private final BlogPostRepository blogPostRepository;
    private final CaseStudyRepository caseStudyRepository;
    private final JwtUtil jwtUtil;

    public AdminController(
            LeadRepository leadRepository,
            CostEstimateRepository costEstimateRepository,
            BlogPostRepository blogPostRepository,
            CaseStudyRepository caseStudyRepository,
            JwtUtil jwtUtil
    ) {
        this.leadRepository = leadRepository;
        this.costEstimateRepository = costEstimateRepository;
        this.blogPostRepository = blogPostRepository;
        this.caseStudyRepository = caseStudyRepository;
        this.jwtUtil = jwtUtil;
    }

    private boolean isAuthorized(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return false;
        }
        String token = authHeader.substring(7);
        return jwtUtil.validateToken(token);
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getDashboardStats(
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }

        List<Lead> leads = leadRepository.findAll();
        List<CostEstimate> estimates = costEstimateRepository.findAll();

        long totalLeads = leads.size();
        long newLeads = leads.stream().filter(l -> "NEW".equalsIgnoreCase(l.getStatus())).count();
        long contactedLeads = leads.stream().filter(l -> "CONTACTED".equalsIgnoreCase(l.getStatus())).count();
        long proposalLeads = leads.stream().filter(l -> "PROPOSAL_SENT".equalsIgnoreCase(l.getStatus())).count();
        long wonLeads = leads.stream().filter(l -> "WON".equalsIgnoreCase(l.getStatus())).count();

        int totalPipelineValue = estimates.stream().mapToInt(CostEstimate::getMaxBudget).sum();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalLeads", totalLeads);
        stats.put("newLeads", newLeads);
        stats.put("contactedLeads", contactedLeads);
        stats.put("proposalLeads", proposalLeads);
        stats.put("wonLeads", wonLeads);
        stats.put("totalEstimates", estimates.size());
        stats.put("totalBlogs", blogPostRepository.count());
        stats.put("totalCaseStudies", caseStudyRepository.count());
        stats.put("pipelineValue", totalPipelineValue > 0 ? totalPipelineValue : 185000);

        return ResponseEntity.ok(ApiResponse.ok("Admin stats loaded", stats));
    }

    @GetMapping("/leads")
    public ResponseEntity<?> listLeads(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }

        List<Lead> all = leadRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));

        List<Lead> filtered = all.stream().filter(l -> {
            boolean matchesStatus = (status == null || status.isBlank() || "ALL".equalsIgnoreCase(status))
                    || status.equalsIgnoreCase(l.getStatus());
            boolean matchesSearch = (search == null || search.isBlank())
                    || (l.getName() != null && l.getName().toLowerCase().contains(search.toLowerCase()))
                    || (l.getEmail() != null && l.getEmail().toLowerCase().contains(search.toLowerCase()))
                    || (l.getCompany() != null && l.getCompany().toLowerCase().contains(search.toLowerCase()))
                    || (l.getMessage() != null && l.getMessage().toLowerCase().contains(search.toLowerCase()));
            return matchesStatus && matchesSearch;
        }).toList();

        return ResponseEntity.ok(ApiResponse.ok("Client leads loaded", filtered));
    }

    @PatchMapping("/leads/{id}/status")
    public ResponseEntity<?> updateLeadStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }

        Optional<Lead> leadOpt = leadRepository.findById(id);
        if (leadOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Lead not found with id: " + id));
        }

        String newStatus = payload.get("status");
        if (newStatus == null || newStatus.isBlank()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("status field is required"));
        }

        Lead lead = leadOpt.get();
        lead.setStatus(newStatus.toUpperCase());
        Lead saved = leadRepository.save(lead);

        return ResponseEntity.ok(ApiResponse.ok("Lead status updated to " + newStatus, saved));
    }

    @PatchMapping("/leads/{id}/notes")
    public ResponseEntity<?> updateLeadNotes(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }

        Optional<Lead> leadOpt = leadRepository.findById(id);
        if (leadOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Lead not found with id: " + id));
        }

        String notes = payload.get("internalNotes");
        Lead lead = leadOpt.get();
        lead.setInternalNotes(notes);
        Lead saved = leadRepository.save(lead);

        return ResponseEntity.ok(ApiResponse.ok("Lead internal notes saved", saved));
    }

    @GetMapping("/estimates")
    public ResponseEntity<?> listEstimates(
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }

        List<CostEstimate> all = costEstimateRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        return ResponseEntity.ok(ApiResponse.ok("Cost estimates loaded", all));
    }

    // ==========================================
    // DAY 12: BLOG POSTS ADMIN CRUD APIs
    // ==========================================

    @GetMapping("/blogs")
    public ResponseEntity<?> listAllBlogs(
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }
        List<BlogPost> blogs = blogPostRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(ApiResponse.ok("All blog posts loaded", blogs));
    }

    @PostMapping("/blogs")
    public ResponseEntity<?> createBlog(
            @RequestBody BlogPost blog,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }

        if (blog.getSlug() == null || blog.getSlug().isBlank()) {
            blog.setSlug(blog.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", ""));
        }
        BlogPost saved = blogPostRepository.save(blog);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Blog post published", saved));
    }

    @PutMapping("/blogs/{id}")
    public ResponseEntity<?> updateBlog(
            @PathVariable Long id,
            @RequestBody BlogPost updated,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }

        Optional<BlogPost> blogOpt = blogPostRepository.findById(id);
        if (blogOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("Blog post not found with id: " + id));
        }

        BlogPost existing = blogOpt.get();
        existing.setTitle(updated.getTitle());
        existing.setSlug(updated.getSlug());
        existing.setCategory(updated.getCategory());
        existing.setExcerpt(updated.getExcerpt());
        existing.setContentMarkdown(updated.getContentMarkdown());
        existing.setCoverImage(updated.getCoverImage());
        existing.setAuthor(updated.getAuthor());
        existing.setReadTime(updated.getReadTime());
        existing.setTagsCsv(updated.getTagsCsv());
        existing.setPublished(updated.isPublished());

        BlogPost saved = blogPostRepository.save(existing);
        return ResponseEntity.ok(ApiResponse.ok("Blog post updated successfully", saved));
    }

    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<?> deleteBlog(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }

        if (!blogPostRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("Blog post not found with id: " + id));
        }
        blogPostRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.ok("Blog post deleted successfully", Map.of("id", id)));
    }

    // ==========================================
    // DAY 12: CASE STUDIES ADMIN CRUD APIs
    // ==========================================

    @GetMapping("/case-studies")
    public ResponseEntity<?> listAllCaseStudies(
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }
        List<CaseStudy> studies = caseStudyRepository.findAll();
        return ResponseEntity.ok(ApiResponse.ok("All case studies loaded", studies));
    }

    @PostMapping("/case-studies")
    public ResponseEntity<?> createCaseStudy(
            @RequestBody CaseStudy study,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }

        if (study.getSlug() == null || study.getSlug().isBlank()) {
            study.setSlug(study.getAppName().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", ""));
        }
        CaseStudy saved = caseStudyRepository.save(study);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("New client case study published", saved));
    }

    @PutMapping("/case-studies/{id}")
    public ResponseEntity<?> updateCaseStudy(
            @PathVariable Long id,
            @RequestBody CaseStudy updated,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }

        Optional<CaseStudy> studyOpt = caseStudyRepository.findById(id);
        if (studyOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("Case study not found with id: " + id));
        }

        CaseStudy existing = studyOpt.get();
        existing.setAppName(updated.getAppName());
        existing.setSlug(updated.getSlug());
        existing.setCategory(updated.getCategory());
        existing.setInstallsLabel(updated.getInstallsLabel());
        existing.setRating(updated.getRating());
        existing.setSummary(updated.getSummary());
        existing.setChallenge(updated.getChallenge());
        existing.setSolution(updated.getSolution());
        existing.setTechStackCsv(updated.getTechStackCsv());
        existing.setFeatured(updated.isFeatured());

        CaseStudy saved = caseStudyRepository.save(existing);
        return ResponseEntity.ok(ApiResponse.ok("Case study updated successfully", saved));
    }

    @DeleteMapping("/case-studies/{id}")
    public ResponseEntity<?> deleteCaseStudy(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) {
        if (!isAuthorized(authHeader)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Unauthorized: Invalid or expired admin token"));
        }

        if (!caseStudyRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("Case study not found with id: " + id));
        }
        caseStudyRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.ok("Case study removed successfully", Map.of("id", id)));
    }
}
