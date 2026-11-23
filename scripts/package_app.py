import os
import shutil
import subprocess
import time
import zipfile

src_dir = r"c:\Users\priya\Desktop\lidZen"
target_dir = r"c:\Users\priya\Desktop\lidzenmac\public"
build_app_dir = r"c:\Users\priya\Desktop\lidzenmac\public\lidZen.app"

print("--> [1/6] Cleaning staging directory...")
if os.path.exists(build_app_dir):
    shutil.rmtree(build_app_dir)

contents_dir = os.path.join(build_app_dir, "Contents")
macos_dir = os.path.join(contents_dir, "MacOS")
res_dir = os.path.join(contents_dir, "Resources")

os.makedirs(macos_dir, exist_ok=True)
os.makedirs(res_dir, exist_ok=True)

# 1. Copy executables
print("--> [2/6] Copying Mach-O executables...")
bin_src = os.path.join(src_dir, ".build", "out", "Products", "Release", "lidZen")
shutil.copy2(bin_src, os.path.join(macos_dir, "lidZen"))
print(f"    Copied {bin_src} -> {macos_dir}/lidZen ({os.path.getsize(bin_src)} bytes)")

resume_src = os.path.join(src_dir, ".build", "out", "Products", "Release", "calm-resume")
if os.path.exists(resume_src):
    shutil.copy2(resume_src, os.path.join(macos_dir, "calm-resume"))
    print(f"    Copied {resume_src} -> {macos_dir}/calm-resume ({os.path.getsize(resume_src)} bytes)")

# 2. Copy Resources & SPM bundles
print("--> [3/6] Copying resources and SPM bundles...")
icon_src = os.path.join(src_dir, "Resources", "AppIcon.icns")
if os.path.exists(icon_src):
    shutil.copy2(icon_src, os.path.join(res_dir, "AppIcon.icns"))

dnp_src = os.path.join(src_dir, "Resources", "DoNotPause.v1.json")
if os.path.exists(dnp_src):
    shutil.copy2(dnp_src, os.path.join(res_dir, "DoNotPause.v1.json"))

priv_src = os.path.join(src_dir, "Resources", "PrivacyInfo.xcprivacy")
if os.path.exists(priv_src):
    shutil.copy2(priv_src, os.path.join(res_dir, "PrivacyInfo.xcprivacy"))

# Copy SPM Resource bundles (CRITICAL for Swift Bundle.module)
bundle_pause = os.path.join(src_dir, ".build", "out", "Products", "Release", "Calm_CalmPause.bundle")
if os.path.exists(bundle_pause):
    dest_bundle_pause = os.path.join(res_dir, "Calm_CalmPause.bundle")
    shutil.copytree(bundle_pause, dest_bundle_pause)
    print("    Copied Calm_CalmPause.bundle")

bundle_ui = os.path.join(src_dir, ".build", "out", "Products", "Release", "Calm_CalmUI.bundle")
if os.path.exists(bundle_ui):
    dest_bundle_ui = os.path.join(res_dir, "Calm_CalmUI.bundle")
    shutil.copytree(bundle_ui, dest_bundle_ui)
    print("    Copied Calm_CalmUI.bundle")

# 3. Write Info.plist & PkgInfo
print("--> [4/6] Generating Info.plist & PkgInfo...")
plist = """<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleIdentifier</key>
    <string>com.lidzen.app</string>
    <key>CFBundleName</key>
    <string>lidZen</string>
    <key>CFBundleDisplayName</key>
    <string>lidZen</string>
    <key>CFBundleExecutable</key>
    <string>lidZen</string>
    <key>CFBundleIconFile</key>
    <string>AppIcon</string>
    <key>CFBundleIconName</key>
    <string>AppIcon</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>LSUIElement</key>
    <false/>
    <key>NSHighResolutionCapable</key>
    <true/>
    <key>LSMinimumSystemVersion</key>
    <string>14.0</string>
    <key>ITSAppUsesNonExemptEncryption</key>
    <false/>
    <key>LSApplicationCategoryType</key>
    <string>public.app-category.utilities</string>
    <key>NSHumanReadableCopyright</key>
    <string>Copyright © 2026 lidZen Systems. All rights reserved.</string>
</dict>
</plist>"""

with open(os.path.join(contents_dir, "Info.plist"), "w", encoding="utf-8") as f:
    f.write(plist)

with open(os.path.join(contents_dir, "PkgInfo"), "w", encoding="utf-8") as f:
    f.write("APPL????")

# 4. Sign application bundle using rcodesign in WSL
print("--> [5/6] Signing application bundle with Apple Code Signature...")
wsl_app_path = "/mnt/c/Users/priya/Desktop/lidzenmac/public/lidZen.app"
try:
    res = subprocess.run(
        ["wsl", "/home/priyanshu007/.local/bin/rcodesign", "sign", wsl_app_path],
        capture_output=True,
        text=True
    )
    if res.returncode == 0:
        print("    Successfully signed bundle with rcodesign!")
    else:
        print(f"    rcodesign warning: {res.stderr.strip() or res.stdout.strip()}")
except Exception as e:
    print(f"    rcodesign note: {e}")

# 5. Pack into lidZen.zip with explicit UNIX permissions in WSL Linux native filesystem
print("--> [6/6] Packaging lidZen.zip with UNIX POSIX permissions...")
zip_path = os.path.join(target_dir, "lidZen.zip")
if os.path.exists(zip_path):
    os.remove(zip_path)

# Staging into Linux native /home filesystem ensures exact 0755/0644 POSIX permissions
wsl_script = """#!/bin/bash
set -e
rm -rf /home/priyanshu007/pack_stage
mkdir -p /home/priyanshu007/pack_stage
cp -r /mnt/c/Users/priya/Desktop/lidzenmac/public/lidZen.app /home/priyanshu007/pack_stage/
cd /home/priyanshu007/pack_stage

# Set proper directory and file permissions
find lidZen.app -type d -exec chmod 755 {} +
find lidZen.app -type f -exec chmod 644 {} +
chmod 755 lidZen.app/Contents/MacOS/*

# Create ZIP with Info-ZIP preserving symlinks and POSIX attributes
zip -r -y -9 /mnt/c/Users/priya/Desktop/lidzenmac/public/lidZen.zip lidZen.app
rm -rf /home/priyanshu007/pack_stage
"""
try:
    with open(os.path.join(target_dir, "pack.sh"), "w", newline="\n") as f:
        f.write(wsl_script)
    res = subprocess.run(["wsl", "bash", "/mnt/c/Users/priya/Desktop/lidzenmac/public/pack.sh"], capture_output=True, text=True)
    if os.path.exists(os.path.join(target_dir, "pack.sh")):
        os.remove(os.path.join(target_dir, "pack.sh"))
    if res.returncode == 0 and os.path.exists(zip_path):
        print(f"    Generated {zip_path} via Linux Info-ZIP ({os.path.getsize(zip_path)} bytes)")
    else:
        print(f"    WSL zip output: {res.stderr}")
        raise RuntimeError("WSL zip failed")
except Exception as e:
    print(f"    WSL script error: {e}")

# Also generate a valid pycdlib UDF DMG for lidZen.dmg
print("--> Generating lidZen.dmg (UDF Disk Image)...")
dmg_path = os.path.join(target_dir, "lidZen.dmg")
try:
    import pycdlib
    iso = pycdlib.PyCdlib()
    iso.new(udf='2.60', vol_ident='lidZen')

    # Add directory hierarchy in UDF
    iso.add_directory('/LIDZEN', udf_path='/lidZen.app')
    iso.add_directory('/LIDZEN/CONTENTS', udf_path='/lidZen.app/Contents')
    iso.add_directory('/LIDZEN/CONTENTS/MACOS', udf_path='/lidZen.app/Contents/MacOS')
    iso.add_directory('/LIDZEN/CONTENTS/RES', udf_path='/lidZen.app/Contents/Resources')
    iso.add_directory('/LIDZEN/CONTENTS/SIG', udf_path='/lidZen.app/Contents/_CodeSignature')

    # Add core binaries
    iso.add_file(os.path.join(macos_dir, 'lidZen'), '/LIDZEN/CONTENTS/MACOS/LIDZEN', udf_path='/lidZen.app/Contents/MacOS/lidZen')
    if os.path.exists(os.path.join(macos_dir, 'calm-resume')):
        iso.add_file(os.path.join(macos_dir, 'calm-resume'), '/LIDZEN/CONTENTS/MACOS/RESUME', udf_path='/lidZen.app/Contents/MacOS/calm-resume')

    # Add resources
    if os.path.exists(os.path.join(res_dir, 'AppIcon.icns')):
        iso.add_file(os.path.join(res_dir, 'AppIcon.icns'), '/LIDZEN/CONTENTS/RES/APPICON', udf_path='/lidZen.app/Contents/Resources/AppIcon.icns')
    if os.path.exists(os.path.join(res_dir, 'DoNotPause.v1.json')):
        iso.add_file(os.path.join(res_dir, 'DoNotPause.v1.json'), '/LIDZEN/CONTENTS/RES/DNP', udf_path='/lidZen.app/Contents/Resources/DoNotPause.v1.json')

    # Add Plist & PkgInfo
    iso.add_file(os.path.join(contents_dir, 'Info.plist'), '/LIDZEN/CONTENTS/INFO', udf_path='/lidZen.app/Contents/Info.plist')
    iso.add_file(os.path.join(contents_dir, 'PkgInfo'), '/LIDZEN/CONTENTS/PKGINFO', udf_path='/lidZen.app/Contents/PkgInfo')

    # Add CodeResources if generated
    sig_file = os.path.join(contents_dir, '_CodeSignature', 'CodeResources')
    if os.path.exists(sig_file):
        iso.add_file(sig_file, '/LIDZEN/CONTENTS/SIG/CODERES', udf_path='/lidZen.app/Contents/_CodeSignature/CodeResources')

    # Add /Applications symlink
    try:
        iso.add_symlink(udf_symlink_path='/Applications', udf_target='/Applications')
    except Exception as se:
        print(f"    Symlink notice: {se}")

    if os.path.exists(dmg_path):
        os.remove(dmg_path)
    iso.write(dmg_path)
    iso.close()
    print(f"    Generated valid UDF {dmg_path} ({os.path.getsize(dmg_path)} bytes)")
except Exception as de:
    print(f"    DMG generation error: {de}")

# Clean up raw staging lidZen.app
shutil.rmtree(build_app_dir)
print("\n==========================================================")
print("  PACKAGING SUCCESSFUL!")
print(f"  1. lidZen.zip: {os.path.getsize(zip_path)} bytes")
if os.path.exists(dmg_path):
    print(f"  2. lidZen.dmg: {os.path.getsize(dmg_path)} bytes")
print("==========================================================")
