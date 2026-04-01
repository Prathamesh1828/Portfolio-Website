import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-md py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-zinc-400 text-sm">
          © {new Date().getFullYear()} John Doe. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-zinc-400">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <FiGithub className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <FiLinkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            <FiTwitter className="w-5 h-5" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="mailto:hello@example.com" className="hover:text-white transition-colors">
            <FiMail className="w-5 h-5" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
