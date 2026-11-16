package com.appzys.web.config;

import com.appzys.web.entity.CaseStudy;
import com.appzys.web.entity.Lead;
import com.appzys.web.entity.User;
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

    public DataSeeder(
            CaseStudyRepository caseStudyRepository,
            UserRepository userRepository,
            LeadRepository leadRepository
    ) {
        this.caseStudyRepository = caseStudyRepository;
        this.userRepository = userRepository;
        this.leadRepository = leadRepository;
    }

    @Override
    public void run(String... args) {
        seedAdminUser();
        seedInitialLeads();

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

    private void seedIfMissing(String slug, java.util.function.Supplier<CaseStudy> supplier) {
        if (caseStudyRepository.findBySlug(slug).isEmpty()) {
            caseStudyRepository.save(supplier.get());
        }
    }
}
