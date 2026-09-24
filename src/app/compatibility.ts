export type CompatibilityStatus = 'verified' | 'live' | 'gap';

export interface CompatibilityRow {
    readonly id: string;
    readonly name: string;
    readonly package:
        | '@taiga-ui/core'
        | '@taiga-ui/kit'
        | '@taiga-ui/layout'
        | '@taiga-ui/addon-commerce'
        | '@taiga-ui/addon-mobile'
        | '@taiga-ui/addon-table';
    readonly status: CompatibilityStatus;
    readonly label: string;
    readonly testUrl?: string;
}

const UPSTREAM_TESTS: ReadonlyMap<string, string> = new Map([
    ['input', 'projects/demo-cypress/src/tests/input/signal-forms.cy.ts'],
    ['input-files', 'projects/demo-cypress/src/tests/input-files/signal-forms.cy.ts'],
    ['input-number', 'projects/demo-cypress/src/tests/input-number/signal-forms.cy.ts'],
    [
        'input-phone-international',
        'projects/demo-cypress/src/tests/input-phone-international/signal-forms.cy.ts',
    ],
    ['input-range', 'projects/demo-cypress/src/tests/input-range/signal-forms.cy.ts'],
    ['pincode', 'projects/demo-cypress/src/tests/pincode/signal-forms.cy.ts'],
    ['radio-list', 'projects/demo-cypress/src/tests/radio-list/signal-forms.cy.ts'],
]);

const CONTROLS = [
    ['input', 'Input', '@taiga-ui/core'],
    ['checkbox', 'Checkbox', '@taiga-ui/core'],
    ['radio', 'Radio', '@taiga-ui/core'],
    ['slider', 'Slider', '@taiga-ui/core'],

    ['block', 'Block', '@taiga-ui/kit'],
    ['button-select', 'Button Select', '@taiga-ui/kit'],
    ['combo-box', 'ComboBox', '@taiga-ui/kit'],
    ['counter', 'Counter', '@taiga-ui/kit'],
    ['filter', 'Filter', '@taiga-ui/kit'],
    ['input-chip', 'Input Chip', '@taiga-ui/kit'],
    ['input-color', 'Input Color', '@taiga-ui/kit'],
    ['input-date', 'Input Date', '@taiga-ui/kit'],
    ['input-date-multi', 'Input Date Multi', '@taiga-ui/kit'],
    ['input-date-range', 'Input Date Range', '@taiga-ui/kit'],
    ['input-date-time', 'Input Date Time', '@taiga-ui/kit'],
    ['input-files', 'Input Files', '@taiga-ui/kit'],
    ['input-inline', 'Input Inline', '@taiga-ui/kit'],
    ['input-month', 'Input Month', '@taiga-ui/kit'],
    ['input-month-range', 'Input Month Range', '@taiga-ui/kit'],
    ['input-number', 'Input Number', '@taiga-ui/kit'],
    ['input-phone', 'Input Phone', '@taiga-ui/kit'],
    ['input-phone-international', 'Input Phone International', '@taiga-ui/kit'],
    ['input-pin', 'Input Pin', '@taiga-ui/kit'],
    ['input-range', 'Input Range', '@taiga-ui/kit'],
    ['input-slider', 'Input Slider', '@taiga-ui/kit'],
    ['input-time', 'Input Time', '@taiga-ui/kit'],
    ['input-year', 'Input Year', '@taiga-ui/kit'],
    ['like', 'Like', '@taiga-ui/kit'],
    ['multi-select', 'MultiSelect', '@taiga-ui/kit'],
    ['pincode', 'Pincode', '@taiga-ui/kit'],
    ['radio-list', 'Radio List', '@taiga-ui/kit'],
    ['range', 'Range', '@taiga-ui/kit'],
    ['rating', 'Rating', '@taiga-ui/kit'],
    ['segmented', 'Segmented', '@taiga-ui/kit'],
    ['select', 'Select', '@taiga-ui/kit'],
    ['native-select', 'Native Select', '@taiga-ui/kit'],
    ['switch', 'Switch', '@taiga-ui/kit'],
    ['textarea', 'Textarea', '@taiga-ui/kit'],

    ['input-card', 'Input Card', '@taiga-ui/addon-commerce'],
    ['input-cvc', 'Input CVC', '@taiga-ui/addon-commerce'],
    ['input-expire', 'Input Expire', '@taiga-ui/addon-commerce'],
    ['input-card-group', 'Input Card Group', '@taiga-ui/addon-commerce'],

    ['search-bar', 'Search Bar', '@taiga-ui/addon-mobile'],
    ['input-search', 'Input Search', '@taiga-ui/layout'],

    ['table-control', 'Table Control', '@taiga-ui/addon-table'],
] as const;

export const COMPONENTS: readonly CompatibilityRow[] = CONTROLS.map(
    ([id, name, packageName]) => {
        const testPath = UPSTREAM_TESTS.get(id);
        const status: CompatibilityStatus =
            id === 'table-control' ? 'gap' : testPath ? 'verified' : 'live';

        return {
            id,
            name,
            package: packageName,
            status,
            label:
                status === 'verified'
                    ? 'Upstream tested'
                    : status === 'live'
                      ? 'Live [formField]'
                      : 'Missing [formField] selector',
            testUrl: testPath
                ? `https://github.com/taiga-family/taiga-ui/blob/main/${testPath}`
                : undefined,
        };
    },
);
