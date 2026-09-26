import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    testMatch: '*.pw.spec.ts',
    fullyParallel: true,
    forbidOnly: true,
    retries: 1,
    reporter: 'line',
    use: {
        baseURL: 'http://127.0.0.1:4200',
        locale: 'en-US',
        timezoneId: 'Europe/Moscow',
        trace: 'retain-on-failure',
        viewport: {width: 1440, height: 900},
    },
    webServer: {
        command: 'npm start -- --host 127.0.0.1 --port 4200',
        reuseExistingServer: true,
        timeout: 120_000,
        url: 'http://127.0.0.1:4200',
    },
});
