import os
import shutil
import zipfile
import time

src_dir = r"c:\Users\priya\Desktop\lidZen"
target_dir = r"c:\Users\priya\Desktop\lidzenmac\public"
build_app_dir = r"c:\Users\priya\Desktop\lidzenmac\public\lidZen.app"

if os.path.exists(build_app_dir):
    shutil.rmtree(build_app_dir)

contents_dir = os.path.join(build_app_dir, "Contents")
macos_dir = os.path.join(contents_dir, "MacOS")
res_dir = os.path.join(contents_dir, "Resources")

os.makedirs(macos_dir, exist_ok=True)
os.makedirs(res_dir, exist_ok=True)

# 1. Copy executables
bin_src = os.path.join(src_dir, ".build", "out", "Products", "Release", "lidZen")
shutil.copy2(bin_src, os.path.join(macos_dir, "lidZen"))
print(f"Copied {bin_src} -> {macos_dir}/lidZen ({os.path.getsize(bin_src)} bytes)")

resume_src = os.path.join(src_dir, ".build", "out", "Products", "Release", "calm-resume")
if os.path.exists(resume_src):
    shutil.copy2(resume_src, os.path.join(macos_dir, "calm-resume"))
    print(f"Copied {resume_src} -> {macos_dir}/calm-resume")

# 2. Copy Resources & SPM bundles
icon_src = os.path.join(src_dir, "Resources", "AppIcon.icns")
if os.path.exists(icon_src):
    shutil.copy2(icon_src, os.path.join(res_dir, "AppIcon.icns"))

dnp_src = os.path.join(src_dir, "Resources", "DoNotPause.v1.json")
if os.path.exists(dnp_src):
    shutil.copy2(dnp_src, os.path.join(res_dir, "DoNotPause.v1.json"))

priv_src = os.path.join(src_dir, "Resources", "PrivacyInfo.xcprivacy")
if os.path.exists(priv_src):
    shutil.copy2(priv_src, os.path.join(res_dir, "PrivacyInfo.xcprivacy"))

# Copy SPM Resource bundles (required by Swift Bundle.module)
bundle_pause = os.path.join(src_dir, ".build", "out", "Products", "Release", "Calm_CalmPause.bundle")
if os.path.exists(bundle_pause):
    dest_bundle_pause = os.path.join(res_dir, "Calm_CalmPause.bundle")
    shutil.copytree(bundle_pause, dest_bundle_pause)
    print("Copied Calm_CalmPause.bundle")

bundle_ui = os.path.join(src_dir, ".build", "out", "Products", "Release", "Calm_CalmUI.bundle")
if os.path.exists(bundle_ui):
    dest_bundle_ui = os.path.join(res_dir, "Calm_CalmUI.bundle")
    shutil.copytree(bundle_ui, dest_bundle_ui)
    print("Copied Calm_CalmUI.bundle")

# 3. Write Info.plist & PkgInfo
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
    <string>2.4.0</string>
    <key>CFBundleShortVersionString</key>
    <string>2.4.0</string>
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

print("Created complete lidZen.app bundle structure.")

# 4. Pack into lidZen.zip with explicit UNIX permissions!
zip_path = os.path.join(target_dir, "lidZen.zip")
if os.path.exists(zip_path):
    os.remove(zip_path)

EXECUTABLE_FILENAMES = {"lidZen", "calm-resume"}

with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(build_app_dir):
        # Write directory entries with 0755 permissions
        for d in dirs:
            dir_path = os.path.join(root, d)
            arcname = os.path.relpath(dir_path, target_dir).replace("\\", "/") + "/"
            zinfo = zipfile.ZipInfo(arcname, time.localtime(os.path.getmtime(dir_path))[:6])
            zinfo.create_system = 3  # UNIX
            zinfo.external_attr = (0o040755 << 16) | 0x10  # directory + permissions drwxr-xr-x
            zf.writestr(zinfo, "")

        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, target_dir).replace("\\", "/")
            mtime = time.localtime(os.path.getmtime(file_path))[:6]
            zinfo = zipfile.ZipInfo(arcname, mtime)
            zinfo.create_system = 3  # UNIX
            
            # Executable binaries MUST have 0755 permissions (-rwxr-xr-x)
            is_exec = file in EXECUTABLE_FILENAMES or "Contents/MacOS" in arcname
            if is_exec:
                zinfo.external_attr = (0o100755 << 16)  # regular file -rwxr-xr-x
            else:
                zinfo.external_attr = (0o100644 << 16)  # regular file -rw-r--r--
            
            with open(file_path, "rb") as f_in:
                zf.writestr(zinfo, f_in.read(), compress_type=zipfile.ZIP_DEFLATED)

print(f"Created {zip_path} with UNIX permissions ({os.path.getsize(zip_path)} bytes)")

# Clean up raw lidZen.app from public
shutil.rmtree(build_app_dir)
print("Packaging complete!")
