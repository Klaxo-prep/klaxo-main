export class IdentifierParser {
    line = null;

    constructor(line = '') {
        this.line = line;
    }

    static removeStringOrCharsFromStatement(statement) {
        const re = /"(.*?)"/g;
        let trimmedStatement = statement;

        const retVal = {
            stmt: trimmedStatement,
            str: []
        };
        let current;

        while (current = re.exec(statement)) {
            const strContent = current.pop();
            trimmedStatement = trimmedStatement.replace(`"${strContent}"`, '');
            retVal.stmt = trimmedStatement;
            retVal.str.push(`"${strContent}"`);
        }

        return retVal;
    }

    get() {
        const lastChar = this.line.trim().split('').pop();
        if(!lastChar || lastChar === '{' || lastChar === '}' || lastChar === ':') {
            return;
        }

        console.log(this.line);

        const statements = this.line.split(';');

        statements.forEach(statement => {
            statement = statement.trim();
            if(statement.length === 0) {
                return;
            }

            console.log(statement);

            // Remove all strings and chars stuff from the statement so that we do not identify strings' content
            const excludedStmt = IdentifierParser.removeStringOrCharsFromStatement(statement);
            console.log(statement, excludedStmt);
        });
    }
}