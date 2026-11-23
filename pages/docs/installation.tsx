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

        <Callout type="tip" title="First Launch — Gatekeeper Bypass">
          Since lidZen is distributed outside the Mac App Store, macOS Gatekeeper may show <strong>&quot;lidZen can&apos;t be opened&quot;</strong> on first launch. This is normal for independently distributed apps. Use <strong>one</strong> of these methods:
        </Callout>

        <div className="my-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5">
          <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">Method 1 — Right-click to Open (Easiest)</h4>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-zinc-300">
            <li><strong>Right-click</strong> (or Control-click) <strong>lidZen.app</strong> in Finder.</li>
            <li>Choose <strong>&quot;Open&quot;</strong> from the context menu.</li>
            <li>Click <strong>&quot;Open&quot;</strong> in the confirmation dialog.</li>
            <li>The app will launch and be remembered — double-click works from now on.</li>
          </ol>
        </div>

        <div className="my-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5">
          <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">Method 2 — Terminal (One Command)</h4>
          <CodeBlock
            language="bash"
            fileName="Terminal"
            code={`# Remove quarantine flag and launch
xattr -cr ~/Downloads/lidZen.app && open ~/Downloads/lidZen.app`}
          />
          <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400">
            If you moved the app to <code>/Applications</code>, replace <code>~/Downloads</code> with <code>/Applications</code>.
          </p>
        </div>

        <div className="my-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5">
          <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">Method 3 — System Settings</h4>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-zinc-300">
            <li>Try opening lidZen normally (double-click). macOS will block it.</li>
            <li>Go to <strong>System Settings → Privacy &amp; Security</strong>.</li>
            <li>Scroll down — you&apos;ll see <em>&quot;lidZen was blocked from use because it is not from an identified developer&quot;</em>.</li>
            <li>Click <strong>&quot;Open Anyway&quot;</strong> and confirm.</li>
          </ol>
        </div>
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
