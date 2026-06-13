import type { ClickThroughModifierKey, Settings, TodayStats } from "./types";

export const CLICK_THROUGH_MODIFIER_KEYS: readonly ClickThroughModifierKey[] = [
  "none",
  "option",
  "command",
  "shift",
  "control"
];

export function resolveClickThroughModifierKey(value: unknown): ClickThroughModifierKey {
  if (CLICK_THROUGH_MODIFIER_KEYS.includes(value as ClickThroughModifierKey)) {
    return value as ClickThroughModifierKey;
  }
  return "none";
}

export const DEFAULT_SETTINGS: Settings = {
  language: "zh-CN",
  petAppearanceId: "lineDog",
  petHoverOpacity: 0.2,
  petScale: 1,
  customPetAppearance: null,
  onboardingDismissed: false,
  launchAtLoginEnabled: false,
  checkUpdatesOnLaunchEnabled: false,
  breakReminderEnabled: true,
  breakIntervalMinutes: 45,
  breakRunDurationSeconds: 60,
  hydrationReminderEnabled: true,
  hydrationIntervalMinutes: 90,
  focusDurationMinutes: 25,
  distractionDetectionEnabled: false,
  distractionGraceSeconds: 8,
  distractionBlockedApps: [
    "Steam",
    "Discord",
    "Telegram",
    "WeChat",
    "QQ"
  ],
  distractionBlockedKeywords: [
    "youtube",
    "youtu.be",
    "twitter",
    "x.com",
    "instagram",
    "reddit",
    "tiktok",
    "netflix",
    "twitch",
    "facebook",
    "bilibili",
    "weibo",
    "douyin",
    "xiaohongshu",
    "zhihu",
    "douban",
    "taobao",
    "jd.com",
    "小红书",
    "微博",
    "抖音",
    "知乎",
    "豆瓣",
    "淘宝",
    "京东",
    "哔哩哔哩",
    "虎扑",
    "贴吧"
  ],
  clickThroughModifierKey: "none"
};

export function todayKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function createEmptyStats(date = todayKey()): TodayStats {
  return {
    date,
    breaksTaken: 0,
    watersLogged: 0,
    focusMinutes: 0,
    focusWarnings: 0
  };
}
