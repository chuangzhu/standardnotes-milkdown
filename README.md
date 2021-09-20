# standardnotes-milkdown

A WYSIWYG Markdown editor for [Standard Notes](https://standardnotes.com), based on [Milkdown](https://github.com/Saul-Mirone/milkdown).

## Usage

Click *Extensions > Import Extensions* on your Standard Notes, paste the following URL into it and hit enter.

```
https://sn-extensions.melty.land/milkdown/ext.json
```

## Deploy

Clone this repo and cd into it.

```bash
pnpm install
pnpm build
```
Compress `dist/` into ZIP.

```bash
zip -r dist/ext.zip dist
```
Create `dist/ext.json` with this template:

```json
{
  "identifier": "com.yourdomain.milkdown",
  "name": "Milkdown",
  "content_type": "SN|Component",
  "area": "editor-editor",
  "version": "0.1.0",
  "description": "A WYSIWYG Markdown editor for Standard Notes.",
  "url": "https://yourdomain.com/link-to-hosted-extension/",
  "download_url": "https://yourdomain.com/link-to-hosted-extension/ext.zip",
  "latest_url": "https://yourdomain.com/link-to-hosted-extension/ext.json"
}
```

Finally, start a static site server on directory `dist/`.

## License

GNU Affero General Public License v3.0
