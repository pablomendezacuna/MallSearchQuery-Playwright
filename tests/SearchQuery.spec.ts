import { test } from '@playwright/test';
import { MainPage } from '../pages/Main_Page';
import { PlpPage } from '../pages/Plp';

// Importación de datos
import dataMalls from '../fixtures/MyMalls.json';
import dataQueries from '../fixtures/Queries.json';

/**
 * Definimos la interfaz para que TypeScript sepa exactamente qué esperar.
 * Esto eliminará el error en rojo.
 */
interface QueryItem {
    term: string;
}

const manualQueriesEnv = process.env.MANUAL_QUERIES;

// Definimos el tipo como un array de QueryItem
let queriesToTest: QueryItem[];

if (manualQueriesEnv && manualQueriesEnv.trim() !== '') {
    // Si hay entrada manual, creamos el array con el formato correcto
    queriesToTest = manualQueriesEnv.split(',').map(q => ({ term: q.trim() }));
} else {
    // Si no, usamos el JSON (que ya cumple con la estructura { term: string })
    queriesToTest = dataQueries as QueryItem[];
}

test.describe('Mall Search Validation', () => {
    for (const mall of dataMalls) {
        for (const query of queriesToTest) {
            test(`${mall.name} | ${query.term}`, async ({ page }, testInfo) => {
                // ... resto de tu código igual ...
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