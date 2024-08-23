import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type ClassValue = string | number | null | undefined | ClassValue[] | { [key: string]: boolean };

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}
