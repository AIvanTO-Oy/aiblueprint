import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Palvelut: yksi Markdown-tiedosto per palvelu (src/content/services/).
// Body-osa on palvelun pitkä kuvaus.
const services = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/services' }),
	schema: z.object({
		order: z.number(),
		slug: z.string(),
		title: z.string(),
		subtitle: z.string(),
		badge: z.string().optional(), // esim. "Tästä kannattaa aloittaa"
		summary: z.string(), // korttiteksti, 1–2 lausetta
		benefits: z.array(z.string()), // "Mitä saatte"
		howItWorks: z.string(), // "Näin helppoa se on"
		price: z.object({
			display: z.string(), // näytettävä hintateksti
			basis: z.string(), // hinnoitteluperuste
			tableDisplay: z.string().optional(), // hintataulukon teksti, jos poikkeaa display-tekstistä
			tiers: z.array(z.object({ label: z.string(), price: z.string() })).optional(),
			isProposal: z.boolean().default(false), // true = suuntaa antava hinta, tarkennetaan projektin määrittelyssä
		}),
		// Toimintakehotus vie aina yhteydenottolomakkeelle (ei suoria sähköpostilinkkejä).
		cta: z.object({
			heading: z.string(),
			body: z.string(),
			button: z.string(),
		}),
		seo: z.object({
			title: z.string(),
			description: z.string(),
		}),
	}),
});

export const collections = { services };
