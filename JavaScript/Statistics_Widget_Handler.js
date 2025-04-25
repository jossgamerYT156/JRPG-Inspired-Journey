// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: magic;
const fm = FileManager.iCloud();
const path = fm.joinPath(fm.documentsDirectory(), "xp.json");
await fm.downloadFileFromiCloud(path);
const data = JSON.parse(fm.readString(path));

// Pull from saved level and XP
const xp = Number(data.xp) || 0;
const level = Number(data.level) || 1;

// XP to next level (based on your level formula)
const maxLevelXp = level * 120;
const currentLevelXp = xp % maxLevelXp;

// Build progress bar with emojis
function buildBar(current, total, emoji = "◆", empty = "◇", length = 15) {
  const filled = Math.round((current / total) * length);
  return emoji.repeat(filled) + empty.repeat(length - filled);
}

// Create Widget
let widget = new ListWidget();
widget.backgroundColor = new Color("#111111");

let title = widget.addText(`Lilly's Stats`);
title.font = Font.boldSystemFont(16);
title.textColor = Color.white();

widget.addText(`Level: ${level}`).textColor = Color.white();
widget.addText(`XP: ${currentLevelXp}/${maxLevelXp}`).textColor = Color.gray();
widget.addText(buildBar(currentLevelXp, maxLevelXp, "♦️", "▫️", 15));

// Stats
widget.addSpacer(6);
widget.addText(`🧠 Mindfulness: ${data.mindfulness || 0}`).textColor = Color.white();
widget.addText(`👁️ Clarity: ${data.clarity || 0}`).textColor = Color.white();
widget.addText(`⏳ Reflection: ${data.reflection || 0}`).textColor = Color.white();
widget.addSpacer();

if (data.SkillPoints <= 0){
  widget.addText(`💠 Skill Points: ${data.SkillPoints || 0}\nCANNOT BUY SKILLS WITHOUT SP's`).textColor = Color.red();
} else if (data.SkillPoints >= 0) {
  widget.addText(`💠 Skill Points: ${data.SkillPoints || 0}`).textColor = Color.green();
}

// Motivational footer
widget.addSpacer();
let footer = widget.addText(`Keep leveling up, darling!`);
footer.font = Font.italicSystemFont(10);
footer.textColor = new Color("#888");

Script.setWidget(widget);
Script.complete();