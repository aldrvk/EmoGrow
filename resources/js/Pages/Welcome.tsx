import { Head } from '@inertiajs/react';

export default function Welcome({ laravelVersion, phpVersion }: { laravelVersion: string, phpVersion: string }) {
    return (
        <div>
            <h1>Ini Otomatis Style H1 Anda</h1>
            <p>Ini otomatis menggunakan font Manrope ukuran 14px sesuai token body Anda.</p>
        </div>
    );
}
