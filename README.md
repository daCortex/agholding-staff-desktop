# AG Holding Staff — Desktop App

A native desktop app (macOS · Windows · Linux) that opens the **AG Holding staff
portal** in its own window — Enquiries, Orders, Reports, Inbox, News, and admin.

It's a thin wrapper around the live portal (`https://agholding.vercel.app/staff`),
so the app **stays up to date automatically** and requires an internet connection.

- 📥 **[Download the latest version »](../../releases/latest)**
- 📝 **[Changelog / version history »](CHANGELOG.md)**

---

## Download & install

Go to the **[Releases page](../../releases/latest)** and pick the file for your system:

| System | File to download |
| --- | --- |
| **macOS** (Apple Silicon **and** Intel) | `…-universal.dmg` |
| **Windows** (installer) | `…-Setup.exe` |
| **Windows** (no install / portable) | `AG.Holding.Staff.<version>.exe` |
| **Linux** (most distros) | `…​.AppImage` |
| **Linux** (Debian/Ubuntu) | `…_amd64.deb` |

### macOS
1. Open the `.dmg` and drag **AG Holding Staff** into **Applications**.
2. First launch only — see **[macOS: "damaged" / "cannot verify"](#macos-app-is-damaged--cannot-be-opened)** below.

### Windows
1. Run `…-Setup.exe` (or the portable `.exe`).
2. On the blue **SmartScreen** prompt: **More info → Run anyway** (one time).

### Linux
- **AppImage:** make it executable, then run it:
  ```bash
  chmod +x "AG Holding Staff-<version>.AppImage"
  ./"AG Holding Staff-<version>.AppImage"
  ```
- **.deb:** `sudo apt install ./agholding-staff-desktop_<version>_amd64.deb`

---

## Troubleshooting

### macOS: app is "damaged" / "cannot be opened"
This is expected — the app is signed but **not Apple-notarized** (notarization
needs a paid Apple Developer account). Do this **once**:

1. Move the app into **Applications**.
2. Open **Terminal** and run:
   ```bash
   xattr -cr "/Applications/AG Holding Staff.app"
   ```
3. Open the app normally. It won't warn again.

**Alternatives:**
- Right-click the app → **Open** → **Open**, or
- **System Settings → Privacy & Security** → scroll to the message → **Open Anyway**.

### Windows: "Windows protected your PC" (SmartScreen)
The app isn't signed with a paid certificate. Click **More info → Run anyway**.
If a deeper warning appears, right-click the file → **Properties** → tick
**Unblock** → **OK**.

### Linux: AppImage won't start
- Make sure it's executable: `chmod +x *.AppImage`.
- If you see a FUSE error: `sudo apt install libfuse2` (Debian/Ubuntu), or run
  with `./App.AppImage --appimage-extract-and-run`.

### The window is blank, stuck, or shows an error
- The app loads the **live** portal — check your **internet connection**.
- Confirm the portal works in a browser: <https://agholding.vercel.app/staff>.
- Quit (⌘Q / Alt+F4) and reopen.

### "Invalid credentials" when signing in
- Use the **email + access key** issued by your administrator.
- Keys are case-sensitive. If you've forgotten yours, an admin can reset it in
  **Staff portal → Staff**.

### I updated the website but the app looks the same
The app shows the live site, so content updates appear automatically. Try
quitting (⌘Q / Alt+F4) and reopening. You only need a new app version when the
[changelog](CHANGELOG.md) lists app-level changes.

---

## Updating
Download the newest installer from **[Releases](../../releases/latest)** and
reinstall over the old one (macOS: replace the app in Applications; Windows: run
the new setup; Linux: replace the AppImage / `apt install` the new `.deb`).

---

## For developers — build from source
```bash
npm install
# build for the current OS into ./dist
CSC_IDENTITY_AUTO_DISCOVERY=false npm run dist
```
Multi-platform installers are produced automatically by GitHub Actions
(`.github/workflows/release.yml`) when a `v*` tag is pushed; they're attached to
a GitHub Release.

### About signing
- **macOS:** ad-hoc signed (free) so it runs on Apple Silicon. To remove the
  Gatekeeper prompt entirely, add a paid Apple Developer ID + notarization.
- **Windows:** unsigned. A paid code-signing certificate removes SmartScreen.

---

## Support
Questions or problems: **commercial.agh@agholding.com** · +95 09-5506709.
