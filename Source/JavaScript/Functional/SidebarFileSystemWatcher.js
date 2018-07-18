const dirTree = window.require('directory-tree');
const chokidar = window.require('chokidar');

import { Logger } from "./Logger";

export class SidebarFileSystemWatcher {
    config = null;
    logger = null;
    projectDir = null;
    handlers = {};

    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.projectDir = `${config.dir.replace(/\\/g, '/')}/${config.projectName}`
    }

    getInitialStructure() {
        const dirToScan = this.projectDir;
        return dirTree(dirToScan, { normalizePath: true });
    }

    onNewFileAdd = path => {
        const newPath = path.replace(/\\/g, '/').replace(this.projectDir, '');
        this.handlers.newFile(newPath, path);
    };

    startWatching(handlers) {
        this.handlers = handlers;
        this.watcher = new chokidar.watch(
            this.projectDir,
            {
                ignored: /(^|[\/\\])\../,
                persistent: true,
                ignoreInitial: true
            }
        );

        this.logger.log({
            status: 'Directory watcher initialized on project directory',
            tag: 'watcher',
            level: Logger.VERBOSE
        });

        this.watcher.on('add', this.onNewFileAdd);
    }
}