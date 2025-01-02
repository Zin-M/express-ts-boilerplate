interface Logger {
    info(content: any): void;
    error(content: any): void;
    warn(content: any): void;
    debug(content: any): void;
}

export default Logger;