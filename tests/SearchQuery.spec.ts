import { test } from '@playwright/test';
import { MainPage } from '../pages/Main_Page';
import { PlpPage } from '../pages/Plp';

// Importación de datos
import dataMalls from '../fixtures/MyMalls.json';
import dataQueries from '../fixtures/Queries.json';

test.describe('Mall Search Validation', () => {
    for (const mall of dataMalls) {
        for (const query of dataQueries) {
            test(`${mall.name} | ${query.term}`, async ({ page }, testInfo) => {
                const mainPage = new MainPage(page);
                const plpPage = new PlpPage(page);

                testInfo.annotations.push({ type: 'URL Original', description: mall.url });

                try {
                    await mainPage.navigateTo(mall.url);
                    await mainPage.searchFor(query.term, mall.lang);
                    await plpPage.scrollToBottom();
                    
                    testInfo.annotations.push({ type: 'URL Resultados', description: page.url() });
                } catch (error) {
                    testInfo.annotations.push({ type: 'URL ERROR', description: page.url() });
                    throw error;
                }
            });
        }
    }
});