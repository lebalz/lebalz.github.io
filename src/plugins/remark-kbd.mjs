// passed to unified.use()
// you have to use a named function for access to `this` :(
    function attacher(options) {
        function kbd(eat, value, silent) {
            if (!/^\[\[.+]]/.test(value)) {
                return
            }
    
            const stopPosition = value.indexOf(']]', '[['.length)
            if (stopPosition === -1) {
                return
            }
    
            if (silent) {
                return true
            }
    
            const tag = value.slice(0, stopPosition + ']]'.length)
            const inner = tag.slice('[['.length, stopPosition)
            return eat(tag)({
                type: 'kbd',
                children: this.tokenizeInline(inner, { line: 0, column: 0 }),
                data: {
                    hName: 'kbd'
                }
            })
        }
    
        // add tokenizer to parser after fenced code blocks
        const Parser = this.Parser.prototype;
        Parser.inlineTokenizers.kbd = kbd;
        kbd.locator = (value, from) => value.indexOf('[[', from);
        Parser.inlineMethods.splice(
            Parser.inlineMethods.indexOf('link'),
            0,
            'kbd'
        );
    
    
        const Compiler = this.Compiler
    
        // Stringify
        if (Compiler) {
            const visitors = Compiler.prototype.visitors
            visitors.kbd = function (node) {
                return `[[${this.all(node).join('')}]]`
            }
        }
    }
    
export default attacher;