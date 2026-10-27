"use client";

import { BackToTop } from "./footer/BackToTop";
import { ESNColorLine } from "./footer/ESNColorLine";
import { FooterNavigation } from "./footer/FooterNavigation";
import { LegalLinks } from "./footer/LegalLinks";
import { LogoBranding } from "./footer/LogoBranding";
import { NewsletterSection } from "./footer/NewsletterSection";
import { SocialMediaBar } from "./footer/SocialMediaBar";

export default function Footer() {
    return (
        <footer className="relative bg-[#2E2E2E] text-white" role="contentinfo">
            <div className="relative pt-12 sm:pt-16 pb-8">
                <div className="max-w-7xl mx-auto container-responsive">
                    <NewsletterSection />
                    <FooterNavigation />
                    <BackToTop />

                    <div className="pt-6 sm:pt-8 border-t border-white/10">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-6">
                            <LogoBranding />
                            <SocialMediaBar />
                        </div>
                        <LegalLinks />
                    </div>
                </div>
            </div>

            <ESNColorLine />
        </footer>
    );
}
