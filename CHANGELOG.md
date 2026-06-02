# Changelog

All notable changes to the **AG Holding Staff** desktop app.
This project uses [semantic versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`).

## [1.0.3] — 2026-06-02
### Added
- **In-app updates.** A **Check for Updates…** menu item (under the app menu on
  macOS, Help menu on Windows/Linux), plus a quiet automatic check on launch.
  - **Windows & Linux:** the app downloads the new version and offers
    **Restart & install** — no reinstalling.
  - **macOS:** detects a new version and one-click opens the download (true
    silent self-install on macOS needs a paid Apple Developer signature).
- Native application menu (File / Edit / View / Help) with Reload, zoom, etc.

## [1.0.2] — 2026-06-02
### Fixed
- **macOS "is damaged / can't be opened" (malware) error on Apple Silicon.**
  The app is now **ad-hoc code-signed**, which gives it a valid local signature
  so macOS will run it (after the one-time Gatekeeper bypass — see the README).
- Universal build no longer fails: only the final merged app is signed
  (per-architecture temporary builds are skipped, which previously broke the
  universal merge).

## [1.0.1] — 2026-06-02
### Changed
- Introduced ad-hoc signing and multi-platform release notes.
- _Superseded by 1.0.2_ — the signing step conflicted with the universal merge.

## [1.0.0] — 2026-06-02
### Added
- **Initial release.** Native desktop app that opens the AG Holding staff portal
  (`https://agholding.vercel.app/staff`) in its own window.
- Builds for **macOS** (universal — Apple Silicon + Intel), **Windows**
  (installer + portable `.exe`), and **Linux** (`AppImage` + `.deb`).
- External links (mailto:, tel:, other sites) open in the default browser.
- Automated multi-platform builds & releases via GitHub Actions.

---

> The app loads the **live** portal, so portal features and content always stay
> up to date automatically — you only need to update the desktop app when this
> changelog lists app-level changes (window, signing, new platforms, etc.).
