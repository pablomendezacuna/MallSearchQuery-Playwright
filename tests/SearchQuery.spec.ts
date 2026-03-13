import { test } from "@playwright/test";
import { MainPage } from "../pages/Main_Page.js";
import { PlpPage } from "../pages/Plp.js";
import dataMalls from "../fixtures/MyMalls.json" with { type: "json" };
import dataQueries from "../fixtures/Queries.json" with { type: "json" };

test.describe("Mall Search Validation", () => {
    for (const mall of dataMalls) {
        for (const query of dataQueries) {
            test(`${mall.name} | ${query.term}`, async ({ page }, testInfo) => {
                const mainPage = new MainPage(page);
                const plpPage = new PlpPage(page);

                // Agregar URL original a las anotaciones del reporte
                testInfo.annotations.push({ type: 'URL Original', description: mall.url });

                try {
                    await mainPage.navigateTo(mall.url);
                    await mainPage.searchFor(query.term, mall.lang);
                    
                    // Asegurar que carguen los productos para la captura completa
                    await plpPage.scrollToBottom();
                    
                    // Guardar URL final en el reporte
                    testInfo.annotations.push({ type: 'URL Resultados', description: page.url() });
                    
                } catch (error) {
                    // Si falla, capturamos la URL exacta del error
                    testInfo.annotations.push({ type: 'URL ERROR', description: page.url() });
                    throw error;
                }
            });
        }
    }
});