import dayjs from "dayjs";

export interface Book {
    code: string;
    reader_id: number;
    issued_at: dayjs.Dayjs;
    due_date: dayjs.Dayjs;
}