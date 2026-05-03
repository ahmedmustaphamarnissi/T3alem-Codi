import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { 
    path: 'courses/details/:id', 
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve([])
  },
  { path: '**', renderMode: RenderMode.Client }
];