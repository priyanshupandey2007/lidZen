import os
import shutil
import zipfile

src_dir = r"c:\Users\priya\Desktop\lidZen"
target_dir = r"c:\Users\priya\Desktop\lidzenmac\public"
build_app_dir = r"c:\Users\priya\Desktop\lidzenmac\public\lidZen.app"

os.makedirs(os.path.join(build_app_dir, "Contents", "MacOS"), exist_ok=True)
os.makedirs(os.path.join(build_app_dir, "Contents", "Resources"), exist_ok=True)

# Copy executables
shutil.copy2(
    os.path.join(src_dir, ".build", "out", "Products", "Release", "lidZen"),
    os.path.join(build_app_dir, "Contents", "MacOS", "lidZen")
)
shutil.copy2(
    os.path.join(src_dir, ".build", "out", "Products", "Release", "calm-resume"),
    os.path.join(build_app_dir, "Contents", "MacOS", "calm-resume")
)

# Copy resources
shutil.copy2(
    os.path.join(src_dir, "Resources", "AppIcon.icns"),
    os.path.join(build_app_dir, "Contents", "Resources", "AppIcon.icns")
)
shutil.copy2(
    os.path.join(src_dir, "Resources", "DoNotPause.v1.json"),
    os.path.join(build_app_dir, "Contents", "Resources", "DoNotPause.v1.json")
)
if os.path.exists(os.path.join(src_dir, "Resources", "PrivacyInfo.xcprivacy")):
    shutil.copy2(
        os.path.join(src_dir, "Resources", "PrivacyInfo.xcprivacy"),
        os.path.join(build_app_dir, "Contents", "Resources", "PrivacyInfo.xcprivacy")
    )

# Write Info.plist
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
    <key>CFBundleVersion</key>
    <string>2.4.0</string>
    <key>CFBundleShortVersionString</key>
    <string>2.4.0</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>LSUIElement</key>
    <false/>
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

with open(os.path.join(build_app_dir, "Contents", "Info.plist"), "w", encoding="utf-8") as f:
    f.write(plist)

print("Created lidZen.app bundle.")

# Create lidZen.zip in public/
zip_path = os.path.join(target_dir, "lidZen.zip")
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(build_app_dir):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, target_dir)
            zipf.write(file_path, arcname)

print(f"Created {zip_path} ({os.path.getsize(zip_path)} bytes)")

# Copy / create lidZen.dmg
dmg_path = os.path.join(target_dir, "lidZen.dmg")
shutil.copy2(zip_path, dmg_path)
print(f"Created {dmg_path} ({os.path.getsize(dmg_path)} bytes)")

# Clean up raw lidZen.app from public so public only has the archives
shutil.rmtree(build_app_dir)
print("Packaging complete!")
