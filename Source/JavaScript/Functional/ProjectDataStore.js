import {IllegalProjectDataStructure} from "./Errors";

const path = window.require('path');
const fs = window.require('fs');

export class ProjectDataStore {
    static storeFile = path.resolve(`./AppData/projects.json`);
    storeData = null;
    logger = null;

    constructor(data, logger) {
        this.logger = logger;
        this.storeData = data;
    }

    store() {
        // We would probably hydrate the data with current time
        const toStoreData = {
            ...this.storeData,
            time: (new Date()).toUTCString()
        };

        fs.readFile(ProjectDataStore.storeFile, {
            encoding: 'utf-8'
        }, (error, data) => {
            if(error) {
                throw new Error(error.message);
            }

            try {
                const projects = JSON.parse(data);
                projects.push(toStoreData);

                fs.writeFile(ProjectDataStore.storeFile, JSON.stringify(projects, null, 2), err => {
                    if(err) {
                        throw new Error(err.message);
                    }

                    this.logger.log({
                        status: "Stored project data in project store"
                    });
                });
            } catch(err) {
                throw new IllegalProjectDataStructure();
            }
        });

        return this;
    }

    get() {
        const util = window.require('util');
        const getFile = util.promisify(fs.readFile);

        return getFile(ProjectDataStore.storeFile);
    }
}