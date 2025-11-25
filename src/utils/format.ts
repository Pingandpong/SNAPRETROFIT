import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date: Date | number, pattern: string = 'yyyy-MM-dd'): string => {
    return format(date, pattern, { locale: ko });
};

export const formatRelativeTime = (date: Date | number): string => {
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
};

export const formatCurrency = (amount: number, currency: string = 'KRW'): string => {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency,
    }).format(amount);
};
