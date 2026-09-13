# Vertical Action Card

A compact, vertical Lovelace card with three interchangeable views for a single entity:

- **Switch / Toggle** — a vertical rocker-style on/off control
- **Slider** — a vertical fill slider (brightness, position, volume, temperature, humidity, numeric value…)
- **Preset** — the same vertical track, snapped to a small set of preset stops

Built for the **Sections** dashboard layout, with Home Assistant's own domain color scheme, and no runtime dependencies (Lit is bundled into the file).

---

## Installation

### HACS (custom repository)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=drmogie&repository=ha-vertical-action-card&category=plugin)

1. HACS → **Frontend** → ⋮ → **Custom repositories**.
2. Add this repository URL, category **Dashboard**.
3. Install **Vertical Action Card**, then reload your browser.

### Manual

[![Open your Home Assistant instance and show your dashboard resources.](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources/)

1. Copy `ha-vertical-action-card.js` to `<config>/www/ha-vertical-action-card/ha-vertical-action-card.js`.
2. Add it as a dashboard resource — click the badge above (or go to **Settings → Dashboards → ⋮ → Resources → Add resource**):
   - URL: `/local/ha-vertical-action-card/ha-vertical-action-card.js`
   - Type: **JavaScript Module**
3. Reload your browser.

---

## Adding the card

In a **Sections** view, add a card and search for **Vertical Action Card**, or use YAML:

```yaml
type: custom:ha-vertical-action-card
entity: light.living_room
```

The card occupies a minimum of **4 columns × 3 rows** in the section grid, and can be resized larger. The track's width is derived from its height via a fixed aspect ratio, so it scales proportionally with the card instead of looking like a thin bar on large grids.

---

## Supported entities

| View | Domains |
|---|---|
| Switch / Toggle | `light`, `switch`, `fan`, `input_boolean`, `humidifier`, `media_player`, `climate`, `water_heater`, `cover`, `valve` |
| Slider / Preset | `light` (brightness), `fan` (speed %), `cover` (position), `valve` (position), `media_player` (volume), `climate` (temperature), `humidifier` (humidity), `water_heater` (temperature), `number` (value), `input_number` (value) |

Only the views your entity's domain actually supports are shown — for example a `number` entity only ever offers Slider and Preset, never Switch.

`cover` and `valve` don't have a plain on/off state, so the Switch view targets a configurable **open position** instead of always fully opening:

- Tapping when closed opens the entity toward `cover_open_position` (default **50%**), using whichever control the entity actually supports: `cover.set_cover_position`, or `cover.set_cover_tilt_position` for tilt-only covers (e.g. "blind_tilt" devices), falling back to plain `open_cover`/`close_cover` (or their tilt equivalents) only if neither position control is available.
- Tapping when open sends it to the closed position (0%, or 100% if inverted).
- The switch reads as **closed** at/below 3% (or at/above 97% when inverted) and **open** otherwise, based purely on position - the thumb and icon never move until the position actually crosses that threshold, no matter what triggered the movement (the switch, the slider, or the preset buttons). The footer text, however, shows live **"Opening"/"Closing"** feedback straight from the device while it's mid-transition, settling to "Open"/"Closed" once it arrives - so you get immediate confirmation something is happening without the thumb itself bouncing.
- **Invert cover/valve close** flips the closed position from 0% to 100%, for devices that report position backwards. The open target stays at `cover_open_position` either way.
- The Slider and Preset views use the same detection, so a tilt-only cover slides its tilt instead of erroring on a position call it doesn't support.

---

## Configuration

All options are available in the visual editor. The **Views** and **Presets** sections are collapsed by default — click the heading to expand. YAML reference:

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | string | *required* | The entity to control. |
| `name` | string | *(entity's friendly name)* | Overrides the name shown above the control. |
| `show_name` | boolean | `true` | Show/hide the name. |
| `views` | list | all supported views | Enabled views, in cycling order. Double-clicking the card steps through this list. |
| `default_view` | string | `switch` | Which view is shown first (falls back automatically if unsupported by the entity). |
| `hide_state` | boolean | `false` | Hides the bottom state row (Switch: the on/off text; Slider/Preset: the icon + value). |
| `invert_cover_close` | boolean | `false` | `cover`/`valve` only — closed = 100% instead of 0%. |
| `cover_open_position` | number | `50` | `cover`/`valve` only — the position the Switch view opens to. |
| `double_click_speed` | number | `800` | Milliseconds allowed between two taps to count as a double-click. |
| `presets` | list of numbers | `[0, 50, 100]` | Percent stops used by the Preset view. Edit/add/remove in the editor. |

### Example

```yaml
type: custom:ha-vertical-action-card
entity: cover.garage_door
name: Garage
views:
  - switch
  - slider
default_view: switch
cover_open_position: 50
invert_cover_close: false
double_click_speed: 600
```

```yaml
type: custom:ha-vertical-action-card
entity: climate.bedroom
views:
  - slider
  - switch
default_view: slider
hide_state: false
```

---

## Interaction

The card has two gesture zones:

| Zone | Gesture | Action |
|---|---|---|
| **Control** (the track/thumb/icon itself) | Tap | Switch: toggles on/off. Slider: sets the value at the tapped height. |
| **Control** | Drag (Slider only) | Live-previews the value as you drag; releasing commits it with a single service call. |
| **Control** | Press and hold | Opens the entity's **more info** dialog. |
| **Card** (name, footer, padding — everywhere else in the card) | Double-click / double-tap | Cycles to the next enabled view. |

A single tap on the control acts immediately — there's no double-click to wait for there, since double-click only does something on the surrounding card area. Conversely, pressing and holding the surrounding card area doesn't open more-info; only holding the control itself does.

Preset buttons are their own thing: tapping one selects it directly. Double-click on the empty space around the buttons (not on a button) still cycles the view.

Because double-click only lives in the card zone, there's no delay on the control's tap actions — toggling or setting a value responds instantly.

---

## Colors

Colors follow Home Assistant's own theme variables (`--state-<domain>-active-color`, `--state-<domain>-inactive-color`, and the per-mode `--state-climate-<mode>-color` variables for climate), the same ones documented for [Home Assistant themes](https://www.home-assistant.io/integrations/frontend/#state-color). If your theme defines these, the card matches it automatically; otherwise it falls back to Home Assistant's documented default colors.

**Switch / Toggle view**, specifically, uses a single domain color at three fixed strengths:

- **Track** — 50% domain color, the same in both on and off states.
- **Thumb, on** — 100% domain color (full strength).
- **Thumb, off** — 75% domain color.
- **Icon**:
  - **On, `light` entities with color data** (`rgb_color`/`hs_color`/color temperature) — the bulb's *actual current color*.
  - **On, everything else** (or a color-less light) — solid white.
  - **Off** — white at 75% opacity.

**Missing entity**: if the configured entity doesn't exist, the card still renders as a switch, colored red (`--error-color`) using the same recipe (track 50%, thumb 70%, shown in the off/bottom position) with an `mdi:alert` icon, instead of a plain error message.

---

## Notes & assumptions

- **Presets** are stored as a percentage of the entity's range (e.g. 50% of a climate entity's min/max temperature), not raw domain values, so the same preset list behaves consistently across different entity types.
- **Toggling `climate`/`water_heater`** uses the generic `homeassistant.toggle` service, which requires the underlying integration to support `turn_on`/`turn_off`. Most current integrations do; a handful of older/legacy ones may not — for those, use the Slider view or the more-info dialog instead.
- **Missing entity**: shown as displayed in the off position, since that reads as the more "inactive" of the two — let me know if you'd rather it default to the on/top position instead.
- Press-and-hold uses a fixed ~550ms threshold (not configurable, per the spec only double-click speed was called out as a setting).

---

## License

MIT
