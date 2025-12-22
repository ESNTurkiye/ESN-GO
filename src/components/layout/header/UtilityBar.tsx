'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '../../ui/Button';
import { SearchIcon, LanguageIcon } from './icons';
import { useLanguage } from '@/contexts/LanguageContext';

const LANGUAGES = [
    { code: 'en' as const, label: 'EN', fullName: 'English' },
    { code: 'tr' as const, label: 'TR', fullName: 'Türkçe' },
];

export const UtilityBar = () => {
    const [languageOpen, setLanguageOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setLanguageOpen(false);
            }
        };

        if (languageOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [languageOpen]);

    const handleLanguageChange = (langCode: 'en' | 'tr') => {
        setLanguage(langCode);
        setLanguageOpen(false);
    };

    return (
        <div className="hidden md:flex items-center space-x-6">
            <Button
                variant="icon"
                size="md"
                aria-label="Search destinations and events"
                className="text-white hover:text-esn-cyan"
            >
                <SearchIcon />
            </Button>
            
            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setLanguageOpen(!languageOpen)}
                    aria-label="Change language"
                    aria-expanded={languageOpen}
                    className="flex items-center gap-2 text-white hover:text-esn-cyan transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-lg px-2 py-1"
                >
                    <LanguageIcon />
                    <span className="font-oswald font-bold text-sm">
                        {language.toUpperCase()}
                    </span>
                </button>

                {/* Dropdown */}
                {languageOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`w-full text-left px-4 py-3 transition-colors ${
                                    language === lang.code
                                        ? 'bg-esn-cyan text-white font-bold'
                                        : 'text-esn-dark-blue hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-lato">{lang.fullName}</span>
                                    <span className="font-oswald font-bold text-sm">
                                        {lang.label}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <Button size="sm" variant="cyan" aria-label="Get your ESNcard for student discounts">
                Get ESNcard
            </Button>
        </div>
    );
};