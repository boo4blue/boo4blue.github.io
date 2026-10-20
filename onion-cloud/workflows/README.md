# Workflows (staged)

These are the GitHub Actions workflows for Onion Cloud's fully GitHub-native
mode: heartbeat every 30 min, task runner on queued tasks, daily digest at 7am ET.

They belong in `.github/workflows/` at the repo root — but Onion's GitHub
connection currently cannot write dot-paths, so they are staged here until
that opens up (or until Boo drops them in manually — 3 files, copy-paste).

Until then, the cloud loop runs from Onion's side on the same queue
(`onion-cloud/tasks/queue/`) and the same result format
(`onion-cloud/site/data/tasks/<id>.json`). The website can't tell the difference.
