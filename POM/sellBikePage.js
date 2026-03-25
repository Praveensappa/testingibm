export class SellBikePage {
    constructor(page) {
        this.page = page;

        this.brand = page.locator('input[name="brand"]');
        this.model = page.locator('input[name="model"]');
        this.year = page.locator('input[name="year"]');
        this.originalPrice = page.locator('//*[@id="sell-form"]/div[2]/div[2]/input');
        this.location = page.locator('input[placeholder="e.g. Mumbai, MH"]');
        this.kmDriven = page.locator('input[name="kmDriven"]');
        this.description = page.locator('textarea[placeholder="Describe the condition, features, etc."]');

        this.publishBtn = page.getByText("Publish Listing");
        this.estimatorBtn = page.getByText(" Calculate Price");
    }
}