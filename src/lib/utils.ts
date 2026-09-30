/**
 * File        : src/lib/utils.ts
 * Deskripsi   : Fungsi utilitas penggabung class Tailwind CSS secara kondisional (clsx + tailwind-merge).
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Menggabungkan nama-nama class CSS secara kondisional dan aman dari bentrokan Tailwind.
 *
 * Kegunaan : Menggabungkan banyak class Tailwind menjadi satu string class yang rapi.
 * Input    : inputs (Array atau variabel string class Tailwind)
 * Hasil    : String class CSS hasil penggabungan yang aman.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
