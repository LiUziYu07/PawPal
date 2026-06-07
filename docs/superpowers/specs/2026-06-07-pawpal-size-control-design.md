# PawPal Size Control Design

## Goal

Add a user-facing control for PawPal's overall size. The control should scale the whole desktop pet experience together: pet image, speech bubble, focus badge, pointer hit area, and Electron pet window.

## User Experience

- Add a "PawPal size" preference in the Appearance section of Settings.
- Use a percentage slider matching the existing hover opacity slider pattern.
- Default size is 100%.
- Supported range is 75% to 150%, in 5% steps.
- Settings autosave through the existing debounced settings flow.

## Data Model

- Add `petScale: number` to `Settings`.
- Store the value as a decimal scale, for example `1` for 100% and `1.25` for 125%.
- Normalize persisted values to the allowed range so older or invalid store data cannot create unusable windows.

## Main Process Behavior

- Keep the current `PET_WINDOW` dimensions as the base size.
- Derive the live pet window size from `PET_WINDOW * petScale`.
- When settings change, resize the existing pet window and clamp it to the visible work area.
- Use the scaled window size for initial placement, dragging bounds, and break-run movement bounds.
- Preserve the saved relative screen position when possible, so changing size does not unexpectedly move PawPal off-screen.

## Renderer Behavior

- Pass `petScale` into the pet shell as a CSS custom property.
- Scale the whole `.pet-shell` layout from the base dimensions so the image, bubble, badge, and interactions remain visually aligned.
- Keep the hitbox logic working against the rendered scaled element.

## I18n

- Add labels for the new preference in Chinese and English.
- Display the current size as a rounded percentage.

## Validation

- Run TypeScript checking.
- Run the existing test script if available.
- Manually inspect the relevant size calculations in code paths for initial window creation, settings update, drag, and break-run movement.
