# Taiga UI × Angular Signal Forms

A small compatibility lab for **Taiga UI 5.24.0** and **Angular 22.1.7 Signal Forms**.

The demo answers two different questions:

1. **Does Angular Signal Forms have an integration path for this Taiga UI component?**
2. **Is that path already covered by a dedicated upstream Taiga UI Signal Forms test?**

Those are intentionally separate. A component can be compatible through a native form element or
`ControlValueAccessor` without having a dedicated Signal Forms Cypress test yet.

## Statuses

| Status | Meaning |
| --- | --- |
| **Verified upstream** | Taiga UI already has a dedicated Signal Forms Cypress test for this integration |
| **Compatible path** | Angular 22 can bind through a native control, `TuiControl` / CVA, or an existing composite form-control bridge |
| **N/A** | The component does not represent a form value, so `[formField]` compatibility is not applicable |

## Why CVA compatibility is valid

Angular 22's `FormField` supports:

- native form controls;
- custom Signal Forms controls;
- existing `ControlValueAccessor` controls as a compatibility path.

Taiga UI's current `TuiControl` is still a `ControlValueAccessor`, and its implementation explicitly
handles the fake `NgControl` exposed by Signal Forms. Taiga UI also has a dedicated
`tui-error[formField]` integration. The source already documents the planned v6 migration to Angular's
native `FormValueControl`.

## Live smoke test

The top section is a live compatibility lab with **36 form-related integrations**. Every value control is bound through `[formField]`, covering native controls, `TuiControl` / CVA controls, composite controls, and `tui-error[formField]`.

## Run locally

```bash
npm install
npm start
```

Production build:

```bash
npm run check
```

## Scope

The table includes the current Taiga UI demo component catalog plus form controls that are present in
the packages but grouped differently in the documentation, such as `RadioList` and
`InputMonthRange`.

The matrix is intentionally conservative: only integrations with an upstream Signal Forms test are
marked **Verified upstream**. Everything else stays **Compatible path** until this repository adds an
explicit per-component smoke test.


## GitHub Pages

The CI workflow builds every pull request. After changes land in `main`, the same build artifact is deployed with the official GitHub Pages actions.
