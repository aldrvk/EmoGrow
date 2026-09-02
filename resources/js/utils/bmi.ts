/**
 * BMI & Nutritional Status Utilities for EmoGROW (Neobrutalism Standard)
 */

export interface BMIResult {
    bmi: number;
    status: 'Kurus' | 'Normal' | 'Beresiko Gizi Lebih' | 'Obesitas';
    label: string;
    variant: 'info' | 'success' | 'warning' | 'danger';
    badgeClass: string;
    bgClass: string;
    textClass: string;
}

export function computeBMI(weightKg: number | string, heightCm: number | string): number | null {
    const weight = typeof weightKg === 'string' ? parseFloat(weightKg) : weightKg;
    const height = typeof heightCm === 'string' ? parseFloat(heightCm) : heightCm;

    if (!weight || !height || weight <= 0 || height <= 0) {
        return null;
    }

    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    return parseFloat(bmi.toFixed(1));
}

export function getBMIStatus(bmi: number): 'Kurus' | 'Normal' | 'Beresiko Gizi Lebih' | 'Obesitas' {
    if (bmi < 14) return 'Kurus';
    if (bmi <= 18) return 'Normal';
    if (bmi <= 20) return 'Beresiko Gizi Lebih';
    return 'Obesitas';
}

export function getBMIResult(weightKg: number | string, heightCm: number | string): BMIResult | null {
    const bmi = computeBMI(weightKg, heightCm);
    if (bmi === null) return null;

    const status = getBMIStatus(bmi);
    return {
        bmi,
        status,
        label: status,
        ...getBMIStatusStyle(status),
    };
}

export function getBMIStatusStyle(status: string): {
    variant: 'info' | 'success' | 'warning' | 'danger';
    badgeClass: string;
    bgClass: string;
    textClass: string;
} {
    switch (status) {
        case 'Normal':
            return {
                variant: 'success',
                badgeClass: 'bg-success text-black border-2 border-black font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]',
                bgClass: 'bg-success',
                textClass: 'text-black',
            };
        case 'Kurus':
            return {
                variant: 'info',
                badgeClass: 'bg-info text-white border-2 border-black font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]',
                bgClass: 'bg-info',
                textClass: 'text-black',
            };
        case 'Beresiko Gizi Lebih':
            return {
                variant: 'warning',
                badgeClass: 'bg-warning text-black border-2 border-black font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]',
                bgClass: 'bg-warning',
                textClass: 'text-black',
            };
        case 'Obesitas':
        default:
            return {
                variant: 'danger',
                badgeClass: 'bg-danger text-white border-2 border-black font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]',
                bgClass: 'bg-danger',
                textClass: 'text-black',
            };
    }
}
