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

            <section class="card">
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
                                <th>Package</th>
                                <th>Signal Forms</th>
                            </tr>
                        </thead>
                        <tbody>
                            @for (row of components; track row.id) {
                                <tr>
                                    <td><strong>{{ row.name }}</strong></td>
                                    <td><code>{{ row.package }}</code></td>
                                    <td>
                                        <span
                                            class="status"
                                            [attr.data-status]="row.status"
                                        >
                                            {{ row.label }}
                                        </span>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

                <p class="footnote">
                    <strong>Verified upstream</strong> means Taiga UI already has dedicated
                    Signal Forms Cypress coverage. <strong>Live [formField]</strong> means this
                    page compiles and renders the integration. <strong>Selector gap</strong>
                    currently applies to Table Control: its v5 directive selector does not
                    include <code>[formField]</code>.
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
