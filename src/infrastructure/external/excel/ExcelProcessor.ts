import * as XLSX from 'xlsx';
import {EventModel} from "@infrastructure/db/models/EventModel";

export class ExcelProcessor {
    public async processEventFile(fileBuffer: Buffer): Promise<void> {
        try {
            const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const eventData = XLSX.utils.sheet_to_json(worksheet);

            for (const event of eventData) {
                await this.upsertEvent(event);
            }
        } catch (error) {
            console.error('Error processing Excel file:', error);
            throw new Error('Failed to process Excel file');
        }
    }

    private async upsertEvent(event: any): Promise<void> {
        const { id, name, description, date, location, organizerId } = event;

        await EventModel.upsert({
            id,
            name,
            description,
            date: new Date(date),
            location,
            organizerId,
        });
    }

    public generateEventTemplate(): Buffer {
        const headers = ['id', 'name', 'description', 'date', 'location', 'organizerId'];
        const worksheet = XLSX.utils.json_to_sheet([headers]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Events');
        return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    }
}
