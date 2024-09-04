import {ExcelProcessor} from "@infrastructure/external/excel/ExcelProcessor";

export class ExcelProcessingService {
    private excelProcessor: ExcelProcessor;

    constructor(excelProcessor: ExcelProcessor) {
        this.excelProcessor = excelProcessor;
    }

    /**
     * Procesa un archivo Excel para extraer y almacenar información de eventos.
     * @param fileBuffer Buffer que representa el archivo Excel.
     * @returns Una promesa que se resuelve cuando el procesamiento está completo.
     */
    public async processEventFile(fileBuffer: Buffer): Promise<void> {
        await this.excelProcessor.processEventFile(fileBuffer);
    }

    /**
     * Genera una plantilla de archivo Excel para eventos.
     * @returns Un buffer que contiene el archivo Excel con la plantilla.
     */
    public generateEventTemplate(): Buffer {
        return this.excelProcessor.generateEventTemplate();
    }
}
