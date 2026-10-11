import { getCollection, type CollectionEntry } from 'astro:content';

export type Service = CollectionEntry<'services'>;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const contactPage = `${base}/yhteydenotto/`;

/** Palvelut `order`-kentän mukaisessa järjestyksessä. */
export async function getServices(): Promise<Service[]> {
	const services = await getCollection('services');
	return services.sort((a, b) => a.data.order - b.data.order);
}

export function serviceUrl(service: Service): string {
	return `${base}/palvelut/${service.data.slug}/`;
}

/** Näytetään hinnan yhteydessä, kun `price.isProposal` on true. */
export const indicativePriceNote =
	'Hinta on suuntaa antava. Hinnoittelu tarkennetaan aina projektin määrittelyn yhteydessä.';

/** Yksinkertaiset viivaikonit (24×24) palvelukohtaisesti. */
export const serviceIcons: Record<string, string> = {
	'ai-lahtopiste': 'M4 16a8 8 0 1 1 16 0M12 16l4-5M12 16h.01',
	'ai-tiekartta':
		'M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 17h8a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h8',
	tekoalyvaatimukset: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2 2 4-4',
	'digitaalinen-tyokaveri':
		'M7 9h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2zM12 9V5M12 5h.01M9.5 14h.01M14.5 14h.01M2 14h1M21 14h1',
	'alykkaat-prosessit':
		'M4 5h5v5H4zM15 14h5v5h-5zM9 7.5h4a2 2 0 0 1 2 2v4.5M17.5 10V4M15 6.5l2.5-2.5 2.5 2.5',
	'ai-osaamispassi': 'M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6',
};
