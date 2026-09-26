# Taiga UI × Angular Signal Forms

A compatibility lab for **Taiga UI 5.24.0** and **Angular 22.1.7 Signal Forms**.

Live demo: https://taiga-family-labs.github.io/taiga-signal-forms/

## What this checks

The demo separates three questions that are easy to mix together:

1. **Can the control bind through `[formField]`?**
2. **How complete is its public API compatibility with Signal Forms?**
3. **Has Taiga UI already prepared dedicated upstream Signal Forms coverage?**

A control can work in the live demo without having dedicated upstream coverage, and an upstream
test file can exist without being active in Taiga UI CI yet.

## Control matrix

The live lab currently covers **45 public form-control surfaces**.

### Signal Forms status

| Status | Meaning |
| --- | --- |
| **Upstream test prepared** | Taiga UI has a dedicated Signal Forms Cypress test source. These files are currently commented out until Taiga UI can require Angular 22. |
| **Live [formField]** | This repository compiles and renders the control with `[formField]`. |
| **Missing [formField] selector** | The control supports Angular forms, but its current Taiga UI directive selector does not activate for `[formField]`. |

### Support level

| Level | Meaning |
| --- | --- |
| **Full** | No known Signal Forms-specific conflict in the control's public API. |
| **Partial** | Value binding works, but part of the public API conflicts with Signal Forms metadata. |
| **Unsupported** | `[formField]` cannot currently activate the control. |

For Taiga UI 5.24.0, **Input Date Multi**, **Input Date Range**, **Input Range**, **Range**, and
**Textarea** are Partial because of the `min` / `max` / `minLength` / `maxLength` collision
tracked in angular/angular#70600.

**Table Control** is currently Unsupported because `TuiTableControlDirective` matches
`ngModel`, `formControl`, and `formControlName`, but not `formField`.

Native **Slider** remains Full. With Signal Forms its bounds belong in the form schema via
`min()` / `max()`, rather than template `[min]` / `[max]` next to `[formField]`.

## Integration surfaces

The page also tracks Signal Forms integrations that are not independent form values:

- `TuiError`
- `TuiNativeValidator`
- `TuiUnfinishedValidator`
- `TuiSearchHistory`

Their dedicated upstream Cypress sources are linked from the demo. At the moment those upstream
files are intentionally commented out because Taiga UI still supports Angular versions below 22.

## Why CVA compatibility is valid

Angular Signal Forms can interoperate with existing Angular form controls while libraries migrate
toward native Signal Forms control interfaces. Taiga UI's current `TuiControl` bridge contains
Signal Forms compatibility logic, while Taiga UI source documents a future migration toward
Angular's native control interfaces.

## Run locally

```bash
npm install
npm start
```

Production build:

```bash
npm run check
```

## GitHub Pages

CI builds every pull request. Changes merged into `main` are deployed with GitHub Pages.
