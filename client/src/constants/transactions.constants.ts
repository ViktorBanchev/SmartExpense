export const CATEGORY_ICONS = [
    { label: 'Shopping', icon: '🛒' },
    { label: 'Coffee', icon: '☕' },
    { label: 'Food', icon: '🍔' },
    { label: 'Transport', icon: '🚗' },
    { label: 'Bills', icon: '💡' },
    { label: 'Rent', icon: '🏠' },
    { label: 'Health', icon: '💊' },
    { label: 'Entertainment', icon: '🎉' },
    { label: 'Travel', icon: '✈️' },
    { label: 'Salary', icon: '💰' },
];

export const VALID_ICONS = CATEGORY_ICONS.map(item => item.icon) as [string, ...string[]];