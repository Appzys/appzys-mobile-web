package com.appzys.web.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import com.appzys.web.entity.Lead;

@Service
public class EmailNotificationService {

    private static final Logger log = LoggerFactory.getLogger(EmailNotificationService.class);

    private final JavaMailSender mailSender;

    @Value("${appzys.notify.email:appzys.dev@gmail.com}")
    private String notifyEmail;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    public EmailNotificationService(@Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendLeadAlert(Lead lead) {
        if (mailSender == null || notifyEmail == null || notifyEmail.isBlank()) {
            log.warn("Lead #{} was saved, but SMTP notification was skipped because email delivery is not configured.",
                    lead.getId());
            return;
        }

        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            if (fromEmail != null && !fromEmail.isBlank()) {
                msg.setFrom(fromEmail);
            }
            msg.setTo(notifyEmail);
            msg.setSubject("New Appzys Project Inquiry: " + lead.getName());
            msg.setText(String.format(
                    "New project inquiry received.%n%nLead ID: %s%nReceived (UTC): %s%nSource page: %s%n%nName: %s%nEmail: %s%nPhone / WhatsApp: %s%nCompany / Startup: %s%nProject focus: %s%nBudget range: %s%n%nProject details:%n%s",
                    lead.getId(),
                    lead.getCreatedAt(),
                    lead.getSourcePage() != null ? lead.getSourcePage() : "/contact",
                    lead.getName(),
                    lead.getEmail(),
                    lead.getPhone() != null ? lead.getPhone() : "-",
                    lead.getCompany() != null ? lead.getCompany() : "-",
                    lead.getServiceType() != null ? lead.getServiceType() : "-",
                    lead.getBudgetRange() != null ? lead.getBudgetRange() : "-",
                    lead.getMessage()
            ));
            mailSender.send(msg);
            log.info("Lead alert email sent for lead #{}.", lead.getId());
        } catch (Exception ex) {
            // Never fail a lead save if SMTP is temporarily unreachable
            log.warn("Failed to send lead alert email for lead #{}: {}", lead.getId(), ex.getMessage());
        }
    }
}
