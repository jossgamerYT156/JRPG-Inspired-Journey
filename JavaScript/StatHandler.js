// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
// Read input from Shortcut
let stat = args.shortcutParameter;
if (!stat) {
  Script.setShortcutOutput("No stat selected.");
  Script.complete();
}
stat = stat.toLowerCase();

const validStats = ["mindfulness", "clarity", "reflection"];
if (!validStats.includes(stat)) {
  Script.setShortcutOutput("Invalid stat.");
  Script.complete();
}

const fm = FileManager.iCloud();
const file = fm.joinPath(fm.documentsDirectory(), "xp.json");

// If file doesn't exist, create it
if (!fm.fileExists(file)) {
  const defaultData = {
    xp: 0,
    level: 1,
    skillPoints: 0,
    mindfulness: 0,
    clarity: 0,
    reflection: 0
  };
  fm.writeString(file, JSON.stringify(defaultData));
}

await fm.downloadFileFromiCloud(file);
let data = JSON.parse(fm.readString(file));

const xp = Number(data.xp) || 0;
const level = Math.floor(xp / 15) + 1;

const spent = (data.mindfulness || 0) + (data.clarity || 0) + (data.reflection || 0);
const availablePoints = (level - 1) - spent;

function noSkillPointsAvailable (){
  Script.setShortcutOutput("No Stat Points Available\nSorry Darling, You cannot buy that skill just yet~");
  Script.complete();
}

if (availablePoints != 1) {
  noSkillPointsAvailable();
}
if (availablePoints < 0)
{
  noSkillPointsAvailable();
}

if (availablePoints <= -1){
  noSkillPointsAvailable();
}

// Add to stat and save
data[stat] = (data[stat] || 0) + 1;
data.SkillPoints -= 1;

fm.writeString(file, JSON.stringify(data));

const msg = `+1 ${stat.charAt(0).toUpperCase() + stat.slice(1)}!\n` +
            `Remaining Skill Points: ${data.SkillPoints}`;
Script.setShortcutOutput(msg);
Script.complete();