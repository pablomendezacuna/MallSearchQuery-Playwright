import { test } from '@playwright/test';
import { MainPage } from '../pages/Main_Page';
import { PlpPage } from '../pages/Plp';

// Data imports
import dataMalls from '../fixtures/MyMalls.json';
import dataQueries from '../fixtures/Queries.json';

// Type definition for Query items
interface QueryItem {
    term: string;
}

// Logic to switch between Manual Input (GitHub) and Default JSON (Local/Push)
const manualQueriesEnv = process.env.MANUAL_QUERIES;
let queriesToTest: QueryItem[];

if (manualQueriesEnv && manualQueriesEnv.trim() !== '') {
    // Split the comma-separated string into an array of objects
    queriesToTest = manualQueriesEnv.split(',').map(q => ({ term: q.trim() }));
} else {
    // Use the default JSON file
    queriesToTest = dataQueries as QueryItem[];
}

test.describe('Mall Search Validation', () => {
    for (const mall of dataMalls) {
        for (const query of queriesToTest) {
            test(`${mall.name} | ${query.term}`, async ({ page }, testInfo) => {
                const mainPage = new MainPage(page);
                const plpPage = new PlpPage(page);

                testInfo.annotations.push({ type: 'Original URL', description: mall.url });

                try {
                    // Navigate using credentials from config
                    await mainPage.navigateTo(mall.url);
                    // Perform the search operation
                    await mainPage.searchFor(query.term, mall.lang);
                    // Scroll to ensure all content is loaded for the screenshot
                    await plpPage.scrollToBottom();
                    
                    testInfo.annotations.push({ type: 'Result URL', description: page.url() });
                } catch (error) {
                    testInfo.annotations.push({ type: 'ERROR URL', description: page.url() });
                    throw error;
                }
            });
        }
    }
});