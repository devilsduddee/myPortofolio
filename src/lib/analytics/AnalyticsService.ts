import { track } from '@vercel/analytics';

/**
 * AnalyticsService Layer
 * Abstracts the third-party analytics provider (Vercel Analytics)
 * ensuring zero direct business logic exists inside React components.
 */
export class AnalyticsService {
  static trackPageView(url: string) {
    if (typeof window !== 'undefined') {
      track('page_view', { url });
    }
  }

  static trackCvDownload() {
    if (typeof window !== 'undefined') {
      track('cv_download');
    }
  }

  static trackContactClick(platform: string) {
    if (typeof window !== 'undefined') {
      track('contact_click', { platform });
    }
  }

  static trackProjectClick(projectName: string) {
    if (typeof window !== 'undefined') {
      track('project_click', { projectName });
    }
  }
}
