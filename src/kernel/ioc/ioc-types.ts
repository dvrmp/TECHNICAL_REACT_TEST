const IOC_TYPES = {
    HttpClient: Symbol.for('HttpClient'),
    MemoryClient: Symbol.for('MemoryClient'),
    Logger: Symbol.for('Logger'),
    Repository: Symbol.for('Repository'),
    UserService: Symbol.for('UserService'),
}

export { IOC_TYPES };