import unwrap from '../../../../src/lib/decorators/unwrap';

describe('lib', () => {
  describe('decorators', () => {
    describe('.unwrap', () => {
      describe('when the first argument is wraped with the key', () => {
        it('unwraps the fist argument', () => {
          class Text {
            @unwrap('notification')
            static transformArgs(...args) {
              return args;
            }
          }

          const result = Text.transformArgs({ notification: { id: 1 } });

          expect(result).toEqual([{ id: 1 }]);
        });
      });

      describe('when the first argument is not wraped with the key', () => {
        it('does not modify the arguments', () => {
          class Text {
            @unwrap('notification')
            static transformArgs(...args) {
              return args;
            }
          }

          const result = Text.transformArgs({ id: 1 });

          expect(result).toEqual([{ id: 1 }]);
        });
      });
    });
  });
});
