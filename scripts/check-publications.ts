// Compares src/data/publications.yml with ORCID and Crossref and reports differences.
// Read-only: nothing is changed. Exits with code 1 if differences were found.
//
// usage: pnpm check:publications

import fs from 'node:fs';
import { parse } from 'yaml';

const ORCID = '0000-0002-9111-4809';

interface Publication { key: string; title?: string; date: string; authors?: string[]; downloads?: { href: string }[]; }

const normalize = (text = '') => text.normalize('NFD').toLowerCase().replace(/[^a-z0-9]/g, '');
const sameTitle = (a?: string, b?: string) => normalize(a).slice(0, 40) === normalize(b).slice(0, 40);

async function json(url: string) {
    const response = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': `portfolio-check (https://orcid.org/${ORCID})` } });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
    return response.json();
}

const publications = (parse(fs.readFileSync('src/data/publications.yml', 'utf8')).publications as Publication[])
    .filter((p) => p.key !== 'separator');

const issues: string[] = [];
const report = (message: string) => { issues.push(message); console.log(`  ${message}`); };

// ORCID: works missing on either side

console.log(`ORCID ${ORCID}`);
const works = (await json(`https://pub.orcid.org/v3.0/${ORCID}/works`)).group
    .map((group: any) => group['work-summary'][0])
    .map((summary: any) => ({ title: summary.title.title.value as string, year: summary['publication-date']?.year?.value as string }));

for (const work of works)
    if (!publications.some((p) => sameTitle(p.title, work.title)))
        report(`not on site: ${work.title} (${work.year})`);
for (const p of publications)
    if (!works.some((work: any) => sameTitle(p.title, work.title)))
        report(`not in ORCID: ${p.title} (${p.date.slice(0, 4)})`);

// Crossref: title, year, and author order per DOI

console.log('Crossref');
for (const p of publications) {
    const dois = (p.downloads ?? []).map((d) => d.href.match(/doi\.org\/(.+)$/)?.[1]).filter((doi) => doi !== undefined);
    for (const doi of dois) {
        let work;
        try { work = (await json(`https://api.crossref.org/works/${encodeURIComponent(doi)}`)).message; }
        catch { continue; } // DOI not registered with Crossref (e.g., Eurographics, Zenodo)

        const title = work.title?.[0];
        const year = String(work.issued?.['date-parts']?.[0]?.[0]);
        const authors: string[] = (work.author ?? []).map((a: any) => a.family ?? '');

        // book DOIs (e.g., GPU Pro) refer to the whole volume, not the chapter
        if (work.type?.startsWith('book') && !sameTitle(title, p.title)) continue;

        if (!sameTitle(title, p.title)) report(`${p.key}: title differs, Crossref: "${title}"`);
        if (year !== p.date.slice(0, 4)) report(`${p.key}: year ${p.date.slice(0, 4)}, Crossref: ${year}`);
        // compare family names as suffixes of the full names, e.g., 'van Dieken' in 'Jan van Dieken'
        const mine = p.authors ?? [];
        if (authors.length && (authors.length !== mine.length || authors.some((family, i) => !normalize(mine[i]).endsWith(normalize(family)))))
            report(`${p.key}: authors differ, Crossref: ${authors.join(', ')}`);
    }
}

console.log(issues.length ? `\n${issues.length} difference(s) found` : '\nno differences found');
process.exit(issues.length ? 1 : 0);
