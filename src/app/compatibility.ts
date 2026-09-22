export type CompatibilityStatus = 'verified' | 'compatible' | 'not-applicable';
export type Integration = 'native' | 'cva' | 'composite' | 'validation' | 'not-applicable';

export interface CompatibilityRow {
    readonly name: string;
    readonly title: string;
    readonly integration: Integration;
    readonly status: CompatibilityStatus;
    readonly statusLabel: string;
    readonly note: string;
}

const COMPONENT_NAMES = [
    'accordion',
    'action-bar',
    'app-bar',
    'arc-chart',
    'avatar',
    'axes',
    'badge-notification',
    'badge',
    'badged-content',
    'bar-chart',
    'bar-set',
    'bar',
    'block-details',
    'block-status',
    'block',
    'bottom-sheet',
    'breadcrumbs',
    'button-group',
    'button-select',
    'button-x',
    'button',
    'calendar-experimental',
    'calendar-month',
    'calendar-range',
    'calendar',
    'card-collapsed',
    'card-large',
    'card-medium',
    'carousel',
    'cell',
    'checkbox',
    'chip',
    'combo-box',
    'comment',
    'compass',
    'confirm',
    'copy',
    'counter',
    'data-list-wrapper',
    'data-list',
    'dialog-routable',
    'dialog',
    'drawer',
    'elastic-container',
    'error',
    'expand',
    'file',
    'filter',
    'floating-container',
    'form',
    'group',
    'header',
    'icon',
    'input-card-group',
    'input-card',
    'input-chip',
    'input-color',
    'input-date-multi',
    'input-date-range',
    'input-date-time',
    'input-date',
    'input-files',
    'input-inline',
    'input-month-range',
    'input-month',
    'input-number',
    'input-phone-international',
    'input-phone',
    'input-pin',
    'input-range',
    'input-slider',
    'input-time',
    'input-year',
    'input',
    'item-group',
    'items-with-more',
    'keypad',
    'label',
    'legend-item',
    'like',
    'line-chart',
    'line-clamp',
    'line-days-chart',
    'link',
    'list',
    'loader',
    'message',
    'meter',
    'mobile-calendar',
    'navigation',
    'notification-middle',
    'notification',
    'pager',
    'pagination',
    'pdf-viewer',
    'pie-chart',
    'pin',
    'pincode',
    'popout',
    'preview',
    'progress-bar',
    'progress-circle',
    'pull-to-refresh',
    'pulse',
    'push',
    'radio-list',
    'radio',
    'range',
    'rating',
    'reorder',
    'ring-chart',
    'scroll-wheel',
    'scrollbar',
    'search-bar',
    'search',
    'segmented',
    'select',
    'services',
    'sheet-dialog',
    'shrink-wrap',
    'slider',
    'slides',
    'status',
    'stepper',
    'surface',
    'swipe-actions',
    'switch',
    'tab-bar',
    'table-filters',
    'table-pagination',
    'table',
    'tabs',
    'textarea',
    'thumbnail-card',
    'tiles',
    'timeline',
    'title',
    'toast',
    'tooltip',
    'tree',
    'utils',
] as const;

const VERIFIED = new Set<string>([
    'error',
    'input-files',
    'input-number',
    'input-phone-international',
    'input-range',
    'input',
    'pincode',
    'radio-list',
]);

const CVA = new Set<string>([
    'button-select',
    'combo-box',
    'counter',
    'filter',
    'input-card-group',
    'input-chip',
    'input-color',
    'input-date',
    'input-files',
    'input-month',
    'input-month-range',
    'input-number',
    'input-phone',
    'input-phone-international',
    'input-range',
    'input-time',
    'input-year',
    'pincode',
    'radio-list',
    'radio',
    'range',
    'rating',
    'select',
]);

const NATIVE = new Set<string>(['checkbox', 'input', 'slider', 'switch', 'textarea']);

const COMPOSITE = new Set<string>([
    'input-card',
    'input-date-multi',
    'input-date-range',
    'input-date-time',
    'input-inline',
    'input-pin',
    'input-slider',
]);

function title(name: string): string {
    return name
        .split('-')
        .map((part) => part[0]?.toUpperCase() + part.slice(1))
        .join(' ');
}

function integration(name: string): Integration {
    if (name === 'error') {
        return 'validation';
    }

    if (NATIVE.has(name)) {
        return 'native';
    }

    if (CVA.has(name)) {
        return 'cva';
    }

    if (COMPOSITE.has(name)) {
        return 'composite';
    }

    return 'not-applicable';
}

function note(name: string, kind: Integration, status: CompatibilityStatus): string {
    if (status === 'verified') {
        return 'Live [formField] demo here plus dedicated upstream Taiga UI Signal Forms Cypress coverage.';
    }

    if (kind === 'native') {
        return 'Live [formField] demo on the native form element.';
    }

    if (kind === 'cva') {
        return 'Live demo through Taiga TuiControl / ControlValueAccessor interoperability.';
    }

    if (kind === 'composite') {
        return 'Live demo through the component existing form-control bridge.';
    }

    if (kind === 'validation') {
        return 'Live tui-error[formField] integration.';
    }

    return 'This component is not a form value control, so Signal Forms binding is not applicable.';
}

export const COMPONENTS: readonly CompatibilityRow[] = COMPONENT_NAMES.map((name) => {
    const kind = integration(name);
    const status: CompatibilityStatus =
        kind === 'not-applicable' ? 'not-applicable' : VERIFIED.has(name) ? 'verified' : 'compatible';

    return {
        name,
        title: title(name),
        integration: kind,
        status,
        statusLabel:
            status === 'verified'
                ? 'Verified upstream'
                : status === 'compatible'
                  ? 'Live demo'
                  : 'N/A',
        note: note(name, kind, status),
    };
});
