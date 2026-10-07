import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { parse } from 'yaml';

const load = (name: string): any =>
    parse(fs.readFileSync(path.join(process.cwd(), 'src/data', `${name}.yml`), 'utf8'));

const bibFiles = import.meta.glob<string>('../data/bibliography/*.bib', { query: '?raw', import: 'default', eager: true });

export const bibliography: Record<string, string> = Object.fromEntries(
    Object.entries(bibFiles).map(([file, content]) => [path.basename(file, '.bib'), content]));

export const config = load('config');
export const contact = load('contact');
export const header = load('header');
export const publications = load('publications');
export const repositories = load('repositories');
export const teaching = load('teaching-activities');

export const revision = (() => {
    try { return execSync('git rev-parse --short HEAD').toString().trim(); }
    catch { return 'unknown'; }
})();

/** Newest first, by `date` field. */
export const byDateDesc = <T extends { date: string }>(a: T, b: T) => Date.parse(b.date) - Date.parse(a.date);

/** Selected entries, falling back to all entries if none are selected. */
export function selection<T extends { selected?: boolean }>(entries: T[], selected: boolean): T[] {
    if (!selected) return entries;
    const filtered = entries.filter((e) => e.selected === true);
    return filtered.length > 0 ? filtered : entries;
}

/** 'a', 'a and b', 'a, b, and c' */
export const happyAnd = (strings: string[]) =>
    strings.length === 0 ? '' : strings.reduce((text, value, i, array) =>
        text + (i < array.length - 1 ? ', ' : array.length > 2 ? ', and ' : ' and ') + value);
