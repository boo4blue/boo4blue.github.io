# muselink auto-update

`version.json` serves the MuseLink HQ app update manifest:
`{"versionCode": N, "versionName": "x.y", "apkUrl": "https://...", "md5": "...", "size": N}`.
Re-uploads are recorded in the gofile-delivery ledger; the apkUrl is re-pointed
and this directory redeploys via GitHub Pages.
