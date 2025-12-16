import { TestDefinition } from "@/types/test"

// CARAS-R: Test de Percepción de Diferencias - Revisado
// Autores: L.L. Thurstone y M. Yela (TEA Ediciones, 2012)

// Baremos España por curso escolar
export const baremosEspana = {
    "1_primaria": { // 6-7 años
        aciertos: { media: 18.93, dt: 6.03 },
        aciertosNetos: { media: 12.90, dt: 8.01 },
        ici: { media: 80, dt: 26 },
        percentiles: {
            99: { a: 35, ae: 34, ici: 100 },
            95: { a: 30, ae: 28, ici: 100 },
            90: { a: 28, ae: 25, ici: 100 },
            85: { a: 26, ae: 23, ici: 100 },
            80: { a: 24, ae: 21, ici: 100 },
            75: { a: 23, ae: 19, ici: 100 },
            70: { a: 22, ae: 18, ici: 100 },
            65: { a: 21, ae: 17, ici: 100 },
            60: { a: 20, ae: 16, ici: 94 },
            50: { a: 18, ae: 13, ici: 92 },
            40: { a: 16, ae: 10, ici: 88 },
            30: { a: 14, ae: 8, ici: 82 },
            25: { a: 13, ae: 6, ici: 78 },
            20: { a: 12, ae: 5, ici: 71 },
            15: { a: 11, ae: 4, ici: 64 },
            10: { a: 9, ae: 2, ici: 50 },
            5: { a: 7, ae: 0, ici: 32 },
            1: { a: 4, ae: -3, ici: 0 }
        }
    },
    "2_primaria": { // 7-8 años
        aciertos: { media: 21.74, dt: 7.25 },
        aciertosNetos: { media: 18.83, dt: 10.33 },
        ici: { media: 84, dt: 21 },
        percentiles: {
            99: { a: 41, ae: 38, ici: 100 },
            95: { a: 35, ae: 35, ici: 100 },
            90: { a: 32, ae: 30, ici: 94 },
            85: { a: 29, ae: 28, ici: 92 },
            80: { a: 27, ae: 25, ici: 90 },
            75: { a: 26, ae: 24, ici: 89 },
            70: { a: 24, ae: 22, ici: 87 },
            65: { a: 23, ae: 21, ici: 86 },
            60: { a: 22, ae: 20, ici: 85 },
            50: { a: 20, ae: 17, ici: 82 },
            40: { a: 18, ae: 15, ici: 79 },
            30: { a: 16, ae: 13, ici: 75 },
            25: { a: 15, ae: 11, ici: 71 },
            20: { a: 13, ae: 8, ici: 65 },
            15: { a: 11, ae: 5, ici: 56 },
            10: { a: 9, ae: 2, ici: 45 },
            5: { a: 7, ae: 0, ici: 32 },
            1: { a: 4, ae: -3, ici: 0 }
        }
    },
    "3_primaria": { // 8-9 años
        aciertos: { media: 28.57, dt: 7.81 },
        aciertosNetos: { media: 27.16, dt: 8.08 },
        ici: { media: 92, dt: 15 },
        percentiles: {
            99: { a: 47, ae: 47, ici: 100 },
            95: { a: 43, ae: 43, ici: 100 },
            90: { a: 40, ae: 40, ici: 96 },
            85: { a: 37, ae: 38, ici: 95 },
            80: { a: 35, ae: 35, ici: 94 },
            75: { a: 33, ae: 33, ici: 93 },
            70: { a: 32, ae: 31, ici: 92 },
            65: { a: 31, ae: 30, ici: 92 },
            60: { a: 29, ae: 28, ici: 91 },
            50: { a: 27, ae: 26, ici: 90 },
            40: { a: 25, ae: 24, ici: 88 },
            30: { a: 23, ae: 21, ici: 84 },
            25: { a: 21, ae: 18, ici: 80 },
            20: { a: 18, ae: 15, ici: 75 },
            15: { a: 15, ae: 13, ici: 68 },
            10: { a: 12, ae: 10, ici: 57 },
            5: { a: 8, ae: 6, ici: 42 },
            1: { a: 4, ae: 0, ici: 27 }
        }
    },
    "4_primaria": { // 9-10 años
        aciertos: { media: 32.99, dt: 8.43 },
        aciertosNetos: { media: 31.76, dt: 9.16 },
        ici: { media: 93, dt: 14 },
        percentiles: {
            99: { a: 53, ae: 52, ici: 100 },
            95: { a: 48, ae: 48, ici: 100 },
            90: { a: 44, ae: 43, ici: 98 },
            85: { a: 42, ae: 40, ici: 96 },
            80: { a: 40, ae: 38, ici: 95 },
            75: { a: 38, ae: 37, ici: 94 },
            70: { a: 37, ae: 35, ici: 93 },
            65: { a: 35, ae: 34, ici: 92 },
            60: { a: 34, ae: 33, ici: 91 },
            50: { a: 32, ae: 30, ici: 90 },
            40: { a: 29, ae: 28, ici: 88 },
            30: { a: 27, ae: 25, ici: 85 },
            25: { a: 25, ae: 23, ici: 82 },
            20: { a: 23, ae: 21, ici: 76 },
            15: { a: 20, ae: 17, ici: 69 },
            10: { a: 17, ae: 14, ici: 59 },
            5: { a: 12, ae: 8, ici: 43 },
            1: { a: 6, ae: 0, ici: 30 }
        }
    },
    "5_primaria": { // 10-11 años
        aciertos: { media: 35.37, dt: 8.77 },
        aciertosNetos: { media: 34.46, dt: 9.38 },
        ici: { media: 95, dt: 12 },
        percentiles: {
            99: { a: 58, ae: 55, ici: 100 },
            95: { a: 51, ae: 50, ici: 100 },
            90: { a: 47, ae: 47, ici: 98 },
            85: { a: 45, ae: 44, ici: 97 },
            80: { a: 42, ae: 42, ici: 96 },
            75: { a: 40, ae: 40, ici: 95 },
            70: { a: 39, ae: 38, ici: 94 },
            65: { a: 37, ae: 37, ici: 93 },
            60: { a: 36, ae: 35, ici: 92 },
            50: { a: 34, ae: 33, ici: 91 },
            40: { a: 32, ae: 31, ici: 89 },
            30: { a: 29, ae: 28, ici: 86 },
            25: { a: 27, ae: 25, ici: 82 },
            20: { a: 25, ae: 22, ici: 78 },
            15: { a: 21, ae: 18, ici: 69 },
            10: { a: 18, ae: 14, ici: 56 },
            5: { a: 13, ae: 8, ici: 38 },
            1: { a: 7, ae: 0, ici: 17 }
        }
    },
    "6_primaria": { // 11-12 años
        aciertos: { media: 34.95, dt: 11.22 },
        aciertosNetos: { media: 33.68, dt: 11.87 },
        ici: { media: 92, dt: 16 },
        percentiles: {
            99: { a: 60, ae: 58, ici: 100 },
            95: { a: 51, ae: 50, ici: 100 },
            90: { a: 46, ae: 46, ici: 98 },
            85: { a: 44, ae: 42, ici: 96 },
            80: { a: 40, ae: 40, ici: 95 },
            75: { a: 38, ae: 37, ici: 94 },
            70: { a: 36, ae: 36, ici: 93 },
            65: { a: 35, ae: 34, ici: 92 },
            60: { a: 34, ae: 32, ici: 91 },
            50: { a: 31, ae: 30, ici: 89 },
            40: { a: 28, ae: 27, ici: 86 },
            30: { a: 26, ae: 24, ici: 81 },
            25: { a: 24, ae: 22, ici: 77 },
            20: { a: 21, ae: 18, ici: 70 },
            15: { a: 18, ae: 15, ici: 62 },
            10: { a: 14, ae: 11, ici: 51 },
            5: { a: 9, ae: 5, ici: 34 },
            1: { a: 4, ae: 0, ici: 17 }
        }
    },
    "1_eso": { // 12-13 años
        aciertos: { media: 40.90, dt: 10.07 },
        aciertosNetos: { media: 35.28, dt: 10.81 },
        ici: { media: 83, dt: 12 },
        percentiles: {
            99: { a: 60, ae: 60, ici: 100 },
            95: { a: 56, ae: 56, ici: 98 },
            90: { a: 51, ae: 51, ici: 96 },
            85: { a: 48, ae: 46, ici: 95 },
            80: { a: 45, ae: 44, ici: 94 },
            75: { a: 43, ae: 42, ici: 93 },
            70: { a: 42, ae: 40, ici: 92 },
            65: { a: 40, ae: 39, ici: 91 },
            60: { a: 38, ae: 37, ici: 90 },
            50: { a: 35, ae: 34, ici: 88 },
            40: { a: 32, ae: 30, ici: 85 },
            30: { a: 29, ae: 27, ici: 81 },
            25: { a: 27, ae: 23, ici: 77 },
            20: { a: 25, ae: 20, ici: 72 },
            15: { a: 21, ae: 17, ici: 65 },
            10: { a: 18, ae: 14, ici: 57 },
            5: { a: 15, ae: 9, ici: 42 },
            1: { a: 8, ae: 0, ici: 20 }
        }
    },
    "2_eso": { // 13-14 años
        aciertos: { media: 40.68, dt: 10.03 },
        aciertosNetos: { media: 38.36, dt: 10.78 },
        ici: { media: 93, dt: 12 },
        percentiles: {
            99: { a: 60, ae: 59, ici: 100 },
            95: { a: 56, ae: 56, ici: 100 },
            90: { a: 53, ae: 52, ici: 97 },
            85: { a: 48, ae: 48, ici: 96 },
            80: { a: 46, ae: 46, ici: 95 },
            75: { a: 44, ae: 44, ici: 94 },
            70: { a: 43, ae: 42, ici: 93 },
            65: { a: 41, ae: 40, ici: 92 },
            60: { a: 39, ae: 38, ici: 91 },
            50: { a: 37, ae: 35, ici: 89 },
            40: { a: 34, ae: 33, ici: 86 },
            30: { a: 31, ae: 28, ici: 82 },
            25: { a: 28, ae: 25, ici: 78 },
            20: { a: 24, ae: 21, ici: 72 },
            15: { a: 21, ae: 18, ici: 65 },
            10: { a: 18, ae: 14, ici: 55 },
            5: { a: 13, ae: 8, ici: 40 },
            1: { a: 7, ae: 0, ici: 19 }
        }
    },
    "3_eso": { // 14-15 años
        aciertos: { media: 40.90, dt: 10.12 },
        aciertosNetos: { media: 39.48, dt: 10.28 },
        ici: { media: 96, dt: 9 },
        percentiles: {
            99: { a: 60, ae: 60, ici: 100 },
            95: { a: 56, ae: 55, ici: 100 },
            90: { a: 54, ae: 53, ici: 100 },
            85: { a: 51, ae: 50, ici: 97 },
            80: { a: 47, ae: 47, ici: 96 },
            75: { a: 45, ae: 45, ici: 95 },
            70: { a: 44, ae: 43, ici: 94 },
            65: { a: 42, ae: 41, ici: 93 },
            60: { a: 40, ae: 40, ici: 92 },
            50: { a: 38, ae: 37, ici: 91 },
            40: { a: 35, ae: 34, ici: 88 },
            30: { a: 31, ae: 30, ici: 84 },
            25: { a: 28, ae: 27, ici: 80 },
            20: { a: 25, ae: 24, ici: 75 },
            15: { a: 21, ae: 21, ici: 70 },
            10: { a: 17, ae: 17, ici: 61 },
            5: { a: 11, ae: 10, ici: 46 },
            1: { a: 5, ae: 3, ici: 27 }
        }
    },
    "4_eso": { // 15-16 años
        aciertos: { media: 45.06, dt: 9.41 },
        aciertosNetos: { media: 44.55, dt: 9.50 },
        ici: { media: 96, dt: 9 },
        percentiles: {
            99: { a: 60, ae: 60, ici: 100 },
            95: { a: 57, ae: 57, ici: 100 },
            90: { a: 55, ae: 54, ici: 98 },
            85: { a: 53, ae: 53, ici: 97 },
            80: { a: 51, ae: 50, ici: 96 },
            75: { a: 49, ae: 48, ici: 95 },
            70: { a: 47, ae: 46, ici: 94 },
            65: { a: 46, ae: 45, ici: 93 },
            60: { a: 44, ae: 43, ici: 92 },
            50: { a: 41, ae: 40, ici: 91 },
            40: { a: 37, ae: 37, ici: 88 },
            30: { a: 33, ae: 32, ici: 84 },
            25: { a: 30, ae: 28, ici: 80 },
            20: { a: 27, ae: 25, ici: 75 },
            15: { a: 24, ae: 23, ici: 70 },
            10: { a: 20, ae: 17, ici: 62 },
            5: { a: 14, ae: 10, ici: 50 },
            1: { a: 8, ae: 3, ici: 33 }
        }
    },
    "bachillerato": { // 16-18 años
        aciertos: { media: 48.83, dt: 8.41 },
        aciertosNetos: { media: 47.78, dt: 9.18 },
        ici: { media: 96, dt: 8 },
        percentiles: {
            99: { a: 60, ae: 60, ici: 100 },
            95: { a: 59, ae: 59, ici: 100 },
            90: { a: 57, ae: 56, ici: 100 },
            85: { a: 55, ae: 54, ici: 98 },
            80: { a: 53, ae: 52, ici: 97 },
            75: { a: 51, ae: 50, ici: 96 },
            70: { a: 49, ae: 48, ici: 95 },
            65: { a: 48, ae: 47, ici: 94 },
            60: { a: 46, ae: 45, ici: 93 },
            50: { a: 44, ae: 43, ici: 91 },
            40: { a: 42, ae: 40, ici: 88 },
            30: { a: 40, ae: 37, ici: 85 },
            25: { a: 37, ae: 34, ici: 81 },
            20: { a: 34, ae: 31, ici: 77 },
            15: { a: 31, ae: 28, ici: 70 },
            10: { a: 27, ae: 24, ici: 62 },
            5: { a: 22, ae: 17, ici: 50 },
            1: { a: 14, ae: 8, ici: 33 }
        }
    }
}

// Baremos Argentina por grado
export const baremosArgentina = {
    "1_primaria": { // 6-7 años
        aciertos: { media: 14.01, dt: 6.24 },
        aciertosNetos: { media: 12.03, dt: 7.05 },
        ici: { media: 81, dt: 24 },
        percentiles: {
            99: { a: 31, ae: 31, ici: 100 },
            95: { a: 26, ae: 25, ici: 100 },
            90: { a: 23, ae: 21, ici: 92 },
            85: { a: 21, ae: 19, ici: 91 },
            80: { a: 18, ae: 17, ici: 88 },
            75: { a: 17, ae: 15, ici: 87 },
            70: { a: 16, ae: 14, ici: 85 },
            65: { a: 15, ae: 13, ici: 82 },
            60: { a: 14, ae: 12, ici: 79 },
            50: { a: 13, ae: 10, ici: 76 },
            40: { a: 11, ae: 8, ici: 70 },
            30: { a: 9, ae: 6, ici: 62 },
            25: { a: 8, ae: 5, ici: 55 },
            20: { a: 7, ae: 3, ici: 45 },
            15: { a: 6, ae: 2, ici: 35 },
            10: { a: 5, ae: 1, ici: 23 },
            5: { a: 3, ae: 0, ici: 10 },
            1: { a: 1, ae: -3, ici: 0 }
        }
    },
    "2_primaria": { // 7-8 años
        aciertos: { media: 18.64, dt: 6.57 },
        aciertosNetos: { media: 15.35, dt: 8.65 },
        ici: { media: 86, dt: 19 },
        percentiles: {
            99: { a: 33, ae: 30, ici: 100 },
            95: { a: 31, ae: 29, ici: 100 },
            90: { a: 29, ae: 27, ici: 90 },
            85: { a: 28, ae: 24, ici: 88 },
            80: { a: 26, ae: 22, ici: 86 },
            75: { a: 24, ae: 21, ici: 84 },
            70: { a: 23, ae: 20, ici: 82 },
            65: { a: 21, ae: 18, ici: 80 },
            60: { a: 20, ae: 17, ici: 78 },
            50: { a: 18, ae: 15, ici: 75 },
            40: { a: 16, ae: 13, ici: 71 },
            30: { a: 14, ae: 11, ici: 64 },
            25: { a: 13, ae: 10, ici: 58 },
            20: { a: 11, ae: 8, ici: 50 },
            15: { a: 9, ae: 5, ici: 41 },
            10: { a: 8, ae: 3, ici: 32 },
            5: { a: 6, ae: 0, ici: 23 },
            1: { a: 3, ae: -4, ici: 0 }
        }
    },
    "3_primaria": { // 8-9 años
        aciertos: { media: 21.55, dt: 7.93 },
        aciertosNetos: { media: 19.07, dt: 8.40 },
        ici: { media: 84, dt: 20 },
        percentiles: {
            99: { a: 44, ae: 42, ici: 100 },
            95: { a: 40, ae: 39, ici: 100 },
            90: { a: 35, ae: 35, ici: 94 },
            85: { a: 32, ae: 31, ici: 92 },
            80: { a: 30, ae: 28, ici: 90 },
            75: { a: 28, ae: 27, ici: 88 },
            70: { a: 27, ae: 25, ici: 86 },
            65: { a: 25, ae: 24, ici: 84 },
            60: { a: 24, ae: 22, ici: 81 },
            50: { a: 21, ae: 19, ici: 77 },
            40: { a: 18, ae: 16, ici: 71 },
            30: { a: 15, ae: 13, ici: 64 },
            25: { a: 14, ae: 11, ici: 58 },
            20: { a: 12, ae: 9, ici: 50 },
            15: { a: 10, ae: 7, ici: 42 },
            10: { a: 8, ae: 4, ici: 33 },
            5: { a: 5, ae: 0, ici: 22 },
            1: { a: 2, ae: -5, ici: 0 }
        }
    },
    "4_primaria": { // 9-10 años
        aciertos: { media: 22.25, dt: 7.39 },
        aciertosNetos: { media: 20.12, dt: 8.12 },
        ici: { media: 87, dt: 15 },
        percentiles: {
            99: { a: 43, ae: 42, ici: 100 },
            95: { a: 38, ae: 37, ici: 100 },
            90: { a: 33, ae: 32, ici: 93 },
            85: { a: 31, ae: 30, ici: 91 },
            80: { a: 29, ae: 28, ici: 90 },
            75: { a: 27, ae: 26, ici: 88 },
            70: { a: 26, ae: 25, ici: 86 },
            65: { a: 25, ae: 23, ici: 84 },
            60: { a: 24, ae: 22, ici: 82 },
            50: { a: 22, ae: 20, ici: 78 },
            40: { a: 20, ae: 17, ici: 73 },
            30: { a: 17, ae: 14, ici: 66 },
            25: { a: 15, ae: 12, ici: 60 },
            20: { a: 13, ae: 10, ici: 52 },
            15: { a: 11, ae: 7, ici: 45 },
            10: { a: 9, ae: 4, ici: 36 },
            5: { a: 6, ae: 0, ici: 23 },
            1: { a: 3, ae: -4, ici: 0 }
        }
    },
    "5_primaria": { // 10-11 años
        aciertos: { media: 26.62, dt: 8.23 },
        aciertosNetos: { media: 24.78, dt: 9.02 },
        ici: { media: 89, dt: 16 },
        percentiles: {
            99: { a: 50, ae: 49, ici: 100 },
            95: { a: 44, ae: 43, ici: 100 },
            90: { a: 40, ae: 39, ici: 94 },
            85: { a: 37, ae: 36, ici: 92 },
            80: { a: 35, ae: 33, ici: 90 },
            75: { a: 33, ae: 31, ici: 88 },
            70: { a: 31, ae: 29, ici: 86 },
            65: { a: 29, ae: 27, ici: 84 },
            60: { a: 27, ae: 26, ici: 82 },
            50: { a: 25, ae: 23, ici: 78 },
            40: { a: 22, ae: 20, ici: 74 },
            30: { a: 19, ae: 16, ici: 68 },
            25: { a: 17, ae: 13, ici: 61 },
            20: { a: 14, ae: 11, ici: 54 },
            15: { a: 12, ae: 8, ici: 45 },
            10: { a: 9, ae: 5, ici: 35 },
            5: { a: 6, ae: 0, ici: 22 },
            1: { a: 3, ae: -5, ici: 0 }
        }
    },
    "6_primaria": { // 11-12 años
        aciertos: { media: 26.07, dt: 7.66 },
        aciertosNetos: { media: 37.45, dt: 7.98 },
        ici: { media: 92, dt: 11 },
        percentiles: {
            99: { a: 50, ae: 48, ici: 100 },
            95: { a: 43, ae: 44, ici: 100 },
            90: { a: 41, ae: 41, ici: 96 },
            85: { a: 38, ae: 37, ici: 94 },
            80: { a: 36, ae: 35, ici: 93 },
            75: { a: 34, ae: 33, ici: 92 },
            70: { a: 33, ae: 31, ici: 91 },
            65: { a: 31, ae: 30, ici: 90 },
            60: { a: 29, ae: 28, ici: 89 },
            50: { a: 27, ae: 26, ici: 87 },
            40: { a: 25, ae: 23, ici: 84 },
            30: { a: 23, ae: 21, ici: 79 },
            25: { a: 21, ae: 19, ici: 75 },
            20: { a: 19, ae: 17, ici: 69 },
            15: { a: 17, ae: 14, ici: 62 },
            10: { a: 14, ae: 11, ici: 51 },
            5: { a: 10, ae: 6, ici: 36 },
            1: { a: 5, ae: 0, ici: 17 }
        }
    },
    "7_primaria": { // 12-13 años
        aciertos: { media: 32.75, dt: 10.41 },
        aciertosNetos: { media: 31.90, dt: 8.98 },
        ici: { media: 90, dt: 9 },
        percentiles: {
            99: { a: 58, ae: 55, ici: 100 },
            95: { a: 53, ae: 51, ici: 100 },
            90: { a: 48, ae: 47, ici: 94 },
            85: { a: 43, ae: 43, ici: 92 },
            80: { a: 41, ae: 40, ici: 91 },
            75: { a: 38, ae: 37, ici: 90 },
            70: { a: 36, ae: 35, ici: 89 },
            65: { a: 34, ae: 33, ici: 88 },
            60: { a: 32, ae: 31, ici: 87 },
            50: { a: 30, ae: 29, ici: 85 },
            40: { a: 28, ae: 26, ici: 82 },
            30: { a: 25, ae: 23, ici: 77 },
            25: { a: 23, ae: 21, ici: 73 },
            20: { a: 21, ae: 19, ici: 67 },
            15: { a: 18, ae: 16, ici: 60 },
            10: { a: 15, ae: 13, ici: 50 },
            5: { a: 11, ae: 8, ici: 36 },
            1: { a: 6, ae: 2, ici: 20 }
        }
    }
}

// Función para convertir edad a curso escolar
export function getGradoFromEdad(edad: number, pais: 'espana' | 'argentina' = 'espana'): string {
    if (pais === 'argentina') {
        if (edad <= 7) return "1_primaria"
        if (edad <= 8) return "2_primaria"
        if (edad <= 9) return "3_primaria"
        if (edad <= 10) return "4_primaria"
        if (edad <= 11) return "5_primaria"
        if (edad <= 12) return "6_primaria"
        return "7_primaria"
    } else {
        if (edad <= 7) return "1_primaria"
        if (edad <= 8) return "2_primaria"
        if (edad <= 9) return "3_primaria"
        if (edad <= 10) return "4_primaria"
        if (edad <= 11) return "5_primaria"
        if (edad <= 12) return "6_primaria"
        if (edad <= 13) return "1_eso"
        if (edad <= 14) return "2_eso"
        if (edad <= 15) return "3_eso"
        if (edad <= 16) return "4_eso"
        return "bachillerato"
    }
}

// Función para obtener percentil aproximado
export function getPercentil(valor: number, tipo: 'a' | 'ae' | 'ici', baremos: any): number {
    const percentiles = [99, 95, 90, 85, 80, 75, 70, 65, 60, 50, 40, 30, 25, 20, 15, 10, 5, 1]
    for (const p of percentiles) {
        if (valor >= baremos.percentiles[p][tipo]) {
            return p
        }
    }
    return 1
}

// Función para obtener eneatipo desde percentil
export function getEneatipo(percentil: number): number {
    if (percentil >= 96) return 9
    if (percentil >= 89) return 8
    if (percentil >= 77) return 7
    if (percentil >= 60) return 6
    if (percentil >= 40) return 5
    if (percentil >= 23) return 4
    if (percentil >= 11) return 3
    if (percentil >= 4) return 2
    return 1
}

// Función para calcular ICI
export function calcularICI(aciertos: number, errores: number): number {
    const respuestas = aciertos + errores
    if (respuestas === 0) return 0
    return Math.round(((aciertos - errores) / respuestas) * 100)
}

// Interpretación del rendimiento combinando A-E e ICI
export function interpretarRendimiento(aePercentil: number, iciPercentil: number): {
    tipo: string
    descripcion: string
    color: string
} {
    const aeAlto = aePercentil >= 50
    const iciAlto = iciPercentil >= 50

    if (aeAlto && iciAlto) {
        return {
            tipo: "Eficaz y no impulsivo",
            descripcion: "Rendimiento normal. El sujeto presenta una adecuada capacidad atencional y un buen control de la impulsividad.",
            color: "green"
        }
    } else if (aeAlto && !iciAlto) {
        return {
            tipo: "Eficaz e impulsivo",
            descripcion: "Buen rendimiento pero con tendencia impulsiva. Podría indicar subtipo impulsivo de TDAH.",
            color: "yellow"
        }
    } else if (!aeAlto && iciAlto) {
        return {
            tipo: "Ineficaz y no impulsivo (Inatento)",
            descripcion: "Bajo rendimiento sin impulsividad. Podría indicar subtipo inatento de TDAH.",
            color: "orange"
        }
    } else {
        return {
            tipo: "Ineficaz e impulsivo (Combinado)",
            descripcion: "Bajo rendimiento con impulsividad. Podría indicar subtipo combinado de TDAH.",
            color: "red"
        }
    }
}

export const carasR: TestDefinition = {
    id: "caras-r",
    title: "CARAS-R: Test de Percepción de Diferencias - Revisado",
    description: "Test de aptitudes perceptivo-imaginativas para evaluar la capacidad de percibir rápida y correctamente semejanzas y diferencias. Desarrollado por L.L. Thurstone y M. Yela (TEA Ediciones, 2012).",
    instructions: "Observa cada fila de tres caras. Una de ellas es diferente a las otras dos. Marca con una X la cara que es DIFERENTE. Tienes 3 minutos para completar el máximo de filas posible. Trabaja rápidamente pero trata de no cometer errores.",
    authors: "Thurstone, L.L. y Yela, M. (2012)",
    reference: "Thurstone, L.L. y Yela, M. (2012). CARAS-R: Test de Percepción de Diferencias - Revisado (11ª ed.). Madrid: TEA Ediciones.",
    questions: [], // El test CARAS-R usa un componente especial, no preguntas estándar
    scoring: {
        type: "sum",
        ranges: [
            { min: 77, max: 100, label: "Muy alto (Eneatipo 9)", color: "blue", description: "Capacidad perceptiva muy superior a la media." },
            { min: 60, max: 76, label: "Alto (Eneatipo 7-8)", color: "green", description: "Capacidad perceptiva superior a la media." },
            { min: 40, max: 59, label: "Medio (Eneatipo 4-6)", color: "green", description: "Capacidad perceptiva dentro del rango normal." },
            { min: 23, max: 39, label: "Medio-bajo (Eneatipo 3)", color: "yellow", description: "Capacidad perceptiva ligeramente inferior a la media." },
            { min: 11, max: 22, label: "Bajo (Eneatipo 2)", color: "orange", description: "Capacidad perceptiva inferior. Se recomienda evaluación más detallada." },
            { min: 0, max: 10, label: "Muy bajo (Eneatipo 1)", color: "red", description: "Capacidad perceptiva muy inferior. Se recomienda evaluación especializada." }
        ],
        interpretation: `
## Interpretación Clínica del CARAS-R

El CARAS-R es un test de aptitudes perceptivo-imaginativas que evalúa la capacidad para percibir rápida y correctamente semejanzas y diferencias en patrones de estímulos parcialmente ordenados.

### Puntuaciones del Test

1. **Aciertos (A)**: Número total de respuestas correctas (0-60)
2. **Errores (E)**: Número de respuestas incorrectas
3. **Aciertos Netos (A-E)**: Medida principal del rendimiento
4. **ICI (Índice de Control de Impulsividad)**: [(A-E)/(A+E)] × 100

### Interpretación del ICI

- **ICI cercano a 100**: Adecuado control de impulsividad
- **ICI bajo (<70)**: Ejecución impulsiva, tendencia a cometer errores

### Matriz de Interpretación (TDAH)

| | ICI Bajo | ICI Normal |
|---|----------|------------|
| **A-E Bajo** | TDAH Combinado | TDAH Inatento |
| **A-E Normal** | TDAH Impulsivo | Normal |

### Referencias
- Thurstone, L.L. y Yela, M. (2012). CARAS-R: Test de Percepción de Diferencias - Revisado. TEA Ediciones.
- Crespo-Eguílaz, N., Narbona, J., Peralta, F., y Repáraz, C. (2006). Medida de atención sostenida y del control de la impulsividad en niños.
        `
    }
}
