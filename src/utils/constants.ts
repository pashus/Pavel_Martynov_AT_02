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

export const categoryClassMap: Record<string, string> = {
    'софт-скил': 'card__category_soft',
    'хард-скил': 'card__category_hard',
    'другое': 'card__category_other',
    'кнопка': 'card__category_button',
    'дополнительное' : 'card__category_additional'
};

export const defaultCategoryClasses = [
    'card__category_soft',
    'card__category_hard',
    'card__category_other',
    'card__category_button',
    'card__category_additional'
];

export function colorCategory(category: HTMLElement, data: any) {
    category.classList.remove(...defaultCategoryClasses)
    return category.classList.add(categoryClassMap[data.category]);
}