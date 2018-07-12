const path = window.require('path');

class DirectoryAlreadyExistsError extends Error {}

export class CreateProject {
    fileSystem = window.require('fs');
    config = null;
    logger = null;

    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }

    createDirectory() {
        this.fileSystem.mkdir(
            path.join(this.config.dir, this.config.projectName),
            error => {
                if(error && error.code === 'EEXIST') {
                    throw new DirectoryAlreadyExistsError();
                }

                this.logger.log({
                    status: `Created project directory for ${this.config.projectName}`
                });
            }
        );

        return this;
    }
}