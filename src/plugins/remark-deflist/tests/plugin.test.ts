import {remark} from 'remark';
import remarkMdx  from 'remark-mdx';
import remarkDirective from 'remark-directive';
import { describe, expect, it } from 'vitest';


const alignLeft = (content: string) => {
  return content.split('\n').map((line) => line.trimStart()).join('\n');
}

const process = async (content: string) => {
    const {default: plugin} = await import('../plugin');
    const result = await remark()
        .use(remarkMdx)
        .use(remarkDirective)
        .use(plugin)
        .process(alignLeft(content));

    return result.value;
}

describe('#deflist', () => {
    it("does nothing if there's no mdi", async () => {
        const input = `# Heading

Some content
`;
        const result = await process(input);
        expect(result).toBe(input);
    });
    it("can convert simple text deflist", async () => {
        const input = `# Details element example
        Hello World
        : The simplest example
        World
        : Our planet
        `;
        const result = await process(input);
        expect(result).toMatchInlineSnapshot(`
          "# Details element example

          <dl>
            <dt>
              Hello World
            </dt>

            <dd>
              The simplest example
            </dd>

            <dt>
              World
            </dt>

            <dd>
              Our planet
            </dd>
          </dl>
          "
        `);
    });
    it("can convert simple deflist with multiple dd", async () => {
      const input = `# Details element example
      Hello World
      : The simplest example
      : with double dd
      World
      : Our planet
      `;
      const result = await process(input);
      expect(result).toMatchInlineSnapshot(`
        "# Details element example

        <dl>
          <dt>
            Hello World
          </dt>

          <dd>
            The simplest example
          </dd>

          <dd>
            with double dd
          </dd>

          <dt>
            World
          </dt>

          <dd>
            Our planet
          </dd>
        </dl>
        "
      `);
    });

    it("can convert simple deflist links in dl", async () => {
      const input = `# Details element example
      Hello [World](https://world.com)
      : The simplest example
      World
      : Our planet
      `;
      const result = await process(input);
      expect(result).toMatchInlineSnapshot(`
        "# Details element example

        <dl>
          <dt>
            Hello [World](https://world.com)
          </dt>

          <dd>
            The simplest example
          </dd>

          <dt>
            World
          </dt>

          <dd>
            Our planet
          </dd>
        </dl>
        "
      `);
    });
    it("can convert simple deflist links in dd", async () => {
      const input = `# Details element example
      Hello World
      : The simplest [example](https://example.com)
      World
      : Our planet
      `;
      const result = await process(input);
      expect(result).toMatchInlineSnapshot(`
        "# Details element example

        <dl>
          <dt>
            Hello World
          </dt>

          <dd>
            The simplest [example](https://example.com)
          </dd>

          <dt>
            World
          </dt>

          <dd>
            Our planet
          </dd>
        </dl>
        "
      `);
    });
    it("can convert deflist starting dt with a link", async () => {
      const input = `# Details element example
      [Hello](https://example.com) my [World](https://example.com)
      : [The](https://example.com) simplest
      World
      : Our planet
      `;
      const result = await process(input);
      expect(result).toMatchInlineSnapshot(`
        "# Details element example

        <dl>
          <dt>
            [Hello](https://example.com) my [World](https://example.com)
          </dt>

          <dd>
            [The](https://example.com) simplest
          </dd>

          <dt>
            World
          </dt>

          <dd>
            Our planet
          </dd>
        </dl>
        "
      `);
    });

    it("ignores text directives", async () => {
      const input = `# Details element example
      [Hello](https://example.com) my [World](https://example.com)
      : [The](https://example.com) simplest
      :directive[Foo] Bar
      `;
      const result = await process(input);
      expect(result).toMatchInlineSnapshot(`
        "# Details element example

        <dl>
          <dt>
            [Hello](https://example.com) my [World](https://example.com)
          </dt>

          <dd>
            [The](https://example.com) simplest
          </dd>
        </dl>

        :directive[Foo] Bar
        "
      `);
    });

    it("converts complex deflist", async () => {
      const input = `# Details element example
      :mdi[icon]
      : An [MDI](https://mdi.com) icon with markup \`:mdi[icon]\`
      : :mdi[icon]
      : whatever it is, it is good
      <span>hello</span>
      : <span>world</span>
      : super fancy def with html

      a short break

      :::block
      deflist
      : in block
      :::
      `;
      const result = await process(input);
      expect(result).toMatchInlineSnapshot(`
        "# Details element example

        <dl>
          <dt>
            :mdi[icon]
          </dt>

          <dd>
            An [MDI](https://mdi.com) icon with markup \`:mdi[icon]\`
          </dd>

          <dd>
            :mdi[icon]
          </dd>

          <dd>
            whatever it is, it is good
          </dd>

          <dt>
            <span>hello</span>
          </dt>

          <dd>
            <span>world</span>
          </dd>

          <dd>
            super fancy def with html
          </dd>
        </dl>

        a short break

        :::block
        <dl>
          <dt>
            deflist
          </dt>

          <dd>
            in block
          </dd>
        </dl>
        :::
        "
      `);
    });    
});