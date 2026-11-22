import Link from 'next/link';
import DocLayout, { TocItem } from '../../components/DocLayout';
import { Callout, CodeBlock } from '../../components/DocComponents';
import { Download, Shield, Key, Terminal } from 'lucide-react';

const toc: TocItem[] = [
  { id: 'download-dmg', title: 'Download & Installation', level: 2 },
  { id: 'system-permissions', title: 'System Permissions Guide', level: 2 },
  { id: 'homebrew-install', title: 'Homebrew Cask (CLI)', level: 2 },
  { id: 'uninstalling', title: 'Uninstalling lidZen', level: 2 },
];

export default function Installation() {
  return (
    <DocLayout
      title="Installation & Permissions"
      category="Getting Started"
      description="Step-by-step guide to installing lidZen via DMG or Homebrew, and granting required macOS diagnostic permissions."
      toc={toc}
    >
      <section id="download-dmg">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Download & Installation</h2>
        <p>
          lidZen is distributed as an instant universal macOS application package (<code>lidZen.zip</code>).
        </p>

        <div className="my-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5">
          <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-700 dark:text-zinc-300">
            <li>Download <code>lidZen.zip</code> from your post-purchase confirmation or download link.</li>
            <li>Double-click <code>lidZen.zip</code> to unpack <strong>lidZen.app</strong>.</li>
            <li>Drag <strong>lidZen.app</strong> into your <strong>/Applications</strong> folder.</li>
            <li>Launch lidZen from Applications or Spotlight.</li>
          </ol>
        </div>

        <Callout type="tip" title="Apple Notarization Verified">
          lidZen is signed with an official Apple Developer ID and notarized by Apple Ticket Service. Gatekeeper will recognize it without warnings.
        </Callout>
      </section>

      <section id="system-permissions" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">System Permissions Guide</h2>
        <p>
          To deliver deep path tracing without requiring root privileges, lidZen uses standard macOS security entitlements:
        </p>

        <div className="my-5 space-y-3">
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
              <Shield size={16} className="text-accent-500 dark:text-accent-400" />
              <span>Full Disk Access (Optional for system process tracing)</span>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Required if you wish to see the binary path of protected system helpers and sandbox containers in <code>/System/Library</code>.
            </p>
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
              <Key size={16} className="text-accent-500 dark:text-accent-400" />
              <span>Accessibility Permissions</span>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Allows lidZen to detect active window titles and alert you if an app has unsaved changes before suspending background execution.
            </p>
          </div>
        </div>
      </section>

      <section id="homebrew-install" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Homebrew Cask (CLI)</h2>
        <p>
          If you prefer managing Mac applications through Homebrew:
        </p>

        <CodeBlock
          language="bash"
          fileName="Terminal"
          code={`# Install via Homebrew Cask
brew install --cask lidzen

# Launch lidZen
open -a lidZen`}
        />
      </section>

      <section id="uninstalling" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Uninstalling lidZen</h2>
        <p>
          Because lidZen installs no launch daemons, kernel extensions, or system modifications, uninstallation is clean and instant:
        </p>
        <CodeBlock
          language="bash"
          fileName="Terminal"
          code={`# Remove application bundle and preferences
rm -rf /Applications/lidZen.app
rm -rf ~/Library/Application\\ Support/lidZen
rm -f ~/Library/Preferences/com.lidzen.mac.plist`}
        />
      </section>
    </DocLayout>
  );
}
