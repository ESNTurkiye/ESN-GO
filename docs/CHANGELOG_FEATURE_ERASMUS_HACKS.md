# Erasmus Hacks & Navigation Feature Changelog

**Date:** January 4, 2026
**Branch:** `feature/erasmus-hacks-complete` (Renamed from `fix/faq-responsive-layout` to reflect expanded scope)
**Commit:** `a49cb11`

## 1. FAQ & Erasmus Hacks Section Improvements
The FAQ section (now identified as "Erasmus Hacks") has been overhauled for better usability and interactivity.

*   **Accordion Behavior:** 
    *   Modified `src/components/sections/FAQSection.tsx`.
    *   **Change:** Logic updated so that at least one card always remains open. Clicking a new card closes the previously opened one.
*   **"Read Guide" Feature:**
    *   Modified `src/components/sections/faq/FAQOpenState.tsx`.
    *   **Change:** Added a "Read Guide" button inside the open state of FAQ cards.
    *   **Behavior:** Clicking this button instantly navigates (without smooth scroll) to the detailed guide page for that specific category.

## 2. New Guide Pages (Dynamic Routing)
A new dynamic page structure was created to display detailed content for each Erasmus Hack category.

*   **Page Structure:** Created `src/app/guide/[category]/page.tsx`.
    *   Uses Next.js dynamic routing to handle categories like `/guide/accommodation`, `/guide/banking`, etc.
    *   **Layout:** Created `src/app/guide/layout.tsx` to ensure the Header remains consistent and fixed across guide pages.
*   **Data Management:** Created `src/app/guide/data.ts`.
    *   Centralized data store for all guide content.
    *   **i18n Support:** Data structure updated to support both English (`en`) and Turkish (`tr`) content natively.
*   **Internationalization:**
    *   The guide pages are now client components that listen to the `LanguageContext`.
    *   Content (Titles, Descriptions, Problems/Solutions) automatically switches based on the selected language.

## 3. Navigation & Menu Updates
The navigation system was updated to support the new section and ensure deep-linking works correctly from sub-pages.

*   **Header & Mobile Menu:**
    *   Added "Erasmus Hacks" to the navigation list in `src/components/layout/header/constants.ts` and `MobileMenu.tsx`.
    *   **Deep Linking Fix:** Updated all navigation links (Destinations, Events, Transport) from simple anchors (`#id`) to absolute paths (`/#id`). This ensures links work even when clicked from a Guide page.
*   **Mobile Menu Behavior:**
    *   "Home" button now smoothly scrolls to the top of the page.
    *   Clicking a link in the mobile menu closes the menu and navigates/scrolls to the target.

## 4. UX & Scroll Behavior Refinements
Specific interactions were tuned to feel snappier and more intuitive.

*   **Instant Navigation (No-Scroll):**
    *   Created `src/components/ui/BackToHomeLink.tsx`.
    *   **Scenario:** When clicking "Back to home" from a guide page, or "Read Guide" from the home page.
    *   **Implementation:** Temporarily disables global `scroll-behavior: smooth` to allow an instant jump to the specific section, preventing the "long scroll" animation effect.

## 5. Localization (i18n)
*   Updated `src/i18n/locales/en.json` and `tr.json`.
*   Added translations for "Erasmus Hacks" (TR: Erasmus İpuçları) and related UI elements.

## Summary of Files Created/Modified
*   `src/app/guide/[category]/page.tsx` (New)
*   `src/app/guide/data.ts` (New)
*   `src/app/guide/layout.tsx` (New)
*   `src/components/ui/BackToHomeLink.tsx` (New)
*   `src/components/sections/FAQSection.tsx`
*   `src/components/sections/faq/FAQItem.tsx`
*   `src/components/sections/faq/FAQOpenState.tsx`
*   `src/components/layout/MobileMenu.tsx`
*   `src/components/layout/header/constants.ts`
*   `src/i18n/locales/en.json`
*   `src/i18n/locales/tr.json`
