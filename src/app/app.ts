import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';

import {COMPONENTS, type CompatibilityRow} from './compatibility';
import {FormControls} from './form-controls';

type Scope = 'all' | 'forms' | 'verified';

@Component({
    selector: 'app-compatibility',
    imports: [FormControls],
    template: `
        <main class="page">
            <header class="hero">
                <p class="eyebrow">taiga-family-labs / taiga-signal-forms</p>
                <h1>Taiga UI × Angular Signal Forms</h1>
                <p class="lead">
                    Compatibility matrix for Taiga UI 5.24.0 and Angular 22.1.7.
                    Signal Forms are stable in Angular 22.
                </p>

                <div class="versions">
                    <span><strong>Angular</strong> 22.1.7</span>
                    <span><strong>Signal Forms</strong> stable</span>
                    <span><strong>Taiga UI</strong> 5.24.0</span>
                    <span><strong>Rows</strong> {{ components.length }}</span>
                </div>
            </header>

            <section class="card">
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">Live compatibility lab</p>
                        <h2>Every Taiga UI form integration</h2>
                    </div>
                    <span class="status" data-status="verified">36 live examples</span>
                </div>

                <app-form-controls />
            </section>

            <section class="card">
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">Compatibility matrix</p>
                        <h2>All Taiga UI demo components</h2>
                    </div>
                    <span>{{ rows().length }} / {{ components.length }}</span>
                </div>

                <div class="filters">
                    <input
                        class="search"
                        type="search"
                        placeholder="Search component…"
                        [value]="query()"
                        (input)="setQuery($event)"
                    />

                    <select
                        class="scope"
                        [value]="scope()"
                        (change)="setScope($event)"
                    >
                        <option value="all">All components</option>
                        <option value="forms">Form-related only</option>
                        <option value="verified">Verified upstream only</option>
                    </select>
                </div>

                <div class="legend">
                    <span><i class="dot verified"></i> Verified upstream</span>
                    <span><i class="dot compatible"></i> Live compatibility path</span>
                    <span><i class="dot na"></i> Not a form control</span>
                </div>

                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Component</th>
                                <th>Signal Forms</th>
                                <th>Integration</th>
                                <th>Why</th>
                            </tr>
                        </thead>
                        <tbody>
                            @for (row of rows(); track row.name) {
                                <tr>
                                    <td>
                                        <strong>{{ row.title }}</strong>
                                        <code>{{ row.name }}</code>
                                    </td>
                                    <td>
                                        <span
                                            class="status"
                                            [attr.data-status]="row.status"
                                        >
                                            {{ row.statusLabel }}
                                        </span>
                                    </td>
                                    <td><code>{{ integrationLabel(row) }}</code></td>
                                    <td>{{ row.note }}</td>
                                </tr>
                            } @empty {
                                <tr>
                                    <td colspan="4" class="empty">
                                        No components match this filter.
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

                <p class="footnote">
                    Every form-related row now has a live <code>[formField]</code> example above.
                    “Verified upstream” additionally means Taiga UI already has dedicated
                    Signal Forms Cypress coverage for that integration.
                </p>
            </section>
        </main>
    `,
    styleUrl: './app.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    protected readonly components = COMPONENTS;
    protected readonly query = signal('');
    protected readonly scope = signal<Scope>('all');

    protected readonly rows = computed(() => {
        const query = this.query().trim().toLowerCase();
        const scope = this.scope();

        return this.components.filter((row) => {
            const matchesQuery =
                !query ||
                row.name.includes(query) ||
                row.title.toLowerCase().includes(query);

            const matchesScope =
                scope === 'all' ||
                (scope === 'forms' && row.status !== 'not-applicable') ||
                (scope === 'verified' && row.status === 'verified');

            return matchesQuery && matchesScope;
        });
    });

    protected setQuery(event: Event): void {
        this.query.set((event.target as HTMLInputElement).value);
    }

    protected setScope(event: Event): void {
        this.scope.set((event.target as HTMLSelectElement).value as Scope);
    }

    protected integrationLabel(row: CompatibilityRow): string {
        switch (row.integration) {
            case 'native':
                return 'native';
            case 'cva':
                return 'TuiControl / CVA';
            case 'composite':
                return 'composite';
            case 'validation':
                return 'formField-aware';
            case 'not-applicable':
                return '—';
        }
    }
}
