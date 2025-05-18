export const INTERVAL = ['last30days', 'last60days', 'last90days'] as const;

export type Interval = typeof INTERVAL[number];

export interface FormFilter {
    unique: boolean;
    interval: Interval;
}

export const INTERVAL_MAP: { [I in Interval]: number } = {
    last30days: 1,
    last60days: 2,
    last90days: 3
};