// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: deep-blue;
// icon-glyph: exclamation;
// This is a simple script for me to gain XP when logging stuff

const fm = FileManager.iCloud();
const filePath = fm.joinPath(fm.documentsDirectory(), "xp.json");

if (!fm.fileExists(filePath)) {
  fm.writeString(filePath, JSON.stringify({ xp: 0, level: 1 }));
}

await fm.downloadFileFromiCloud(filePath);
let data = JSON.parse(fm.readString(filePath));

const gainedXP = 15;
data.xp += gainedXP;

let levelUp = false;
const xpToNextLevel = data.level * 120;

if (data.xp >= xpToNextLevel) {
  data.level += 1;
  data.SkillPoints += 1;
  levelUp = true;
}

fm.writeString(filePath, JSON.stringify(data));

let notif = new Notification();
notif.badge = 6;
notif.title = levelUp ? "LEVEL UP!" : "XP Gained!";
notif.subtitle = levelUp ? `You’ve reached Level ${data.level}!` : '';
notif.body = levelUp
  ? `\nYou are now more emotionally powerful.\nYou Gained 1 Skill Point for this!`
  : `Gained ${gainedXP} XP.\nTotal: ${data.xp} XP | Level: ${data.level} \nSkill Points Available: ${data.SkillPoints}`;
  
notif.addAction("Understood", "", 1)
notif.sound = "complete";
await notif.schedule();

Script.complete();
// end of the script.