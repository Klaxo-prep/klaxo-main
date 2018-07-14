const dirTree = window.require('directory-tree');

export class SidebarFileSystemWatcher {
    config = null;

    constructor(config) {
        this.config = config;
    }

    getInitialStructure(cb) {
        const dirToScan = `${this.config.dir.replace(/\\/g, '/')}/${this.config.projectName}/`;
        return dirTree(dirToScan, { normalizePath: true });
    }
}