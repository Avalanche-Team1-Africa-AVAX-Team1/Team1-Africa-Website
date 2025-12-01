/**
 * Text Splitting Utilities
 * 
 * Utilities to split text into characters, words, or lines for animation purposes.
 */

export interface SplitTextOptions {
    preserveWhitespace?: boolean;
}

/**
 * Split text into individual characters
 */
export const splitIntoCharacters = (text: string, options: SplitTextOptions = {}): string[] => {
    const { preserveWhitespace = true } = options;

    if (preserveWhitespace) {
        return text.split('');
    }

    return text.split('').filter(char => char !== ' ');
};

/**
 * Split text into words
 */
export const splitIntoWords = (text: string): string[] => {
    return text.split(' ').filter(word => word.length > 0);
};

/**
 * Split text into lines (based on \n or <br>)
 */
export const splitIntoLines = (text: string): string[] => {
    return text.split(/\n|<br\s*\/?>/i).filter(line => line.trim().length > 0);
};

/**
 * Wrap each character in a span for animation
 */
export const wrapCharacters = (text: string, className?: string): JSX.Element[] => {
    return splitIntoCharacters(text).map((char, index) => (
        <span
      key= {`char-${index}`}
className = { className }
style = {{ display: 'inline-block' }}
    >
    { char === ' ' ? '\u00A0' : char}
</span>
  ));
};

/**
 * Wrap each word in a span for animation
 */
export const wrapWords = (text: string, className?: string): JSX.Element[] => {
    return splitIntoWords(text).map((word, index) => (
        <span
      key= {`word-${index}`}
className = { className }
style = {{ display: 'inline-block', marginRight: '0.25em' }}
    >
    { word }
    </span>
  ));
};

/**
 * Wrap each line in a div for animation
 */
export const wrapLines = (text: string, className?: string): JSX.Element[] => {
    return splitIntoLines(text).map((line, index) => (
        <div key= {`line-${index}`} className = { className } >
            { line }
            </div>
  ));
};
