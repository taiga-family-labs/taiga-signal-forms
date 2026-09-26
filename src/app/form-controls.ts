import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {form, FormField, max, min, required} from '@angular/forms/signals';
import {
    type TuiCard,
    TuiInputCard,
    TuiInputCardGroup,
} from '@taiga-ui/addon-commerce';
import {TuiSearchBar} from '@taiga-ui/addon-mobile';
import {TuiTable, TuiTableControl} from '@taiga-ui/addon-table';
import {
    TuiDay,
    TuiDayRange,
    TuiMonth,
    TuiMonthRange,
    TuiTime,
    TUI_PLATFORM,
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
    TuiBlock,
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
    TuiLike,
    TuiMultiSelect,
    TuiPincode,
    TuiRadioList,
    TuiRange,
    TuiRating,
    TuiSegmented,
    TuiSelect,
    TuiSwitch,
    TuiTextarea,
    tuiInputPhoneInternationalOptionsProvider,
} from '@taiga-ui/kit';
import {TuiInputSearch} from '@taiga-ui/layout';

interface DemoModel {
    readonly block: boolean;
    readonly buttonSelect: string;
    readonly card: string;
    readonly cardGroup: TuiCard | null;
    readonly checkbox: boolean;
    readonly chips: string[];
    readonly color: string;
    readonly combo: string | null;
    readonly counter: number;
    readonly cvc: string;
    readonly date: TuiDay | null;
    readonly dateMulti: TuiDay[];
    readonly dateRange: TuiDayRange | null;
    readonly dateTime: readonly [TuiDay, TuiTime | null] | null;
    readonly expire: string;
    readonly files: readonly TuiFileLike[];
    readonly filter: readonly string[];
    readonly inline: string;
    readonly inputRange: readonly [number, number];
    readonly inputSearch: string;
    readonly inputSlider: number | null;
    readonly like: boolean;
    readonly month: TuiMonth | null;
    readonly monthRange: TuiMonthRange | null;
    readonly multiSelect: string[];
    readonly nativeSelect: string | null;
    readonly number: number | null;
    readonly phone: string | null;
    readonly phoneInternational: string;
    readonly pin: string;
    readonly pincode: string;
    readonly radio: string;
    readonly radioList: string;
    readonly range: [number, number];
    readonly searchBar: string;
    readonly segmented: string;
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
        ReactiveFormsModule,
        TuiBlock,
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
        TuiInputSearch,
        TuiInputSlider,
        TuiInputTime,
        TuiInputYear,
        TuiLike,
        TuiMultiSelect,
        TuiPincode,
        TuiRadio,
        TuiRadioList,
        TuiRange,
        TuiRating,
        TuiSearchBar,
        TuiSegmented,
        TuiSelect,
        TuiSlider,
        TuiSwitch,
        TuiTable,
        TuiTableControl,
        TuiTextarea,
    ],
    template: `
        <div class="summary">
            <strong>44 live controls + 1 known gap</strong>
            <span>Live controls below use <code>[formField]</code>; Table Control shows the current v5 selector gap.</span>
        </div>

        <div class="grid">
            <article class="example" id="input">
                <h3>Input</h3>
                <tui-textfield>
                    <label tuiLabel>Text</label>
                    <input tuiInput [formField]="f.text" />
                </tui-textfield>
            </article>

            <article class="example" id="checkbox">
                <h3>Checkbox</h3>
                <label class="inline-control">
                    <input tuiCheckbox type="checkbox" [formField]="f.checkbox" />
                    Native checkbox
                </label>
            </article>

            <article class="example" id="block">
                <h3>Block</h3>
                <label tuiBlock="m">
                    Block option
                    <input
                        tuiCheckbox
                        type="checkbox"
                        [formField]="f.block"
                    />
                </label>
            </article>

            <article class="example" id="like">
                <h3>Like</h3>
                <label class="inline-control">
                    <input tuiLike type="checkbox" [formField]="f.like" />
                    Favorite
                </label>
            </article>

            <article class="example" id="radio">
                <h3>Radio</h3>
                <div class="stack">
                    <label class="inline-control">
                        <input
                            tuiRadio
                            type="radio"
                            value="One"
                            [formField]="f.radio"
                        />
                        One
                    </label>
                    <label class="inline-control">
                        <input
                            tuiRadio
                            type="radio"
                            value="Two"
                            [formField]="f.radio"
                        />
                        Two
                    </label>
                </div>
            </article>

            <article class="example" id="segmented">
                <h3>Segmented</h3>
                <tui-segmented>
                    @for (item of radioItems; track item) {
                        <label>
                            <input
                                type="radio"
                                [value]="item"
                                [formField]="f.segmented"
                            />
                            {{ item }}
                        </label>
                    }
                </tui-segmented>
            </article>

            <article class="example" id="slider">
                <h3>Slider</h3>
                <input
                    tuiSlider
                    type="range"
                    [formField]="f.slider"
                />
            </article>

            <article class="example" id="switch">
                <h3>Switch</h3>
                <label class="inline-control">
                    <input tuiSwitch type="checkbox" [formField]="f.switch" />
                    Enabled
                </label>
            </article>

            <article class="example" id="textarea">
                <h3>Textarea</h3>
                <tui-textfield>
                    <label tuiLabel>Comment</label>
                    <textarea tuiTextarea [formField]="f.textarea"></textarea>
                </tui-textfield>
            </article>

            <article class="example" id="button-select">
                <h3>Button Select</h3>
                <button
                    tuiButton
                    tuiButtonSelect
                    appearance="outline-grayscale"
                    [formField]="f.buttonSelect"
                >
                    {{ model().buttonSelect }}
                    <tui-data-list-wrapper
                        *tuiDropdown
                        [items]="people"
                    />
                </button>
            </article>

            <article class="example" id="combo-box">
                <h3>ComboBox</h3>
                <tui-textfield tuiChevron>
                    <input tuiComboBox [formField]="f.combo" />
                    <tui-data-list-wrapper
                        *tuiDropdown
                        [items]="people"
                    />
                </tui-textfield>
            </article>

            <article class="example" id="counter">
                <h3>Counter</h3>
                <tui-counter [formField]="f.counter" />
            </article>

            <article class="example" id="filter">
                <h3>Filter</h3>
                <tui-filter
                    size="s"
                    [formField]="f.filter"
                    [items]="filters"
                />
            </article>

            <article class="example" id="input-chip">
                <h3>Input Chip</h3>
                <tui-textfield multi>
                    <label tuiLabel>Tags</label>
                    <input tuiInputChip [formField]="f.chips" />
                </tui-textfield>
            </article>

            <article class="example" id="input-color">
                <h3>Input Color</h3>
                <tui-textfield>
                    <label tuiLabel>Color</label>
                    <input tuiInputColor [formField]="f.color" />
                </tui-textfield>
            </article>

            <article class="example" id="input-date">
                <h3>Input Date</h3>
                <tui-textfield>
                    <label tuiLabel>Date</label>
                    <input tuiInputDate [formField]="f.date" />
                    <tui-calendar *tuiDropdown />
                </tui-textfield>
            </article>

            <article class="example" id="input-files">
                <h3>Input Files</h3>
                <label tuiInputFiles>
                    <input
                        multiple
                        tuiInputFiles
                        [formField]="f.files"
                    />
                </label>
            </article>

            <article class="example" id="input-month">
                <h3>Input Month</h3>
                <tui-textfield>
                    <label tuiLabel>Month</label>
                    <input tuiInputMonth [formField]="f.month" />
                    <tui-calendar-month *tuiDropdown />
                </tui-textfield>
            </article>

            <article class="example" id="input-month-range">
                <h3>Input Month Range</h3>
                <tui-textfield>
                    <label tuiLabel>Month range</label>
                    <input
                        tuiInputMonthRange
                        [formField]="f.monthRange"
                    />
                    <tui-calendar-month *tuiDropdown />
                </tui-textfield>
            </article>

            <article class="example" id="input-number">
                <h3>Input Number + Error</h3>
                <tui-textfield>
                    <label tuiLabel>Amount</label>
                    <input tuiInputNumber [formField]="f.number" />
                </tui-textfield>
                <tui-error [formField]="f.number" />
            </article>

            <article class="example" id="input-phone">
                <h3>Input Phone</h3>
                <tui-textfield>
                    <label tuiLabel>Phone</label>
                    <input tuiInputPhone [formField]="f.phone" />
                </tui-textfield>
            </article>

            <article class="example" id="input-phone-international">
                <h3>Input Phone International</h3>
                <tui-textfield>
                    <input
                        tuiInputPhoneInternational
                        [countries]="countries"
                        [formField]="f.phoneInternational"
                        [(countryIsoCode)]="countryIsoCode"
                    />
                </tui-textfield>
            </article>

            <article class="example" id="input-range">
                <h3>Input Range</h3>
                <tui-input-range
                    [min]="0"
                    [max]="100"
                    [formField]="f.inputRange"
                >
                    Range
                </tui-input-range>
            </article>

            <article class="example" id="input-time">
                <h3>Input Time</h3>
                <tui-textfield>
                    <label tuiLabel>Time</label>
                    <input tuiInputTime [formField]="f.time" />
                </tui-textfield>
            </article>

            <article class="example" id="input-year">
                <h3>Input Year</h3>
                <tui-textfield>
                    <label tuiLabel>Year</label>
                    <input tuiInputYear [formField]="f.year" />
                </tui-textfield>
            </article>

            <article class="example" id="pincode">
                <h3>Pincode</h3>
                <tui-textfield>
                    <input tuiPincode [formField]="f.pincode" />
                </tui-textfield>
            </article>

            <article class="example" id="radio-list">
                <h3>Radio List</h3>
                <tui-radio-list
                    [formField]="f.radioList"
                    [items]="radioItems"
                />
            </article>

            <article class="example" id="range">
                <h3>Range</h3>
                <tui-range [formField]="f.range" />
            </article>

            <article class="example" id="rating">
                <h3>Rating</h3>
                <tui-rating [formField]="f.rating" />
            </article>

            <article class="example" id="select">
                <h3>Select</h3>
                <tui-textfield tuiChevron>
                    <label tuiLabel>User</label>
                    <input tuiSelect [formField]="f.select" />
                    <tui-data-list-wrapper
                        *tuiDropdown
                        [items]="people"
                    />
                </tui-textfield>
            </article>

            <article class="example" id="native-select">
                <h3>Native Select</h3>
                <tui-textfield tuiChevron>
                    <select
                        tuiSelect
                        [items]="people"
                        [formField]="f.nativeSelect"
                    ></select>
                </tui-textfield>
            </article>

            <article class="example" id="multi-select">
                <h3>MultiSelect</h3>
                <tui-textfield multi tuiChevron>
                    <select
                        tuiMultiSelect
                        [items]="[people]"
                        [formField]="f.multiSelect"
                    ></select>
                </tui-textfield>
            </article>

            <article class="example" id="input-card">
                <h3>Input Card</h3>
                <tui-textfield>
                    <label tuiLabel>Card number</label>
                    <input tuiInputCard [formField]="f.card" />
                </tui-textfield>
            </article>

            <article class="example" id="input-expire">
                <h3>Input Expire</h3>
                <tui-textfield>
                    <label tuiLabel>Expires</label>
                    <input tuiInputExpire [formField]="f.expire" />
                </tui-textfield>
            </article>

            <article class="example" id="input-cvc">
                <h3>Input CVC</h3>
                <tui-textfield>
                    <label tuiLabel>CVC</label>
                    <input tuiInputCVC [formField]="f.cvc" />
                </tui-textfield>
            </article>

            <article class="example" id="input-card-group">
                <h3>Input Card Group</h3>
                <tui-input-card-group [formField]="f.cardGroup" />
            </article>

            <article class="example" id="input-date-multi">
                <h3>Input Date Multi</h3>
                <tui-textfield multi>
                    <label tuiLabel>Dates</label>
                    <input
                        tuiInputDateMulti
                        [formField]="f.dateMulti"
                    />
                </tui-textfield>
            </article>

            <article class="example" id="input-date-range">
                <h3>Input Date Range</h3>
                <tui-textfield>
                    <label tuiLabel>Date range</label>
                    <input
                        tuiInputDateRange
                        [formField]="f.dateRange"
                    />
                </tui-textfield>
            </article>

            <article class="example" id="input-date-time">
                <h3>Input Date Time</h3>
                <tui-textfield>
                    <label tuiLabel>Date and time</label>
                    <input
                        tuiInputDateTime
                        [formField]="f.dateTime"
                    />
                </tui-textfield>
            </article>

            <article class="example" id="input-inline">
                <h3>Input Inline</h3>
                <tui-input-inline>
                    <input [formField]="f.inline" />
                </tui-input-inline>
            </article>

            <article class="example" id="input-pin">
                <h3>Input Pin</h3>
                <tui-textfield>
                    <input tuiInputPin [formField]="f.pin" />
                </tui-textfield>
            </article>

            <article class="example" id="input-slider">
                <h3>Input Slider</h3>
                <tui-textfield>
                    <label tuiLabel>Value</label>
                    <input
                        tuiInputSlider
                        [formField]="f.inputSlider"
                    />
                    <input tuiSlider type="range" />
                </tui-textfield>
            </article>

            <article class="example" id="search-bar">
                <h3>Search Bar</h3>
                <search tuiSearchBar>
                    <input
                        placeholder="Search"
                        tuiSearchBar
                        [formField]="f.searchBar"
                    />
                </search>
            </article>

            <article class="example" id="input-search">
                <h3>Input Search</h3>
                <tui-textfield>
                    <label tuiLabel>Search</label>
                    <input
                        [formField]="f.inputSearch"
                        [tuiInputSearch]="searchContent"
                    />
                    <ng-template #searchContent>
                        <div class="search-preview">
                            Search overlay content
                        </div>
                    </ng-template>
                </tui-textfield>
            </article>

            <article class="example example_gap" id="table-control">
                <h3>
                    Table Control
                    <span class="gap-badge">selector gap</span>
                </h3>
                <p class="gap-copy">
                    Taiga UI v5 currently matches only
                    <code>[ngModel]</code>, <code>[formControl]</code> and
                    <code>[formControlName]</code>, not <code>[formField]</code>.
                </p>
                <table tuiTable [formControl]="tableControl">
                    <thead>
                        <tr>
                            <th>
                                <input tuiCheckbox tuiCheckboxTable type="checkbox" />
                            </th>
                            <th>Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        @for (item of tableItems; track item) {
                            <tr>
                                <td>
                                    <input
                                        tuiCheckbox
                                        type="checkbox"
                                        [tuiCheckboxRow]="item"
                                    />
                                </td>
                                <td>{{ item }}</td>
                            </tr>
                        }
                    </tbody>
                </table>
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
        {provide: TUI_PLATFORM, useValue: 'android'},
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
    protected readonly tableItems = ['Alpha', 'Beta'];
    protected readonly tableControl = new FormControl<readonly string[]>([], {nonNullable: true});

    protected readonly model = signal<DemoModel>({
        block: false,
        buttonSelect: this.people[0] ?? '',
        card: '',
        cardGroup: null,
        checkbox: true,
        chips: ['Angular', 'Taiga UI'],
        color: '#ffdd2d',
        combo: this.people[0] ?? null,
        counter: 2,
        cvc: '',
        date: null,
        dateMulti: [],
        dateRange: null,
        dateTime: null,
        expire: '',
        files: [],
        filter: ['Food'],
        inline: 'Inline',
        inputRange: [20, 80],
        inputSearch: '',
        inputSlider: 50,
        like: true,
        month: null,
        monthRange: null,
        multiSelect: [this.people[0] ?? ''],
        nativeSelect: this.people[1] ?? null,
        number: null,
        phone: '',
        phoneInternational: '',
        pin: '',
        pincode: '',
        radio: 'One',
        radioList: 'One',
        range: [20, 80],
        searchBar: '',
        segmented: 'One',
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
        min(path.slider, 0);
        max(path.slider, 100);
        min(path.inputSlider, 0);
        max(path.inputSlider, 100);
    });
}
