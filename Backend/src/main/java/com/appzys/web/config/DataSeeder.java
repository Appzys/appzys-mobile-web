package com.appzys.web.config;

import com.appzys.web.entity.BlogPost;
import com.appzys.web.entity.CaseStudy;
import com.appzys.web.entity.Lead;
import com.appzys.web.entity.User;
import com.appzys.web.repository.BlogPostRepository;
import com.appzys.web.repository.CaseStudyRepository;
import com.appzys.web.repository.LeadRepository;
import com.appzys.web.repository.UserRepository;
import com.appzys.web.util.PasswordUtil;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CaseStudyRepository caseStudyRepository;
    private final UserRepository userRepository;
    private final LeadRepository leadRepository;
    private final BlogPostRepository blogPostRepository;

    public DataSeeder(
            CaseStudyRepository caseStudyRepository,
            UserRepository userRepository,
            LeadRepository leadRepository,
            BlogPostRepository blogPostRepository
    ) {
        this.caseStudyRepository = caseStudyRepository;
        this.userRepository = userRepository;
        this.leadRepository = leadRepository;
        this.blogPostRepository = blogPostRepository;
    }

    @Override
    public void run(String... args) {
        seedAdminUser();
        seedInitialLeads();
        seedInitialBlogPosts();

        seedIfMissing("copy-text-on-screen", () -> {
            CaseStudy copyText = new CaseStudy();
            copyText.setSlug("copy-text-on-screen");
            copyText.setAppName("Copy Text On Screen");
            copyText.setCategory("OCR & Productivity Utility");
            copyText.setInstallsLabel("500K+ Google Play");
            copyText.setRating(4.6);
            copyText.setSummary("Extracts selectable text, phone numbers, emails, and URLs directly from screenshots and restricted app screens across 100+ languages.");
            copyText.setChallenge("Mobile users frequently need to copy text embedded inside images, social apps, or screenshots where native OS text selection is blocked.");
            copyText.setSolution("Engineered a fast, low-latency on-device & cloud OCR pipeline with smart entity detection (URLs, phones, emails) and instant multi-language translation.");
            copyText.setTechStackCsv("Android & iOS,OCR Extraction,Entity Detection,Multilingual Translation");
            copyText.setFeatured(true);
            return copyText;
        });

        seedIfMissing("ai-text-scanner", () -> {
            CaseStudy aiScanner = new CaseStudy();
            aiScanner.setSlug("ai-text-scanner");
            aiScanner.setAppName("AI Text Scanner: Image To Text");
            aiScanner.setCategory("Documents, OCR & AI Integration");
            aiScanner.setInstallsLabel("100K+ Google Play");
            aiScanner.setRating(4.6);
            aiScanner.setSummary("Converts physical documents, PDFs, and photos into clean editable digital text with AI summarization and instant export.");
            aiScanner.setChallenge("Standard mobile scanners struggle with skewed lighting, multi-column layouts, and noisy backgrounds on budget Android devices.");
            aiScanner.setSolution("Built automatic edge detection, perspective correction, and AI text post-processing to deliver accurate structured text exports in seconds.");
            aiScanner.setTechStackCsv("Flutter & Dart,Multilingual OCR,PDF & Image Import,AI Document Q&A");
            aiScanner.setFeatured(true);
            return aiScanner;
        });

        seedIfMissing("ai-transcript-audio-to-text", () -> {
            CaseStudy aiTranscript = new CaseStudy();
            aiTranscript.setSlug("ai-transcript-audio-to-text");
            aiTranscript.setAppName("AI Transcript: Audio to Text");
            aiTranscript.setCategory("Multilingual Audio & Applied AI");
            aiTranscript.setInstallsLabel("10K+ Google Play");
            aiTranscript.setRating(4.5);
            aiTranscript.setSummary("Complete mobile transcription workflow converting audio and video speech to text with AI summarization, translation, and interactive Q&A.");
            aiTranscript.setChallenge("Recordings of meetings, lessons, and conversations contain valuable information, but manual transcription and note-taking are slow and expensive.");
            aiTranscript.setSolution("Integrated mobile audio handling with speech recognition and downstream LLM processing with usage limits and export workflows.");
            aiTranscript.setTechStackCsv("Flutter & Dart,Speech-to-Text AI,AI Summarization,Cloud Functions");
            aiTranscript.setFeatured(true);
            return aiTranscript;
        });

        seedIfMissing("handwriting-to-text-scanner", () -> {
            CaseStudy handwriting = new CaseStudy();
            handwriting.setSlug("handwriting-to-text-scanner");
            handwriting.setAppName("Handwriting to Text Scanner");
            handwriting.setCategory("EdTech & Digitization Workflows");
            handwriting.setInstallsLabel("10K+ Google Play");
            handwriting.setRating(4.4);
            handwriting.setSummary("Transforms handwritten notes, classroom boards, and paper forms into searchable, editable digital notes across multiple languages.");
            handwriting.setChallenge("Cursive and uneven handwriting varies wildly across users, requiring specialized recognition models beyond standard printed OCR.");
            handwriting.setSolution("Combined adaptive image preprocessing with modern handwriting recognition models, batch scanning, and folder organization.");
            handwriting.setTechStackCsv("Android & iOS,Handwriting AI,Batch Scanning,Folder Organization");
            handwriting.setFeatured(true);
            return handwriting;
        });
    }

    private void seedAdminUser() {
        if (!userRepository.existsByUsername("admin@appzys.com")) {
            User admin = new User();
            admin.setUsername("admin@appzys.com");
            admin.setPassword(PasswordUtil.hash("AppzysAdmin2026!"));
            admin.setFullName("Appzys Studio Director");
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
        }
    }

    private void seedInitialLeads() {
        if (leadRepository.count() == 0) {
            Lead lead1 = new Lead();
            lead1.setName("Suresh Kumar");
            lead1.setEmail("suresh.kumar@medtechinnovate.com");
            lead1.setPhone("+91 98401 23456");
            lead1.setCompany("MedTech Innovate");
            lead1.setServiceType("02. AI Integration & Applications");
            lead1.setBudgetRange("$15,000 - $35,000");
            lead1.setMessage("Looking to build a Flutter medical assistant app with on-device document OCR and patient report summarization. Need 48-hr feasibility assessment.");
            lead1.setSourcePage("/contact");
            lead1.setStatus("NEW");
            lead1.setInternalNotes("Qualified B2B inquiry. Scheduled architecture discovery call for Wednesday 11am.");
            leadRepository.save(lead1);

            Lead lead2 = new Lead();
            lead2.setName("Sarah Jenkins");
            lead2.setEmail("sarah@eduvisionlabs.io");
            lead2.setPhone("+1 (415) 890-2341");
            lead2.setCompany("EduVision Labs");
            lead2.setServiceType("01. Mobile App Development (Flutter)");
            lead2.setBudgetRange("$35,000+");
            lead2.setMessage("We have an existing edtech web platform and need a high-performance cross-platform Flutter app for iOS and Android with offline caching.");
            lead2.setSourcePage("/services/mobile-app-development");
            lead2.setStatus("CONTACTED");
            lead2.setInternalNotes("Sent mutual NDA and shared Appzys TestFlight build demo. Client reviewing with product team.");
            leadRepository.save(lead2);
        }
    }

    private void seedInitialBlogPosts() {
        if (blogPostRepository.count() == 0) {
            BlogPost post1 = new BlogPost();
            post1.setTitle("How Much Does It Cost to Build a Production Mobile App in India? (2026 Real-World Guide)");
            post1.setSlug("cost-to-build-mobile-app-in-india-2026");
            post1.setCategory("Mobile App Costing");
            post1.setAuthor("Vimal, Lead Architect");
            post1.setReadTime("7 min read");
            post1.setTagsCsv("Mobile Cost, Flutter MVP, India Engineering, App Development");
            post1.setExcerpt("A transparent budget breakdown for non-technical founders: why $3,000 to $25,000 covers everything from initial clickable Figma prototypes to bi-weekly TestFlight drops and App Store approval.");
            post1.setContentMarkdown("""
# How Much Does It Cost to Build a Production Mobile App in India in 2026?

One of the first questions non-technical founders and CTOs ask is: **"How much will it actually cost to build and publish my mobile app to Google Play and the Apple App Store?"**

Too many agencies answer with either an unrealistic $1,500 quote that leads to broken code, or an inflated $80,000 enterprise pitch. In this guide, our senior engineering pod breaks down the exact realistic costs, timelines, and deliverables.

## 1. The 3 Core Mobile App Budget Tiers

| Tier | Typical Scope | Budget Range (USD) | Delivery Timeline |
|---|---|---|---|
| **Tier 1: Fixed Scope MVP** | 5–8 Core Screens, Auth, REST APIs, Basic Storage | $3,500 – $7,500 | 4 – 6 Weeks |
| **Tier 2: Production Flutter App** | Custom Ergonomics, Payments, Push, Offline DB | $8,000 – $18,000 | 6 – 10 Weeks |
| **Tier 3: AI & Computer Vision App** | On-Device OCR, Speech AI, Background Isolates | $15,000 – $32,000 | 8 – 14 Weeks |

## 2. Why Single-Codebase Flutter Saves 40% to 50%

Maintaining separate Swift (iOS) and Kotlin (Android) codebases requires two separate engineering teams, double the QA regression cycles, and duplicate bug fixes.

By adopting **Flutter & Dart**, our studio compiles directly to native ARM64 machine code:
- **1 Unified Codebase:** 100% shared business logic and UI screens.
- **Bi-Weekly TestFlight Drops:** Clients test real working builds on their physical phones from Sprint 1.
- **Zero Bridge Latency:** 60 to 120 FPS performance matching pure native.

## 3. How to Avoid Costly Agency Traps

1. **Demand 100% Client IP Ownership:** Never sign a contract where the agency retains copyright on your source code.
2. **Insist on Weekly TestFlight/Play Internal Drops:** Never wait months in the dark to see your app for the first time.
3. **Verify App Store Review Guarantees:** Ensure the contract includes free resubmissions if Apple or Google flags any metadata or permission guidelines.
""");
            post1.setPublished(true);
            blogPostRepository.save(post1);

            BlogPost post2 = new BlogPost();
            post2.setTitle("How to Build an On-Device OCR & Document Scanner in Flutter with Zero Server Bills");
            post2.setSlug("on-device-ocr-flutter-zero-server-costs");
            post2.setCategory("On-Device AI & OCR");
            post2.setAuthor("Appzys Senior Engineering Pod");
            post2.setReadTime("6 min read");
            post2.setTagsCsv("Flutter, On-Device AI, Google ML Kit, OCR, Privacy");
            post2.setExcerpt("Learn how we engineered Copy Text On Screen (500K+ downloads) and AI Text Scanner to process camera frames in sub-90ms locally on-device without paying third-party cloud API costs.");
            post2.setContentMarkdown("""
# How to Build an On-Device OCR & Document Scanner in Flutter with Zero Server Costs

Most mobile developers rely on Google Cloud Vision or OpenAI Vision APIs for document extraction. While fast to prototype, cloud vision introduces two fatal production bottlenecks:
1. **Network Lag:** Every scan takes 2.5 to 4.5 seconds to upload.
2. **Escalating Cloud Bills:** At $1.50 per 1,000 scans, a successful app with 100,000 users will bankrupt your margins.

Here is how Appzys engineers millisecond on-device computer vision.

## The Architecture: Dart Background Isolates + Google ML Kit

To maintain 60 FPS without camera viewfinder stutter, we offload image decoding to a background Dart isolate:
- **Camera Frame Streaming:** Capture YUV420 buffers directly from the camera preview.
- **Native Platform Channels:** Pass raw byte pointers to Google ML Kit on-device C++ binaries.
- **Zero Cloud Leaks:** User documents and private photos never leave the mobile device, satisfying HIPAA and GDPR privacy by default.
""");
            post2.setPublished(true);
            blogPostRepository.save(post2);
        }
    }

    private void seedIfMissing(String slug, java.util.function.Supplier<CaseStudy> supplier) {
        if (caseStudyRepository.findBySlug(slug).isEmpty()) {
            caseStudyRepository.save(supplier.get());
        }
    }
}
