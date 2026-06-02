# AG Holding Staff — macOS desktop app

A lightweight desktop wrapper (Electron) that opens the **AG Holding staff portal**
(`https://agholding.vercel.app/staff`) in its own native window.

## Download

Get the latest `.dmg` from the **[Releases](../../releases/latest)** page.

## Install (first launch)

Because the app is **not signed with an Apple Developer certificate**, macOS
Gatekeeper will warn on first open. To run it:

1. Open the `.dmg` and drag **AG Holding Staff** into **Applications**.
2. In Applications, **right-click** the app → **Open** → **Open** again.
   (You only need to do this once.)

If macOS still blocks it: **System Settings → Privacy & Security** → scroll down →
**Open Anyway**.

## Notes

- The app loads the live staff portal, so it stays up to date automatically and
  requires an internet connection.
- Apple-silicon (arm64) build. Ask for an Intel/universal build if needed.

## Build from source

```bash
npm install
CSC_IDENTITY_AUTO_DISCOVERY=false npm run dist
# → dist/AG Holding Staff-<version>-arm64.dmg
```
