export function getMonthLabel(month: number): string {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    if (month < 1 || month > 12) return 'Invalid';
    return months[month - 1];
}

export function getCurrentMonth(): { year: number; month: number } {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

export function getMonthsForSelector(): Array<{ year: number; month: number }> {
    const result: Array<{ year: number; month: number }> = [];
    const now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth() + 1;

    // Add 3 months before current
    for (let i = 0; i < 3; i++) {
        currentMonth--;
        if (currentMonth < 1) {
            currentMonth = 12;
            currentYear--;
        }
        result.push({ year: currentYear, month: currentMonth });
    }

    // Reverse to get chronological order
    result.reverse();

    // Add current month
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    result.push({ year: nowYear, month: nowMonth });

    // Add all months of next year
    let nextYear = nowYear + 1;
    for (let month = 1; month <= 12; month++) {
        result.push({ year: nextYear, month });
    }

    return result;
}

export function getMonthsRange(count: number = 12): Array<{ year: number; month: number }> {
    const result: Array<{ year: number; month: number }> = [];
    const now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth() + 1;

    for (let i = 0; i < count; i++) {
        result.push({ year: currentYear, month: currentMonth });
        currentMonth++;
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        }
    }

    return result;
}

export function getRecentMonths(count: number = 3): Array<{ year: number; month: number }> {
    const result: Array<{ year: number; month: number }> = [];
    const now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth() + 1;

    for (let i = 0; i < count; i++) {
        result.unshift({ year: currentYear, month: currentMonth });
        currentMonth--;
        if (currentMonth < 1) {
            currentMonth = 12;
            currentYear--;
        }
    }

    return result;
}

export function getNextMonth(year: number, month: number): { year: number; month: number } {
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth > 12) {
        nextMonth = 1;
        nextYear++;
    }
    return { year: nextYear, month: nextMonth };
}

export function getPreviousMonth(year: number, month: number): { year: number; month: number } {
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth < 1) {
        prevMonth = 12;
        prevYear--;
    }
    return { year: prevYear, month: prevMonth };
}
