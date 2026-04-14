export const SITE = {
  fullName: 'Nimra Wani',
  title: 'Computer Science Student | Full Stack Developer | AI/ML Enthusiast',
  email: 'nimrawani04@gmail.com',
  location: 'Central University of Kashmir, Ganderbal',
  githubProfile: 'https://github.com/nimrawani04',
  portfolioRepo: 'https://github.com/nimrawani04/nimrawani04.github.io',
  resumePdfPath: 'nimra-wani-resume.pdf',
};


export const PROJECT_URLS = {
  BisAI: 'https://bis-ai.vercel.app/',
  SEPMS: 'https://secure-exam-flow.vercel.app/',
  Acadex: 'https://ds-cuk.vercel.app/',
  Raasta: 'https://cursor-hackathon-roan.vercel.app/',
  Araaaz: 'https://araaaz.vercel.app/',
  object3D: 'https://3d-obj-nine.vercel.app/',
};

export function resumePdfUrl() {
  return `${import.meta.env.BASE_URL}${SITE.resumePdfPath}`;
}
export function shouldEmbedInPortfolioIframe(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host === 'github.com' || host === 'www.github.com') return false;
    // gist, raw, etc.
    if (host === 'gist.github.com' || host.endsWith('.github.com')) return false;
    return true;
  } catch {
    return false;
  }
}

export function isBlockedGithubComUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === 'github.com' || host === 'www.github.com';
  } catch {
    return false;
  }
}
