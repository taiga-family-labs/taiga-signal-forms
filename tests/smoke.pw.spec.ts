import {expect, test} from '@playwright/test';

test('renders every control and compatibility row without runtime errors', async ({page}) => {
    const errors: string[] = [];

    page.on('console', (message) => {
        if (message.type() === 'error') {
            errors.push(message.text());
        }
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/');

    await expect(page.locator('.example')).toHaveCount(45);
    await expect(page.locator('#compatibility-table tbody tr')).toHaveCount(45);
    await expect(page.locator('#block input[tuiCheckbox]')).toBeVisible();
    await expect(page.locator('#input-slider input[tuiSlider][type="range"]')).toBeVisible();

    expect(errors).toEqual([]);
});

test('keeps Input Slider track inside its example card', async ({page}) => {
    await page.goto('/#input-slider');

    const card = page.locator('#input-slider');
    const track = card.locator('input[tuiSlider][type="range"]');

    await expect(card).toBeVisible();
    await expect(track).toBeVisible();

    const cardBox = await card.boundingBox();
    const trackBox = await track.boundingBox();

    expect(cardBox).not.toBeNull();
    expect(trackBox).not.toBeNull();

    expect(trackBox!.width).toBeGreaterThan(100);
    expect(trackBox!.x).toBeGreaterThanOrEqual(cardBox!.x);
    expect(trackBox!.x + trackBox!.width).toBeLessThanOrEqual(
        cardBox!.x + cardBox!.width + 1,
    );
});

test('shows support levels and navigates to the compatibility table', async ({page}) => {
    await page.goto('/');

    const table = page.locator('#compatibility-table');
    const summary = page.locator('.support-summary');

    await expect(table.locator('[data-support="partial"]')).toHaveCount(5);
    await expect(table.locator('[data-support="unsupported"]')).toHaveCount(1);
    await expect(summary.locator('[data-support="full"]')).toHaveText('39 Full');
    await expect(summary.locator('[data-support="partial"]')).toHaveText('5 Partial');
    await expect(summary.locator('[data-support="unsupported"]')).toHaveText(
        '1 Unsupported',
    );

    await page.getByRole('link', {name: 'Jump to compatibility table'}).click();

    await expect(page).toHaveURL(/#compatibility-table$/);
    await expect(page.locator('#compatibility-table')).toBeInViewport();
});
