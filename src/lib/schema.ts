import { z } from 'astro/zod';

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');
const link = z.object({ href: z.string(), desc: z.string() });

export const config = z.object({
    flickr_user: z.string(),
    flickr_api_key: z.string(),
    img_defaults: z.object({
        thumbnail: z.object({ w: z.number(), h: z.number() }),
    }),
});

export const contact = z.object({
    email: z.email(),
    email_label: z.string(),
    refs: z.array(z.object({ name: z.string(), href: z.url() })).default([]),
});

export const header = z.object({
    picture: z.string(),
    picture_input: z.string(),
    picture_label: z.string(),
    picture_copyright: z.string().optional(),
    title: z.string().optional(),
    name: z.string(),
    surname: z.string(),
    leads: z.array(z.string()),
    sources: z.url(),
    sources_label: z.string(),
});

const separator = z.object({
    key: z.literal('separator'),
    selected: z.boolean().optional(),
    date,
});

const publication = z.object({
    key: z.string().refine((key) => key !== 'separator'),
    selected: z.boolean().optional(),
    title: z.string(),
    date,
    authors: z.array(z.string()).min(1),
    published: z.string(),
    lead_note: z.string().optional(),
    lead_href: z.url().optional(),
    abstract: z.string().optional(),
    bibtex: z.string().optional(),
    thumbnail: z.string(),
    flickr: z.string().optional(),
    downloads: z.array(link).optional(),
});

export type Publication = z.infer<typeof publication>;

export const publications = z.object({
    heading: z.string(),
    orcid: z.string(),
    researchgate: z.string(),
    scholar: z.string(),
    publications: z.array(z.union([separator, publication])),
});

const status = z.enum(['active', 'maintained', 'inactive', 'archived']);

export const repositories = z.object({
    heading: z.string(),
    accounts: z.array(z.object({
        github: z.string(),
        name: z.string(),
        thumbnail: z.string(),
        active: z.string(),
        summary: z.string(),
        projects: z.array(z.object({
            name: z.string(),
            description: z.string(),
            status,
        })).default([]),
    })),
});

const tags = z.string();
// 'n.a.' marks a missing evaluation
const grade = z.union([z.number().min(1).max(5), z.literal('n.a.')]).optional()
    .transform((value) => typeof value === 'number' ? value : undefined);

export const teaching = z.object({
    heading: z.string(),
    translations: z.record(z.string(), z.string()),
    theses: z.array(z.object({
        title: z.string(),
        student: z.string(),
        year: z.number(),
        tags,
        grade_personal: grade,
    })),
    terms: z.array(z.object({
        term: z.string(),
        courses: z.array(z.object({
            course: z.string(),
            tags,
            grade_overall: grade,
            grade_personal: grade,
        })).nullish().transform((courses) => courses ?? []),
    })),
});
