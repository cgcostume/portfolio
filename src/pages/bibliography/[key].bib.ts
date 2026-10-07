import type { APIRoute, GetStaticPaths } from 'astro';
import { bibliography } from '../../lib/data';

export const getStaticPaths = (() =>
    Object.entries(bibliography).map(([key, entry]) => ({ params: { key }, props: { entry } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
    new Response(props.entry, { headers: { 'Content-Type': 'application/x-bibtex; charset=utf-8' } });
