export const TiebaThreadParserErrorCode = {
  THREAD_NOT_FOUND: 1
}

export const TiebaThreadParserErrorMessage = {
  [TiebaThreadParserErrorCode.THREAD_NOT_FOUND]: 'Thread not found'
};

export class TiebaThreadParserException {
  static threadNotFound(): TiebaParserError {
    return {
      code: TiebaThreadParserErrorCode.THREAD_NOT_FOUND,
      message: TiebaThreadParserErrorMessage[TiebaThreadParserErrorCode.THREAD_NOT_FOUND]
    };
  }
}
