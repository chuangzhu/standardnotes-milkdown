# standardnotes-milkdown

A WYSIWYG Markdown editor for [Standard Notes](https://standardnotes.com), based on [Milkdown](https://github.com/Saul-Mirone/milkdown).

## Usage

Click *Settings > Open Preference* on your Standard Notes. On *General > Advanced Settings > Install Custom Extension*, paste the following URL into it and hit enter.

```
https://sn-extensions.melty.land/milkdown/ext.json
```

## Deploy

Clone this repo and cd into it.

```bash
pnpm install
pnpm build
cp package.json dist/
```
Compress `dist/` into ZIP.

<!-- From https://docs.standardnotes.com/extensions/publishing,
     SN automatically moves contents in ZIP up a level -->

```bash
zip -r dist/0.2.2.zip dist
```
Create `dist/ext.json` with this template:

```json
{
  "identifier": "com.yourdomain.milkdown",
  "name": "Milkdown",
  "content_type": "SN|Component",
  "area": "editor-editor",
  "version": "0.2.2",
  "description": "A WYSIWYG Markdown editor for Standard Notes.",
  "url": "https://yourdomain.com/link-to-hosted-extension/",
  "download_url": "https://yourdomain.com/link-to-hosted-extension/0.2.2.zip",
  "latest_url": "https://yourdomain.com/link-to-hosted-extension/ext.json"
}
```

Finally, start a static site server on directory `dist/`.

## License

GNU Affero General Public License v3.0
