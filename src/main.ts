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
import { diagram } from "@milkdown/plugin-diagram";
import tabInserter from "./tab-inserter";

class MilkdownEditor {
  editor?: Editor;
  editorKit: any;
  prevText: string = "";
  constructor() {
    const delegate = new EditorKitDelegate({
      // SN calls this again instead of open a new page
      // when switching between notes with the same editor
      setEditorRawText: (text: string) => {
        if (this.editor instanceof Editor) {
          // This doesn't work
          // this.editor.action((ctx) => {
          //   ctx.set(defaultValueCtx, text);
          // });
          // return;
          delete this.editor;
        }
        this.initMilkdown(text);
      },
      clearUndoHistory: () => {},
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
    this.editor = await Editor.make()
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
      .use(tabInserter)
      .create();
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
}

document.addEventListener("DOMContentLoaded", () => new MilkdownEditor());
