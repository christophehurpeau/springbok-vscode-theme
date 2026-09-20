## Text Formatting

This is **bold text** and this is __also bold__.

This is *italic text* and this is _also italic_.

This is ***bold and italic*** text.

This is ~~strikethrough~~ text.

This is `inline code` in a sentence.


# Lists

### Unordered Lists

- First item
- Second item
- Third item
  - Nested item 1
  - Nested item 2
    - Deep nested item

* Alternative bullet style
* Another item

### Ordered Lists

1. First ordered item
2. Second ordered item
3. Third ordered item
   1. Nested ordered item
   2. Another nested item

### Task Lists

- [ ] Unchecked task
- [x] Checked task
- [ ] Another task

# Link

An [example](http://example.com).
An [#image](Internal link).
A [relative file](./full-md.md)
A [relative file, to a specific header](./full-md.md#links)

# Image

![Image](Icon-pictures.png 'icon')

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

> Nested blockquotes:
>> This is nested inside.
>>> Even deeper nesting.

## GitHub Alerts

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

## Code

Inline `code` looks like this.

```javascript
// Code block with syntax highlighting
function greet(name) {
    console.log(`Hello, ${name}!`);
    return true;
}
```

```python
# Python code block
def hello_world():
    print("Hello, World!")
    return None
```

```
Plain code block without language
Just some text here
```

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

| Left | Center | Right |
|:-----|:------:|------:|
| L1   |   C1   |    R1 |
| L2   |   C2   |    R2 |

## Special Characters

Escape special characters: \*not italic\* and \`not code\`

HTML entities: &copy; &reg; &trade;

Emojis: 🎉 🚀 ✨ 👍

# Other styles

Inline <abbr title="Hypertext Markup Language">HTML</abbr> is supported.

<!---
your comment goes here
and here
-->
