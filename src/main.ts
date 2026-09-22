import {Component, provideZonelessChangeDetection} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {
    provideTaiga,
    tuiAssetsPathProvider,
    TuiRoot,
} from '@taiga-ui/core';

import {App} from './app/app';

@Component({
    selector: 'app-root',
    imports: [App, TuiRoot],
    template: '<tui-root><app-compatibility /></tui-root>',
})
class Root {}

void bootstrapApplication(Root, {
    providers: [
        provideZonelessChangeDetection(),
        provideTaiga(),
        tuiAssetsPathProvider('https://taiga-ui.dev/assets/taiga-ui/icons'),
    ],
});
