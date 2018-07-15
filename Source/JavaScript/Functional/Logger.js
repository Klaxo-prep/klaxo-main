export class Logger {
    static VERBOSE = 1;

    constructor(level = Logger.VERBOSE) {
        this.level = level;
    }
}

export class GenericLogger extends Logger {
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
            `%c[KlaxoLog]${message.tag ? ` %c[${message.tag}]` : ''} %c${message.status}`,
            'font-weight: bold',
            'color: rgb(67,154,90)',
            'font-style: normal; font-weight: 400;'
        );
    }
}