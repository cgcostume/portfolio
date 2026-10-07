import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { parse } from 'yaml';
import type { z } from 'astro/zod';
import * as schema from './schema';

/** Loads a YAML data file and validates it against its schema, failing the build on mismatch. */
function load<T extends z.ZodType>(name: string, type: T): z.infer<T> {
    const file = path.join(process.cwd(), 'src/data', `${name}.yml`);
    const result = type.safeParse(parse(fs.readFileSync(file, 'utf8')));
    if (!result.success) throw new Error(`invalid data in ${file}:\n${result.error.issues
        .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`).join('\n')}`);
    return result.data;
}

const bibFiles = import.meta.glob<string>('../data/bibliography/*.bib', { query: '?raw', import: 'default', eager: true });

export const bibliography: Record<string, string> = Object.fromEntries(
    Object.entries(bibFiles).map(([file, content]) => [path.basename(file, '.bib'), content]));

export const config = load('config', schema.config);
export const contact = load('contact', schema.contact);
export const header = load('header', schema.header);
export const publications = load('publications', schema.publications);
export const repositories = load('repositories', schema.repositories);
export const teaching = load('teaching-activities', schema.teaching);

const git = (format: string) => {
    try { return execSync(`git log -1 --format=${format}`).toString().trim(); }
    catch { return undefined; }
};

export const revision = git('%h') ?? 'unknown';
export const lastUpdated = new Date(git('%cI') ?? Date.now());

/** Newest first, by `date` field. */
export const byDateDesc = <T extends { date: string }>(a: T, b: T) => Date.parse(b.date) - Date.parse(a.date);

/** Selected entries, falling back to all entries if none are selected. */
export function selection<T extends { selected?: boolean | undefined }>(entries: T[], selected: boolean): T[] {
    if (!selected) return entries;
    const filtered = entries.filter((e) => e.selected === true);
    return filtered.length > 0 ? filtered : entries;
}

/** 'a', 'a and b', 'a, b, and c' */
export const happyAnd = (strings: string[]) =>
    strings.length === 0 ? '' : strings.reduce((text, value, i, array) =>
        text + (i < array.length - 1 ? ', ' : array.length > 2 ? ', and ' : ' and ') + value);
