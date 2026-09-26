import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {
    disabled,
    form,
    FormField,
    max,
    min,
    minLength,
    required,
    submit,
} from '@angular/forms/signals';
import {TuiButton, TuiError, TuiInput} from '@taiga-ui/core';
import {TuiInputNumber} from '@taiga-ui/kit';

const INITIAL_MODEL = {
    name: '',
    amount: null as number | null,
};

type SubmitState = 'blocked' | 'idle' | 'success';

@Component({
    selector: 'app-signal-forms-playground',
    imports: [FormField, JsonPipe, TuiButton, TuiError, TuiInput, TuiInputNumber],
    template: `
        <div class="playground">
            <div class="fields">
                <tui-textfield>
                    <label tuiLabel>Name</label>
                    <input
                        tuiInput
                        [formField]="f.name"
                    />
                </tui-textfield>
                <tui-error [formField]="f.name" />

                <tui-textfield>
                    <label tuiLabel>Amount</label>
                    <input
                        tuiInputNumber
                        [formField]="f.amount"
                    />
                </tui-textfield>
                <tui-error [formField]="f.amount" />

                <div class="actions">
                    <button
                        appearance="outline-grayscale"
                        size="s"
                        tuiButton
                        type="button"
                        (click)="disabledAmount.update((value) => !value)"
                    >
                        {{ disabledAmount() ? 'Enable' : 'Disable' }} amount
                    </button>
                    <button
                        appearance="flat-grayscale"
                        size="s"
                        tuiButton
                        type="button"
                        (click)="reset()"
                    >
                        Reset
                    </button>
                    <button
                        size="s"
                        tuiButton
                        type="button"
                        (click)="onSubmit()"
                    >
                        Submit
                    </button>
                </div>

                @if (submitState() === 'success') {
                    <p class="submit-result" data-result="success">Submitted successfully</p>
                } @else if (submitState() === 'blocked') {
                    <p class="submit-result" data-result="blocked">
                        Submission blocked by validation
                    </p>
                }
            </div>

            <div class="state">
                <h3>Live field state</h3>
                <dl>
                    <div>
                        <dt>model</dt>
                        <dd><code>{{ model() | json }}</code></dd>
                    </div>
                    <div>
                        <dt>valid</dt>
                        <dd>{{ f().valid() }}</dd>
                    </div>
                    <div>
                        <dt>touched</dt>
                        <dd>{{ f().touched() }}</dd>
                    </div>
                    <div>
                        <dt>dirty</dt>
                        <dd>{{ f().dirty() }}</dd>
                    </div>
                    <div>
                        <dt>name errors</dt>
                        <dd>{{ f.name().errors().length }}</dd>
                    </div>
                    <div>
                        <dt>amount disabled</dt>
                        <dd>{{ f.amount().disabled() }}</dd>
                    </div>
                </dl>
            </div>
        </div>
    `,
    styleUrl: './signal-forms-playground.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsPlayground {
    protected readonly disabledAmount = signal(false);
    protected readonly submitState = signal<SubmitState>('idle');
    protected readonly model = signal({...INITIAL_MODEL});

    protected readonly f = form(this.model, (path) => {
        required(path.name, {message: 'Name is required'});
        minLength(path.name, 3, {message: 'Use at least 3 characters'});

        required(path.amount, {message: 'Amount is required'});
        min(path.amount, 0, {message: 'Minimum is 0'});
        max(path.amount, 100, {message: 'Maximum is 100'});
        disabled(path.amount, {when: () => this.disabledAmount()});
    });

    protected async onSubmit(): Promise<void> {
        this.submitState.set('idle');

        const success = await submit(this.f, async () => undefined);

        this.submitState.set(success ? 'success' : 'blocked');
    }

    protected reset(): void {
        this.model.set({...INITIAL_MODEL});
        this.disabledAmount.set(false);
        this.submitState.set('idle');
        this.f().reset();
    }
}
