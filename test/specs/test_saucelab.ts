var assert = require('assert');

describe('Sauce Lab Testing', () => {

    const userName: string = "standard_user"
    const password: string = "secret_sauce"
    const productName: string = "Sauce Labs Onesie"

    it('Sauce Demo - Launch Url', async () => {
        await browser.url('/')
        await browser.setTimeout({ 'implicit': 20000 })
        expect(browser).toHaveUrlContaining('saucedemo')
        await browser.maximizeWindow()
        await browser.pause(1000)
    });

    it('Login - Login with valid Credentials', async () => {
        await $('#user-name').setValue(userName)
        await $('#password').setValue(password)
        await $('#login-button').click()
        await browser.pause(1000)
    });

    it('Product - select product', async () => {
        const productsElement = await $$('div.inventory_item_name')

        for (const ele of productsElement) {
            if (await ele.getText() === productName) {
                await ele.click()
                break
            }
        }
        await browser.pause(1000)
    });

    it('Product Details - click add to cart', async () => {
        await $('#back-to-products').waitForClickable({ timeout: 3000 })
        const product = await $('.inventory_details_name').getText()
        assert.strictEqual(product, productName, "product name mismatch!")
        await $('button=Add to cart').click()
        await $('a.shopping_cart_link').click()
    });

    it('Cart - click checkout', async () => {
        await browser.pause(1000)
        const title = await $('.title').getText()
        assert.strictEqual(title, "YOUR CART")
        const product = await $('.inventory_item_name').getText()
        assert.strictEqual(product, productName)
        await $('#checkout').click()
    });
});