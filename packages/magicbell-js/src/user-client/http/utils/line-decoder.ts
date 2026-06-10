/**
 * Utility for splitting streaming data into line-based chunks.
 * Buffers incomplete lines between chunks and handles newline characters correctly.
 * Useful for processing server-sent events or other line-based streaming protocols.
 */
export class LineDecoder {
  private lineBuffer = '';
  private decoder = new TextDecoder();
  private encoder = new TextEncoder();

  /**
   * Splits the given chunk into lines.
   * Stores incomplete lines in a buffer and returns them when the next chunk arrives.
   *
   * @param chunk - The data chunk to split into lines
   * @returns An array of complete lines as Uint8Array
   */
  public splitLines(chunk: Uint8Array): Uint8Array[] {
    this.lineBuffer += this.decoder.decode(chunk);

    let lineEndIndex;
    const lines: Uint8Array[] = [];
    while ((lineEndIndex = this.lineBuffer.indexOf('\n')) >= 0) {
      const line = this.lineBuffer.slice(0, lineEndIndex + 1); // Include the newline character
      this.lineBuffer = this.lineBuffer.slice(lineEndIndex + 1);
      if (line.length > 1) {
        lines.push(this.encoder.encode(line));
      }
    }

    return lines;
  }

  /**
   * Returns the remaining lines in the buffer.
   * Call this after the stream ends to get any incomplete final line.
   *
   * @returns An array containing the buffered line, or empty if buffer is empty
   */
  public flush(): Uint8Array[] {
    if (this.lineBuffer.length === 0) {
      return [];
    }
    const lines = [this.encoder.encode(this.lineBuffer)];
    this.lineBuffer = '';
    return lines;
  }
}
