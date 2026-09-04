docker exec lisaba-site sh -c 'cd /app && node <<'"'"'NODE'"'"'
const { createClient } = require("@libsql/client");
const url = process.env.DATABASE_URL || "file:/app/data/payload.db";
async function main() {
  const client = createClient({ url });
  const cols = await client.execute("PRAGMA table_info(notification_settings)");
  console.log("before:", cols.rows.map(r => r.name).join(", "));
  const have = new Set(cols.rows.map(r => r.name));
  const adds = [
    ["telegram_bot_token", "TEXT"],
    ["smtp_host", "TEXT"],
    ["smtp_port", "NUMERIC"],
    ["smtp_user", "TEXT"],
    ["smtp_pass", "TEXT"],
    ["smtp_from", "TEXT"],
  ];
  for (const [name, type] of adds) {
    if (!have.has(name)) {
      await client.execute(`ALTER TABLE notification_settings ADD COLUMN ${name} ${type}`);
      console.log("added", name);
    } else {
      console.log("exists", name);
    }
  }
  const after = await client.execute("PRAGMA table_info(notification_settings)");
  console.log("after:", after.rows.map(r => r.name).join(", "));
}
main().catch(e => { console.error(e); process.exit(1); });
NODE'