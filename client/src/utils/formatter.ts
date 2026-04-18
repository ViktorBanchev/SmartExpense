export function dateFormatter(dateString: string) {
    const date = new Date(dateString)

    if (isToday(dateString)) {
        return new Intl.DateTimeFormat('en-En', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(date)
    }

    return new Intl.DateTimeFormat('en-En', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }).format(date)
}

export const isToday = (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};