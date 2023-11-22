import {remark} from 'remark';
import remarkMdx  from 'remark-mdx';
import remarkDirective from 'remark-directive';
import { describe, expect, it } from 'vitest';

const process = async (content: string) => {
    const {default: plugin} = await import('../plugin');
    const result = await remark()
        .use(remarkMdx)
        .use(remarkDirective)
        .use(plugin)
        .process(content);

    return result.value;
}

const alignLeft = (content: string) => {
    return content.split('\n').map((line) => line.trimStart()).join('\n');
}

describe('#flex', () => {
    it("does nothing if there's no flex", async () => {
        const input = `# Heading

Some content
`;
        const result = await process(input);
        expect(result).toBe(input);
    });
    it("can convert flex", async () => {
        const input = alignLeft(`# Details element example
            :::flex
            Hello world!
            ::br
            Hello moon!
            :::
            Byyye!
        `);
        const result = await process(input);
        expect(result).toMatchInlineSnapshot(`
          "# Details element example

          <div className=\\"flex\\">
            <div className=\\"item\\">
              <div className=\\"content\\">
                Hello world!
              </div>
            </div>

            <div className=\\"item\\">
              <div className=\\"content\\">
                Hello moon!
              </div>
            </div>
          </div>

          Byyye!
          "
        `);
    });
    it("can convert nested flex", async () => {
        const input = alignLeft(`# Details element example
            ::::flex
            Nesting Level 1
            ::br
            Content with a flex
            :::flex
            Boo!
            ::br
            Yaa!
            :::
            ::::
            Byyye!
        `);
        const result = await process(input);
        expect(result).toMatchInlineSnapshot(`
          "# Details element example

          <div className=\\"flex\\">
            <div className=\\"item\\">
              <div className=\\"content\\">
                Nesting Level 1
              </div>
            </div>

            <div className=\\"item\\">
              <div className=\\"content\\">
                Content with a flex

                <div className=\\"flex\\">
                  <div className=\\"item\\">
                    <div className=\\"content\\">
                      Boo!
                    </div>
                  </div>

                  <div className=\\"item\\">
                    <div className=\\"content\\">
                      Yaa!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          Byyye!
          "
        `);
    });

});



describe('#cards', () => {
    it("does nothing if there's no card", async () => {
        const input = `# Heading

Some content
`;
        const result = await process(input);
        expect(result).toBe(input);
    });
    it("can convert cards", async () => {
        const input = alignLeft(`# Details element example
            :::cards
            Hello world!
            ::br
            Hello moon!
            :::
            Byyye!
        `);
        const result = await process(input);
        expect(result).toMatchInlineSnapshot(`
          "# Details element example

          <div className=\\"flex-cards flex\\">
            <div className=\\"item card\\">
              <div className=\\"card__body\\">
                Hello world!
              </div>
            </div>

            <div className=\\"item card\\">
              <div className=\\"card__body\\">
                Hello moon!
              </div>
            </div>
          </div>

          Byyye!
          "
        `);
    });
    it("can convert nested cards", async () => {
        const input = alignLeft(`# Details element example
            ::::cards
            Nesting Level 1
            ::br
            Content with a cards section
            :::cards
            Boo!
            ::br
            Yaa!
            :::
            ::::
            Byyye!
        `);
        const result = await process(input);
        expect(result).toMatchInlineSnapshot(`
          "# Details element example

          <div className=\\"flex-cards flex\\">
            <div className=\\"item card\\">
              <div className=\\"card__body\\">
                Nesting Level 1
              </div>
            </div>

            <div className=\\"item card\\">
              <div className=\\"card__body\\">
                Content with a cards section

                <div className=\\"flex-cards flex\\">
                  <div className=\\"item card\\">
                    <div className=\\"card__body\\">
                      Boo!
                    </div>
                  </div>

                  <div className=\\"item card\\">
                    <div className=\\"card__body\\">
                      Yaa!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          Byyye!
          "
        `);
    });

    it("can convert cards with an image", async () => {
        const input = alignLeft(`
            :::cards
            ![Some Image](https://via.placeholder.com/150)
            Hello world!
            ::br
            Hello moon!
            :::
            Byyye!
        `);
        const result = await process(input);
        expect(result).toMatchInlineSnapshot(`
          "<div className=\\"flex-cards flex\\">
            <div className=\\"item card\\">
              <div className=\\"card__image\\">
                ![Some Image](https://via.placeholder.com/150)
              </div>

              <div className=\\"card__body\\">

                Hello world!
              </div>
            </div>

            <div className=\\"item card\\">
              <div className=\\"card__body\\">
                Hello moon!
              </div>
            </div>
          </div>

          Byyye!
          "
        `);
    });
});