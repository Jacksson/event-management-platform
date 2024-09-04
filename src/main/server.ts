import { createApp } from './app';
import {Logger} from "@shared/utils/Logger";

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`);
});
