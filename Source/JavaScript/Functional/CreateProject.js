const path = window.require('path');

class DirectoryAlreadyExistsError extends Error {}

export class CreateProject {
    static MAIN_FILE_TEMPLATE = `// Start writing your code here...`;

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

    createBootstrapFiles() {
        this.fileSystem.writeFile(
            path.join(path.join(this.config.dir, this.config.projectName), 'main.cpp'),
            CreateProject.MAIN_FILE_TEMPLATE,
            error => {
                this.logger.log({
                    status: `Created main.cpp for ${this.config.projectName}`
                });
            }
        );
        return this;
    }
}