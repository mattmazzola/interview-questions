/**
 * Run-length encoding is a simple compression mechanism that tells
 * how many times a given element should be repeated.  Eg, “AAAAAAAA” could be re-written as “A8”. 
 * 
 * Imagine we have an Iterator pointing to a stream of
 * integers that we want to interpret as RLE instructions, as described below. 
 * 
 * We want to interpret the numbers from this stream as "value", "num_repetition"
 * pairs and implement a new Iterator with next() and hasNext() methods that generate values that respect the RLE instructions.
 * 
 * Assume that Iterator only exposes next() and hasNext().
 * next() should throw an exception when there are no more elements to return. 
 * 
 * Example : given an input iterator pointing to data [8. 3, 1, 1 12, 2], the
 * RLE iterator should return 8 the first 3 times next() is called on it, then
 * 1 a single time, then 12 the next two.  hasNext() should return true until both
 * 12’s have been returned by next(), and then return false. 
 */

export function *createRunLengthEncodingStream(valueRepetitionArray: (string | number)[]) {
    for(const x of valueRepetitionArray) {
        yield x
    }
}

export function * expandRunLengthEncoding(rleIterable: Generator<string | number>) {
    let index = 0;
    let currentValue: string | undefined = undefined;
    let numRepetition: number | undefined = undefined;

    // TODO: Change to manual loop to be able to detect ending on odd count and throw
    for(const value of rleIterable) {
        if (index % 2 == 0) {
            currentValue = value as string
        }
        else {
            numRepetition = value as number
            if (numRepetition < 0) {
                throw new Error(`numRepetition cannot be less than 0. Value was ${numRepetition}`)
            }
        }
        
        if (typeof currentValue == 'string' && typeof numRepetition == 'number') {
            for(let i = 0; i < numRepetition; i++) {
                yield currentValue;
            }

            // Reset values
            currentValue = undefined
            numRepetition = undefined
        }

        index += 1;
    }

    // If iterator is done AND index is odd then parent stream didn't end between pairs but within pair
    if (index % 2 == 1) {
        throw new Error(`Error pair incomplete`)
    }
}

// TODO: Function to wrap generator and expose next() and hasNext()