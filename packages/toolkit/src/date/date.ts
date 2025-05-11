export function subDays(date: Date, subDays: number) {
    const copiedDate = new Date(date);
    copiedDate.setDate(date.getDate() - subDays);

    return copiedDate;
}