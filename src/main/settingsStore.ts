import { DEFAULT_SETTINGS } from "../shared/constants";
import { resolveLanguage } from "../shared/i18n";
import {
  hasRequiredCustomPetAssets,
  normalizeCustomPetAppearance,
  resolvePetAppearanceId
} from "../shared/petAppearances";
import type { Settings } from "../shared/types";

export type SettingsStore = {
  get(key: "settings"): Settings;
};

function normalizeNumber(value: unknown, fallback: number, min: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(min, Math.round(value));
}

function normalizeFiniteNumber(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

export function normalizeSettings(stored: Partial<Settings> = {}): Settings {
  const customPetAppearance = normalizeCustomPetAppearance(stored.customPetAppearance);
  const petAppearanceId = resolvePetAppearanceId(stored.petAppearanceId ?? DEFAULT_SETTINGS.petAppearanceId);

  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    language: resolveLanguage(stored.language ?? DEFAULT_SETTINGS.language),
    petHoverOpacity:
      typeof stored.petHoverOpacity === "number" && Number.isFinite(stored.petHoverOpacity)
        ? Math.max(0, Math.min(1, stored.petHoverOpacity))
        : DEFAULT_SETTINGS.petHoverOpacity,
    petScale: normalizeFiniteNumber(stored.petScale, DEFAULT_SETTINGS.petScale, 0.75, 1.5),
    petAppearanceId:
      petAppearanceId === "custom" && !hasRequiredCustomPetAssets(customPetAppearance)
        ? DEFAULT_SETTINGS.petAppearanceId
        : petAppearanceId,
    customPetAppearance,
    breakRunDurationSeconds: normalizeNumber(
      stored.breakRunDurationSeconds,
      DEFAULT_SETTINGS.breakRunDurationSeconds,
      10
    )
  };
}

export function getStoredSettings(store: SettingsStore): Settings {
  return normalizeSettings(store.get("settings"));
}
