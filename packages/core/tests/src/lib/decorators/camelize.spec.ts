import camelize from '../../../../src/lib/decorators/camelize';

describe('lib', () => {
  describe('decorators', () => {
    describe('.camelize', () => {
      it('camelizes the fist argument', () => {
        class Text {
          @camelize()
          static transformArgs(...args) {
            return args;
          }
        }

        const result = Text.transformArgs({ argument_one: '1', argument_two: '1' }, [{ argument_tree: '3' }]);

        expect(result).toEqual([{ argumentOne: '1', argumentTwo: '1' }, [{ argumentTree: '3' }]]);
      });
    });
  });
});
