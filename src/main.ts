import "sn-stylekit/dist/stylekit.css";
import "./style.css";
import "katex/dist/katex.min.css";
import "material-icons/iconfont/material-icons.css";
import "prismjs/themes/prism.css";
import { EditorKit, EditorKitDelegate } from "sn-editor-kit";
import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import { basic } from "./theme-basic";
import { gfm } from "@milkdown/preset-gfm";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { tooltip } from "@milkdown/plugin-tooltip";
import { slash } from "@milkdown/plugin-slash";
import { history } from "@milkdown/plugin-history";
import { clipboard } from "@milkdown/plugin-clipboard";
import { emoji } from "@milkdown/plugin-emoji";
import { prism } from "@milkdown/plugin-prism";
import { math } from "@milkdown/plugin-math";
import { diagram } from '@milkdown/plugin-diagram';

class MilkdownEditor {
  editorKit: any;
  prevText: any;
  constructor() {
    const delegate = new EditorKitDelegate({
      setEditorRawText: (text: string) => {
        // Render the editor once SN give us text
        this.initMilkdown(text);
      },
    });

    this.editorKit = new EditorKit({
      delegate: delegate,
      mode: "plaintext",
      supportsFilesafe: false,
    });
  }

  async initMilkdown(defaultValue: string) {
    this.prevText = defaultValue;
    const app = document.getElementById("app")!;
    app.innerHTML = "";
    const editor = await Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, app);
        ctx.set(defaultValueCtx, defaultValue);
        ctx.set(listenerCtx, {
          markdown: [(get) => this.saveNote(get())],
        });
      })
      // Use an empty theme here. Style it with CSS.
      .use(basic)
      .use(gfm)
      .use(listener)
      .use(math)
      .use(slash)
      .use(tooltip)
      .use(history)
      .use(emoji)
      .use(clipboard)
      .use(prism)
      .use(diagram)
      .create();
    app.addEventListener("keydown", this.onKeyDown);
  }

  saveNote(text: string) {
    // Don't save if nothing changed
    if (this.prevText === text) return;
    try {
      this.editorKit.onEditorValueChanged(text);
    } catch (error) {
      console.log("Error saving note:", error);
    }
    this.prevText = text;
  }

  onKeyDown(ev: KeyboardEvent) {
    if (ev.key === "Tab") ev.preventDefault();
  }
}

new MilkdownEditor();
