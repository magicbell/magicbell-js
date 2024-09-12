// for react-native, jest, and node < 18
if (!AbortSignal.prototype.throwIfAborted) {
  AbortSignal.prototype.throwIfAborted = function () {
    if (this.aborted) {
      throw new Error('Aborted');
    }
  };
}
