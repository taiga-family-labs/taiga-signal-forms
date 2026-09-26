import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';

import {COMPONENTS, INTEGRATIONS} from './compatibility';
import {FormControls} from './form-controls';
import {SignalFormsPlayground} from './signal-forms-playground';

@Component({
    selector: 'app-compatibility',
    imports: [FormControls, SignalFormsPlayground, TuiButton],
    template: `
        <main class="page">
            <header class="hero">
                <p class="eyebrow">taiga-family-labs / taiga-signal-forms</p>
                <h1>Taiga UI × Angular Signal Forms</h1>
                <p class="lead">
                    Live compatibility lab for every public Taiga UI form-control surface
                    with Angular 22 Signal Forms.
                </p>

                <div class="versions">
                    <span><strong>Angular</strong> 22.1.7</span>
                    <span><strong>Signal Forms</strong> stable</span>
                    <span><strong>Taiga UI</strong> 5.24.0</span>
                    <span><strong>Form controls</strong> {{ components.length }}</span>
                </div>
            </header>

            <section class="card live-card">
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">Live compatibility lab</p>
                        <h2>All Taiga UI form controls</h2>
                    </div>
                    <span class="status" data-status="live">44 live + 1 gap</span>
                </div>

                <div class="compatibility-jump">
                    <a
                        appearance="flat-grayscale"
                        aria-label="Jump to compatibility table"
                        href="#compatibility-table"
                        size="s"
                        tuiButton
                    >
                        ↓ Compatibility
                    </a>
                </div>

                <app-form-controls />
            </section>

            <section class="card" id="behavior-playground">
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">Behavior</p>
                        <h2>Validation and field state</h2>
                    </div>
                    <span>live Signal Forms state</span>
                </div>

                <app-signal-forms-playground />
            </section>

            <section class="card" id="compatibility-table">
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">Compatibility</p>
                        <h2>Form controls only</h2>
                    </div>
                    <span>{{ components.length }} controls</span>
                </div>

                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Control</th>
                                <th>Signal Forms</th>
                                <th>Support</th>
                            </tr>
                        </thead>
                        <tbody>
                            @for (row of components; track row.id) {
                                <tr>
                                    <td class="control-cell">
                                        <a
                                            class="control-link"
                                            [attr.href]="'#' + row.id"
                                        >
                                            {{ row.name }}
                                            <span
                                                aria-hidden="true"
                                                class="anchor-icon"
                                            >
                                                #
                                            </span>
                                        </a>
                                        <code>{{ row.package }}</code>
                                    </td>
                                    <td>
                                        @if (row.detailsUrl) {
                                            <a
                                                class="status status-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                [attr.data-status]="row.status"
                                                [href]="row.detailsUrl"
                                            >
                                                {{ row.label }}
                                                <span aria-hidden="true">↗</span>
                                            </a>
                                        } @else {
                                            <span
                                                class="status"
                                                [attr.data-status]="row.status"
                                            >
                                                {{ row.label }}
                                            </span>
                                        }
                                    </td>
                                    <td>
                                        @if (row.supportUrl) {
                                            <a
                                                class="support support-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                [attr.data-support]="row.support"
                                                [href]="row.supportUrl"
                                            >
                                                {{ row.supportLabel }}
                                                <span aria-hidden="true">↗</span>
                                            </a>
                                        } @else {
                                            <span
                                                class="support"
                                                [attr.data-support]="row.support"
                                            >
                                                {{ row.supportLabel }}
                                            </span>
                                        }
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

                <p class="footnote">
                    <strong>Upstream test prepared</strong> means Taiga UI already has a dedicated
                    Signal Forms Cypress test source, but the file is currently disabled until
                    Taiga UI can require Angular 22; click the status to open it.
                    <strong>Live [formField]</strong> means this page compiles and renders the
                    integration. <strong>Missing [formField] selector</strong> means the control
                    supports forms, but Taiga UI v5 does not activate its directive when
                    <code>[formField]</code> is used; click the status to open the selector
                    in the Taiga UI source.
                </p>

                <p class="footnote">
                    <strong>Full</strong> means there are no known Signal Forms-specific
                    conflicts in the control's public API. <strong>Partial</strong> means value
                    binding works, but Taiga UI's <code>min</code>/<code>max</code> or
                    <code>minLength</code>/<code>maxLength</code> inputs collide with Signal
                    Forms metadata; the badge links to Angular #70600.
                    <strong>Unsupported</strong> means <code>[formField]</code> cannot currently
                    activate the control. Native <strong>Slider</strong> remains Full: its
                    bounds should be declared with Signal Forms <code>min()</code>/<code>max()</code>
                    rules instead of template <code>[min]</code>/<code>[max]</code>.
                </p>
            </section>

            <section class="card" id="integrations">
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">Integrations</p>
                        <h2>Beyond value controls</h2>
                    </div>
                    <span>{{ integrations.length }} integrations</span>
                </div>

                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Integration</th>
                                <th>Signal Forms</th>
                                <th>What it covers</th>
                            </tr>
                        </thead>
                        <tbody>
                            @for (row of integrations; track row.name) {
                                <tr>
                                    <td class="control-cell">
                                        <strong>{{ row.name }}</strong>
                                        <code>{{ row.package }}</code>
                                    </td>
                                    <td>
                                        <a
                                            class="status status-link"
                                            data-status="upstream"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            [href]="row.detailsUrl"
                                        >
                                            {{ row.label }}
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    </td>
                                    <td>{{ row.note }}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

                <p class="footnote">
                    These upstream Signal Forms Cypress files are currently commented out while
                    Taiga UI still supports Angular versions below 22. They are implementation
                    evidence, not active upstream CI coverage yet.
                </p>
            </section>
        </main>
    `,
    styleUrl: './app.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    protected readonly components = COMPONENTS;
    protected readonly integrations = INTEGRATIONS;
}
