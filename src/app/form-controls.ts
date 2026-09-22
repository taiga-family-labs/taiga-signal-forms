import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';
import {
    type TuiCard,
    TuiInputCard,
    TuiInputCardGroup,
} from '@taiga-ui/addon-commerce';
import {
    TuiDay,
    TuiDayRange,
    TuiMonth,
    TuiMonthRange,
    TuiTime,
} from '@taiga-ui/cdk';
import {
    TuiButton,
    TuiCheckbox,
    TuiDropdown,
    TuiError,
    TuiInput,
    TuiRadio,
    TuiSlider,
    tuiValidationErrorsProvider,
} from '@taiga-ui/core';
import {type TuiCountryIsoCode} from '@taiga-ui/i18n';
import {
    TuiButtonSelect,
    TuiChevron,
    TuiComboBox,
    TuiCounter,
    TuiDataListWrapper,
    TuiFilter,
    type TuiFileLike,
    TuiFiles,
    TuiInputChip,
    TuiInputColor,
    TuiInputDate,
    TuiInputDateMulti,
    TuiInputDateRange,
    TuiInputDateTime,
    TuiInputInline,
    TuiInputMonth,
    TuiInputMonthRange,
    TuiInputNumber,
    TuiInputPhone,
    TuiInputPhoneInternational,
    TuiInputPin,
    TuiInputRange,
    TuiInputSlider,
    TuiInputTime,
    TuiInputYear,
    TuiPincode,
    TuiRadioList,
    TuiRange,
    TuiRating,
    TuiSelect,
    TuiSwitch,
    TuiTextarea,
    tuiInputPhoneInternationalOptionsProvider,
} from '@taiga-ui/kit';

interface DemoModel {
    readonly buttonSelect: string;
    readonly card: string;
    readonly cardGroup: TuiCard | null;
    readonly checkbox: boolean;
    readonly chips: string[];
    readonly color: string;
    readonly combo: string | null;
    readonly counter: number;
    readonly date: TuiDay | null;
    readonly dateMulti: TuiDay[];
    readonly dateRange: TuiDayRange | null;
    readonly dateTime: readonly [TuiDay, TuiTime | null] | null;
    readonly files: readonly TuiFileLike[];
    readonly filter: readonly string[];
    readonly inline: string;
    readonly inputRange: readonly [number, number];
    readonly inputSlider: number | null;
    readonly month: TuiMonth | null;
    readonly monthRange: TuiMonthRange | null;
    readonly number: number | null;
    readonly phone: string | null;
    readonly phoneInternational: string;
    readonly pin: string;
    readonly pincode: string;
    readonly radio: string;
    readonly radioList: string;
    readonly range: [number, number];
    readonly rating: number;
    readonly select: string | null;
    readonly slider: number;
    readonly switch: boolean;
    readonly text: string;
    readonly textarea: string;
    readonly time: TuiTime | null;
    readonly year: number | null;
}

@Component({
    selector: 'app-form-controls',
    imports: [
        FormField,
        JsonPipe,
        TuiButton,
        TuiButtonSelect,
        TuiCheckbox,
        TuiChevron,
        TuiComboBox,
        TuiCounter,
        TuiDataListWrapper,
        TuiDropdown,
        TuiError,
        TuiFiles,
        TuiFilter,
        TuiInput,
        TuiInputCard,
        TuiInputCardGroup,
        TuiInputChip,
        TuiInputColor,
        TuiInputDate,
        TuiInputDateMulti,
        TuiInputDateRange,
        TuiInputDateTime,
        TuiInputInline,
        TuiInputMonth,
        TuiInputMonthRange,
        TuiInputNumber,
        TuiInputPhone,
        TuiInputPhoneInternational,
        TuiInputPin,
        TuiInputRange,
        TuiInputSlider,
        TuiInputTime,
        TuiInputYear,
        TuiPincode,
        TuiRadio,
        TuiRadioList,
        TuiRange,
        TuiRating,
        TuiSelect,
        TuiSlider,
        TuiSwitch,
        TuiTextarea,
    ],
    template: `
        <div class="summary">
            <strong>36 form-related integrations</strong>
            <span>Every example below is bound with <code>[formField]</code>.</span>
        </div>

        <div class="grid">
            <article class="example">
                <h3>Input</h3>
                <tui-textfield>
                    <label tuiLabel>Text</label>
                    <input tuiInput [formField]="f.text" />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Checkbox</h3>
                <label class="inline-control">
                    <input tuiCheckbox type="checkbox" [formField]="f.checkbox" />
                    Native checkbox
                </label>
            </article>

            <article class="example">
                <h3>Radio</h3>
                <div class="stack">
                    <label class="inline-control">
                        <input
                            tuiRadio
                            type="radio"
                            value="One"
                            [formField]="$any(f.radio)"
                        />
                        One
                    </label>
                    <label class="inline-control">
                        <input
                            tuiRadio
                            type="radio"
                            value="Two"
                            [formField]="$any(f.radio)"
                        />
                        Two
                    </label>
                </div>
            </article>

            <article class="example">
                <h3>Slider</h3>
                <input
                    tuiSlider
                    type="range"
                    [formField]="$any(f.slider)"
                />
            </article>

            <article class="example">
                <h3>Switch</h3>
                <label class="inline-control">
                    <input tuiSwitch type="checkbox" [formField]="f.switch" />
                    Enabled
                </label>
            </article>

            <article class="example">
                <h3>Textarea</h3>
                <tui-textfield>
                    <label tuiLabel>Comment</label>
                    <textarea tuiTextarea [formField]="f.textarea"></textarea>
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Button Select</h3>
                <button
                    tuiButton
                    tuiButtonSelect
                    appearance="outline-grayscale"
                    [formField]="$any(f.buttonSelect)"
                >
                    {{ model().buttonSelect }}
                    <tui-data-list-wrapper
                        *tuiDropdown
                        [items]="people"
                    />
                </button>
            </article>

            <article class="example">
                <h3>ComboBox</h3>
                <tui-textfield tuiChevron>
                    <input tuiComboBox [formField]="$any(f.combo)" />
                    <tui-data-list-wrapper
                        *tuiDropdown
                        [items]="people"
                    />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Counter</h3>
                <tui-counter [formField]="$any(f.counter)" />
            </article>

            <article class="example">
                <h3>Filter</h3>
                <tui-filter
                    size="s"
                    [formField]="$any(f.filter)"
                    [items]="filters"
                />
            </article>

            <article class="example">
                <h3>Input Chip</h3>
                <tui-textfield multi>
                    <label tuiLabel>Tags</label>
                    <input tuiInputChip [formField]="$any(f.chips)" />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Color</h3>
                <tui-textfield>
                    <label tuiLabel>Color</label>
                    <input tuiInputColor [formField]="$any(f.color)" />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Date</h3>
                <tui-textfield>
                    <label tuiLabel>Date</label>
                    <input tuiInputDate [formField]="$any(f.date)" />
                    <tui-calendar *tuiDropdown />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Files</h3>
                <label tuiInputFiles>
                    <input
                        multiple
                        tuiInputFiles
                        [formField]="$any(f.files)"
                    />
                </label>
            </article>

            <article class="example">
                <h3>Input Month</h3>
                <tui-textfield>
                    <label tuiLabel>Month</label>
                    <input tuiInputMonth [formField]="$any(f.month)" />
                    <tui-calendar-month *tuiDropdown />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Month Range</h3>
                <tui-textfield>
                    <label tuiLabel>Month range</label>
                    <input
                        tuiInputMonthRange
                        [formField]="$any(f.monthRange)"
                    />
                    <tui-calendar-month *tuiDropdown />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Number + Error</h3>
                <tui-textfield>
                    <label tuiLabel>Amount</label>
                    <input tuiInputNumber [formField]="$any(f.number)" />
                </tui-textfield>
                <tui-error [formField]="$any(f.number)" />
            </article>

            <article class="example">
                <h3>Input Phone</h3>
                <tui-textfield>
                    <label tuiLabel>Phone</label>
                    <input tuiInputPhone [formField]="$any(f.phone)" />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Phone International</h3>
                <tui-textfield>
                    <input
                        tuiInputPhoneInternational
                        [countries]="countries"
                        [formField]="$any(f.phoneInternational)"
                        [(countryIsoCode)]="countryIsoCode"
                    />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Range</h3>
                <tui-input-range
                    [min]="0"
                    [max]="100"
                    [formField]="$any(f.inputRange)"
                >
                    Range
                </tui-input-range>
            </article>

            <article class="example">
                <h3>Input Time</h3>
                <tui-textfield>
                    <label tuiLabel>Time</label>
                    <input tuiInputTime [formField]="$any(f.time)" />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Year</h3>
                <tui-textfield>
                    <label tuiLabel>Year</label>
                    <input tuiInputYear [formField]="$any(f.year)" />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Pincode</h3>
                <tui-textfield>
                    <input tuiPincode [formField]="$any(f.pincode)" />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Radio List</h3>
                <tui-radio-list
                    [formField]="$any(f.radioList)"
                    [items]="radioItems"
                />
            </article>

            <article class="example">
                <h3>Range</h3>
                <tui-range [formField]="$any(f.range)" />
            </article>

            <article class="example">
                <h3>Rating</h3>
                <tui-rating [formField]="$any(f.rating)" />
            </article>

            <article class="example">
                <h3>Select</h3>
                <tui-textfield tuiChevron>
                    <label tuiLabel>User</label>
                    <input tuiSelect [formField]="$any(f.select)" />
                    <tui-data-list-wrapper
                        *tuiDropdown
                        [items]="people"
                    />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Card</h3>
                <tui-textfield>
                    <label tuiLabel>Card number</label>
                    <input tuiInputCard [formField]="$any(f.card)" />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Card Group</h3>
                <tui-input-card-group [formField]="$any(f.cardGroup)" />
            </article>

            <article class="example">
                <h3>Input Date Multi</h3>
                <tui-textfield multi>
                    <label tuiLabel>Dates</label>
                    <input
                        tuiInputDateMulti
                        [formField]="$any(f.dateMulti)"
                    />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Date Range</h3>
                <tui-textfield>
                    <label tuiLabel>Date range</label>
                    <input
                        tuiInputDateRange
                        [formField]="$any(f.dateRange)"
                    />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Date Time</h3>
                <tui-textfield>
                    <label tuiLabel>Date and time</label>
                    <input
                        tuiInputDateTime
                        [formField]="$any(f.dateTime)"
                    />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Inline</h3>
                <tui-input-inline>
                    <input [formField]="f.inline" />
                </tui-input-inline>
            </article>

            <article class="example">
                <h3>Input Pin</h3>
                <tui-textfield>
                    <input tuiInputPin [formField]="$any(f.pin)" />
                </tui-textfield>
            </article>

            <article class="example">
                <h3>Input Slider</h3>
                <tui-textfield>
                    <label tuiLabel>Value</label>
                    <input
                        tuiInputSlider
                        [formField]="$any(f.inputSlider)"
                    />
                </tui-textfield>
            </article>
        </div>

        <details class="model">
            <summary>Signal model</summary>
            <pre>{{ model() | json }}</pre>
        </details>
    `,
    styleUrl: './form-controls.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiValidationErrorsProvider({required: 'Required field'}),
        tuiInputPhoneInternationalOptionsProvider({
            metadata: import('libphonenumber-js/min/metadata').then((m) => m.default),
        }),
    ],
})
export class FormControls {
    protected readonly people = [
        'Alex Inkin',
        'Dmitriy Demenskiy',
        'Maxim Ivanov',
        'Nikita Barsukov',
    ];

    protected readonly filters = ['News', 'Food', 'Tech', 'Popular'];
    protected readonly radioItems = ['One', 'Two', 'Three'];
    protected readonly countries: readonly TuiCountryIsoCode[] = ['DE', 'RU', 'US'];
    protected readonly countryIsoCode = signal<TuiCountryIsoCode>('DE');

    protected readonly model = signal<DemoModel>({
        buttonSelect: this.people[0] ?? '',
        card: '',
        cardGroup: null,
        checkbox: true,
        chips: ['Angular', 'Taiga UI'],
        color: '#ffdd2d',
        combo: this.people[0] ?? null,
        counter: 2,
        date: null,
        dateMulti: [],
        dateRange: null,
        dateTime: null,
        files: [],
        filter: ['Food'],
        inline: 'Inline',
        inputRange: [20, 80],
        inputSlider: 50,
        month: null,
        monthRange: null,
        number: null,
        phone: '',
        phoneInternational: '',
        pin: '',
        pincode: '',
        radio: 'One',
        radioList: 'One',
        range: [20, 80],
        rating: 3,
        select: this.people[0] ?? null,
        slider: 50,
        switch: true,
        text: 'Taiga UI',
        textarea: 'Signal Forms',
        time: null,
        year: null,
    });

    protected readonly f = form(this.model, (path) => {
        required(path.number);
    });
}
