CREATE TABLE results (
    id INT NOT NULL AUTO_INCREMENT,
    status VARCHAR(255) NOT NULL,
    repositoryName VARCHAR(255) NOT NULL,
    findings JSON NOT NULL,
    queuedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    scanningAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    finishedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);