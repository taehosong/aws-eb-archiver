export = archiveCode;

/**
 * Archive file and directory
 * @param {{rootPath: string, sources: string[]}} options
 * @param {string} target
 */
declare function archiveCode(
  options: {
    rootPath: string;
    sources: string[];
  },
  target: string = 'application.zip'
): void;
