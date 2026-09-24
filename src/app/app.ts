import {ChangeDetectionStrategy, Component} from '@angular/core';

import {COMPONENTS} from './compatibility';
import {FormControls} from './form-controls';

@Component({
    selector: 'app-compatibility',
    imports: [FormControls],
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

            <section class="card">
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">Live compatibility lab</p>
                        <h2>All Taiga UI form controls</h2>
                    </div>
                    <span class="status" data-status="live">44 live + 1 gap</span>
                </div>

                <app-form-controls />
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
                                        @if (row.testUrl) {
                                            <a
                                                class="status status-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                [attr.data-status]="row.status"
                                                [href]="row.testUrl"
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
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

                <p class="footnote">
                    <strong>Upstream tested</strong> means Taiga UI already has a dedicated
                    Signal Forms Cypress test; click the status to open it.
                    <strong>Live [formField]</strong> means this page compiles and renders the
                    integration. <strong>Missing [formField] selector</strong> means the control
                    supports forms, but Taiga UI v5 does not activate its directive when
                    <code>[formField]</code> is used.
                </p>
            </section>
        </main>
    `,
    styleUrl: './app.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    protected readonly components = COMPONENTS;
}
