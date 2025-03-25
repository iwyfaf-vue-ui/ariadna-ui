# Ariadna UI Playground
Документация UI-Kit для проекта Ariadna UI Playground.

## Breakpoints
В проекте доступно 4 миксинов для медиа-запросов:

```
{
  "sm": {
    "width": "640px"
  },
  "md": {
    "width": "768px"
  },
  "lg": {
    "width": "1024px"
  },
  "xl": {
    "width": "1280px"
  }
}
```

Применение медиа-запросов:

<table class="table" style="width: 100%">
  <thead>
  <tr>
    <th>Mixin</th>
    <th>Description</th>
  </tr>
  </thead>
  <tbody>
  
<tr>
<td><code>@include sm;</code></td>
<td><code>@media (min-width: 640px) { ... }</code></td>
</tr>

<tr>
<td><code>@include md;</code></td>
<td><code>@media (min-width: 768px) { ... }</code></td>
</tr>

<tr>
<td><code>@include lg;</code></td>
<td><code>@media (min-width: 1024px) { ... }</code></td>
</tr>

<tr>
<td><code>@include xl;</code></td>
<td><code>@media (min-width: 1280px) { ... }</code></td>
</tr>

  </tbody>
</table>

## Grid
```
@include grid(parameters);
```

Parameters:

* `$columns-sm` - количество колонок на медиа-запросе `sm`.
* `$columns-md` - количество колонок на медиа-запросе `md`.
* `$columns-lg` - количество колонок на медиа-запросе `lg`.
* `$columns-xl` - количество колонок на медиа-запросе `xl`.

## Themes
Всего тем в проекте: 2.

### Light

CSS переменные темы `theme-light`:

```
--color-text-default: #1e1f21;
--color-text-default-foreground: #fff;
--color-text-default-disabled: #afabac;
--color-text-default-weak: #6d6e6f;
--color-text-primary: #3f6ac4;
--color-text-primary-hover: #4464bb;
--color-text-primary-strong: #fff;
--color-text-secondary: #6e66b1;
--color-text-secondary-hover: #5e57a0;
--color-text-secondary-strong: #fff;
--color-text-success: #0d7f56;
--color-text-success-hover: #12714d;
--color-text-success-strong: #fff;
--color-text-warning: #986516;
--color-text-warning-hover: #805411;
--color-text-warning-strong: #1e1f21;
--color-text-danger: #c92f54;
--color-text-danger-hover: #a42b45;
--color-text-danger-strong: #fff;
--color-text-selected: #3f6ac4;
--color-text-selected-hover: #4464bb;
--color-text-selected-strong: #fff;
--color-icon-default: #6d6e6f;
--color-icon-default-foreground: #fff;
--color-icon-default-hover: #1e1f21;
--color-icon-default-active: #1e1f21;
--color-icon-default-disabled: #afabac;
--color-icon-default-strong: #6d6e6f;
--color-icon-primary: #3f6ac4;
--color-icon-primary-strong: #fff;
--color-icon-secondary: #8d84e8;
--color-icon-secondary-hover: #7d75c8;
--color-icon-secondary-strong: #fff;
--color-icon-success: #58a182;
--color-icon-success-hover: #368e6a;
--color-icon-success-strong: #fff;
--color-icon-warning: #f1bd6c;
--color-icon-warning-hover: #b58e53;
--color-icon-warning-strong: #1e1f21;
--color-icon-danger: #de5f73;
--color-icon-danger-hover: #d33e5d;
--color-icon-danger-strong: #fff;
--color-icon-selected: #3f6ac4;
--color-icon-selected-strong: #fff;
--color-border-default: #edeae9;
--color-border-default-hover: #afabac;
--color-border-default-active: #6d6e6f;
--color-border-default-strong: #cfcbcb;
--color-border-primary: #3f6ac4;
--color-border-secondary: #8d84e8;
--color-border-secondary-hover: #726ab9;
--color-border-secondary-active: #726ab9;
--color-border-success: #8dc2ac;
--color-border-success-hover: #58a182;
--color-border-success-active: #58a182;
--color-border-warning: #f1bd6c;
--color-border-warning-hover: #b58e53;
--color-border-danger: #f1a2a9;
--color-border-danger-hover: #e37281;
--color-border-danger-active: #e37281;
--color-border-selected: #3f6ac4;
--color-border-selected-hover: #3f6ac4;
--color-border-selected-active: #3f6ac4;
--color-background-default-weak: #fff;
--color-background-default-medium: #f9f8f8;
--color-background-default-strong: #f5f3f3;
--color-background-default-hover: rgb(55 23 23 / 3%);;
--color-background-default-active: rgb(55 23 23 / 5%);
--color-background-primary: #4573d2;
--color-background-primary-strong-hover: #426dc6;
--color-background-primary-strong-active: #3f66ba;
--color-background-secondary: #f6f4fd;
--color-background-secondary-hover: #eae8fb;
--color-background-secondary-active: #e0def9;
--color-background-secondary-strong: #736bc4;
--color-background-secondary-strong-hover: #6860b0;
--color-background-secondary-strong-active: #5e57a0;
--color-background-success: #e6f8f1;
--color-background-success-hover: #e0f4ec;
--color-background-success-active: #cce8dd;
--color-background-success-strong: #58a182;
--color-background-success-strong-hover: #519d7d;
--color-background-success-strong-active: #3f9470;
--color-background-warning: #fff6ee;
--color-background-warning-hover: #ffecda;
--color-background-warning-active: #fedcb6;
--color-background-warning-strong: #f1bd6c;
--color-background-warning-strong-hover: #e8b668;
--color-background-warning-strong-active: #e2b266;
--color-background-danger: #fef0f1;
--color-background-danger-hover: #fcdadc;
--color-background-danger-active: #f9c6ca;
--color-background-danger-strong: #d33e5d;
--color-background-danger-strong-hover: #c92f54;
--color-background-danger-strong-active: #a42b45;
--color-background-selected: #f1f2fc;
--color-background-selected-hover: #e7e9fc;
--color-background-selected-active: #dbe0fd;
--color-background-selected-strong: #4573d2;
--color-background-selected-strong-hover: #426dc6;
--color-background-selected-strong-active: #3f66ba;
--color-shadow-default-small: rgb(109 110 111 / 8%);
--color-shadow-default-medium: rgb(109 110 111 / 10%);
--color-shadow-default-large: rgb(109 110 111 / 12%);

```

### Dark

CSS переменные темы `theme-dark`:

```
--color-text-default: #f5f4f3;
--color-text-default-foreground: #f5f4f3;
--color-text-default-disabled: #6a696a;
--color-text-default-weak: #a2a0a2;
--color-text-primary: #689af3;
--color-text-primary-hover: #5688e5;
--color-text-primary-strong: #fff;
--color-text-secondary: #a499ed;
--color-text-secondary-hover: #b6adf1;
--color-text-secondary-strong: #fff;
--color-text-success: #66a88b;
--color-text-success-hover: #93c0aa;
--color-text-success-strong: #fff;
--color-text-warning: #f1bd6c;
--color-text-warning-hover: #f6c682;
--color-text-warning-strong: #1e1f21;
--color-text-danger: #eb7586;
--color-text-danger-hover: #ec8e98;
--color-text-danger-strong: #fff;
--color-text-selected: #689af3;
--color-text-selected-hover: #5688e5;
--color-text-selected-strong: #fff;
--color-icon-default: #a2a0a2;
--color-icon-default-foreground: #f5f4f3;
--color-icon-default-hover: #f5f4f3;
--color-icon-default-active: #f5f4f3;
--color-icon-default-disabled: #6a696a;
--color-icon-default-strong: #f5f4f3;
--color-icon-primary: #4573d2;
--color-icon-primary-strong: #fff;
--color-icon-secondary: #a499ed;
--color-icon-secondary-hover: #b6adf1;
--color-icon-secondary-strong: #fff;
--color-icon-success: #5da283;
--color-icon-success-hover: #74af93;
--color-icon-success-strong: #fff;
--color-icon-warning: #f1bd6c;
--color-icon-warning-hover: #f6c682;
--color-icon-warning-strong: #1e1f21;
--color-icon-danger: #d1395a;
--color-icon-danger-hover: #eb7586;
--color-icon-danger-strong: #fff;
--color-icon-selected: #4573d2;
--color-icon-selected-strong: #fff;
--color-border-default: #424244;
--color-border-default-hover: #6a696a;
--color-border-default-active: #a2a0a2;
--color-border-default-strong: #565557;
--color-border-primary: #4573d2;
--color-border-secondary: #726ab9;
--color-border-secondary-hover: #a499ed;
--color-border-secondary-active: #a499ed;
--color-border-success: #32695d;
--color-border-success-hover: #4b8a73;
--color-border-success-active: #4b8a73;
--color-border-warning: #735c38;
--color-border-warning-hover: #b89054;
--color-border-danger: #b12d4b;
--color-border-danger-hover: #d1395a;
--color-border-danger-active: #d1395a;
--color-border-selected: #4573d2;
--color-border-selected-hover: #4573d2;
--color-border-selected-active: #4573d2;
--color-background-default-weak: #1e1f21;
--color-background-default-medium: #252628;
--color-background-default-strong: #2a2b2d;
--color-background-default-hover: rgb(255 255 255 / 6%);
--color-background-default-active: rgb(255 255 255 / 11%);
--color-background-primary: #4573d2;
--color-background-primary-strong-hover: #426dc6;
--color-background-primary-strong-active: #3f66ba;
--color-background-secondary: #332f50;
--color-background-secondary-hover: #3c3766;
--color-background-secondary-active: #443f74;
--color-background-secondary-strong: #736bc4;
--color-background-secondary-strong-hover: #6860b0;
--color-background-secondary-strong-active: #5e57a0;
--color-background-success: #1d3733;
--color-background-success-hover: #21433d;
--color-background-success-active: #244d46;
--color-background-success-strong: #5da283;
--color-background-success-strong-hover: #89baa2;
--color-background-success-strong-active: #93c0aa;
--color-background-warning: #3d3120;
--color-background-warning-hover: #493b26;
--color-background-warning-active: #54432b;
--color-background-warning-strong: #f1bd6c;
--color-background-warning-strong-hover: #e8b668;
--color-background-warning-strong-active: #e2b266;
--color-background-danger: #581e28;
--color-background-danger-hover: #64202c;
--color-background-danger-active: #6e2230;
--color-background-danger-strong: #d1395a;
--color-background-danger-strong-hover: #b12d4b;
--color-background-danger-strong-active: #99203c;
--color-background-selected: #172237;
--color-background-selected-hover: #1a2843;
--color-background-selected-active: #2a3c68;
--color-background-selected-strong: #4573d2;
--color-background-selected-strong-hover: #426dc6;
--color-background-selected-strong-active: #3f66ba;
--color-shadow-default-small: rgb(0 0 0 / 24%);
--color-shadow-default-medium: rgb(0 0 0 / 24%);
--color-shadow-default-large: rgb(0 0 0 / 24%);

```

## Utilities
Набор утилитарных CSS переменных.

### Fonts
Объект `fonts` содержит следующие миксины:

#### Fonts Size
```
@include fonts-size;
```

CSS переменные миксина `fonts-size`:

```
--fonts-size-h1: 48px;
--fonts-size-h2: 36px;
--fonts-size-h3: 24px;
--fonts-size-h4: 20px;
--fonts-size-h5: 16px;
--fonts-size-t1: 20px;
--fonts-size-t2: 16px;
--fonts-size-t3: 14px;
--fonts-size-t4: 12px;

```
#### Fonts Weight
```
@include fonts-weight;
```

CSS переменные миксина `fonts-weight`:

```
--fonts-weight-h1: 600;
--fonts-weight-h2: 600;
--fonts-weight-h3: 600;
--fonts-weight-h4: 600;
--fonts-weight-h5: 600;
--fonts-weight-t1: 400;
--fonts-weight-t2: 400;
--fonts-weight-t3: 400;
--fonts-weight-t4: 400;

```
#### Fonts Height
```
@include fonts-height;
```

CSS переменные миксина `fonts-height`:

```
--fonts-height-h1: 56px;
--fonts-height-h2: 40px;
--fonts-height-h3: 24px;
--fonts-height-h4: 28px;
--fonts-height-h5: 20px;
--fonts-height-t1: 28px;
--fonts-height-t2: 24px;
--fonts-height-t3: 22px;
--fonts-height-t4: 18px;

```
### Indents
Объект `indents` содержит следующие миксины:

#### Indents Padding
```
@include indents-padding;
```

CSS переменные миксина `indents-padding`:

```
--indents-padding-small: 4px;
--indents-padding-medium: 8px;
--indents-padding-large: 12px;
--indents-padding-xlarge: 16px;

```
#### Indents Margin
```
@include indents-margin;
```

CSS переменные миксина `indents-margin`:

```
--indents-margin-small: 4px;
--indents-margin-medium: 8px;
--indents-margin-large: 12px;
--indents-margin-xlarge: 16px;

```
### Radius
Объект `radius` содержит следующие миксины:

#### Radius Default
```
@include radius-default;
```

CSS переменные миксина `radius-default`:

```
--radius-default-small: 4px;
--radius-default-medium: 6px;
--radius-default-large: 8px;
--radius-default-xlarge: 12px;

```
### Transition
Объект `transition` содержит следующие миксины:

#### Transition Default
```
@include transition-default;
```

CSS переменные миксина `transition-default`:

```
--transition-default-linear: 0.2s linear;
--transition-default-ease: 0.2s ease;
--transition-default-easein: 0.2s cubic-bezier(0.4, 0, 1, 1);
--transition-default-easeout: 0.2s cubic-bezier(0.2, 0, 0, 1);
--transition-default-easeinout: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

```
