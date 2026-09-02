/**
 * Shared content type definitions for EmoGrow.
 * 
 * Single source of truth for content types used across
 * Aktivitas, Edukasi, and Dashboard pages.
 */

/** Content type for Aktivitas (intervention sessions) */
export type ActivityContentType = 'video' | 'article' | 'exercise';

/** Content type for Edukasi (learning modules) */
export type EducationContentType = 'video' | 'artikel' | 'infografik' | 'kuis';

/**
 * Maps an ActivityContentType to a human-readable Indonesian label.
 */
export function getActivityTypeLabel(type: ActivityContentType): string {
    switch (type) {
        case 'video': return 'Video Panduan';
        case 'article': return 'Panduan Bacaan';
        case 'exercise': return 'Latihan Praktik';
    }
}

/**
 * Maps an ActivityContentType to the appropriate CTA button label.
 */
export function getActivityCTALabel(type: ActivityContentType): string {
    switch (type) {
        case 'video': return 'Mulai Sesi';
        case 'article': return 'Baca Panduan';
        case 'exercise': return 'Mulai Latihan';
    }
}
