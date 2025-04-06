export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
    selectProduct: 'product:select',
    updateCatalog: 'catalog:updated',
    openBasket: 'basket:open',
    addToBasket: 'basket:add',
    removeFromBasket: 'basket:remove',
    updateBasket: 'basket:updated',
    openOrder: 'order:open',
    orderDataConfirmed: 'order:data',
    contactsDataConfirmed: 'contacts:data',
    closeSuccess: 'success:close'
};
