export class GenericLogger {
    storeInFile(message) {
        //TODO: implement file logging
    }

    /**
     * Logs to console and to the default log file.
     * @param {Object} message
     */
    log(message) {
        this.storeInFile(message);
        console.log(
            `%c[KlaxoLog]`,
            'font-weight: bold',
            message
        );
    }
}